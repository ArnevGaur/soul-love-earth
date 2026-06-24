import { client } from '../lib/shopify';



// Helper to format Shopify product into OpenCart format
function mapShopifyProduct(node) {
  const images = node.images?.edges?.map(e => e.node.url) || [];
  const priceAmount = node.priceRange?.minVariantPrice?.amount || '0';
  const currencyCode = node.priceRange?.minVariantPrice?.currencyCode || 'AED';
  
  let special = null;
  const compareAt = node.compareAtPriceRange?.minVariantPrice?.amount;
  if (compareAt && parseFloat(compareAt) > parseFloat(priceAmount)) {
    special = `${currencyCode} ${priceAmount}`;
  }

  // Extract ID from gid://shopify/Product/12345
  const productId = node.id.replace('gid://shopify/Product/', '');
  
  let category_id = 'home-decor'; // default
  if (node.collections?.edges?.length > 0) {
    category_id = node.collections.edges[0]?.node.handle || 'home-decor';
  }

  const variantId = node.variants?.edges?.[0]?.node?.id || '';
  
  const parseListMetafield = (metaStr) => {
    if (!metaStr) return [];
    try {
      let parsed = JSON.parse(metaStr);
      if (!Array.isArray(parsed)) parsed = [parsed];
      return parsed;
    } catch (e) {
      return metaStr.split(',').map(s => s.trim());
    }
  };

  const category_mapping = {
    'kitchenware': parseListMetafield(node.kitchenwareSub?.value),
    'fashion': parseListMetafield(node.fashionSub?.value),
    'gifts': parseListMetafield(node.giftsSub?.value),
    'hospitality': parseListMetafield(node.hospitalitySub?.value),
    'home-decor': parseListMetafield(node.homeDecorSub?.value)
  };

  return {
    product_id: productId,
    variant_id: variantId,
    name: node.title,
    price: `${currencyCode} ${special ? compareAt : priceAmount}`,
    special: special,
    category_id: category_id,
    thumb: images[0] || 'https://via.placeholder.com/800',
    images: images,
    description: node.description || '',
    tags: node.tags || [],
    category_mapping: category_mapping,
    rating: 4,
    reviews: [],
    related: []
  };
}

export async function fetchProducts({
  categoryId = '',
  search     = '',
  sort       = 'p.date_added',
  order      = 'DESC',
  page       = 1,
  limit      = 24,
  filters    = null,
  subCategoryTag = null
} = {}) {
  
  let handle = categoryId;
  let tag = subCategoryTag;
  
  if (categoryId && categoryId.includes('___')) {
    const parts = categoryId.split('___');
    handle = parts[0];
    tag = parts[1];
  }

  // 1) Collection-based fetch (if a handle is provided)
  if (handle) {
    const queryStr = `query collectionProducts($handle: String!, $first: Int!, $after: String) {
      collectionByHandle(handle: $handle) {
        products(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
              tags
              kitchenwareSub: metafield(namespace: "custom", key: "kitchenware_subcategories") { value }
              fashionSub: metafield(namespace: "custom", key: "fashion_subcategories") { value }
              giftsSub: metafield(namespace: "custom", key: "gifts_subcategories") { value }
              hospitalitySub: metafield(namespace: "custom", key: "hospitality_subcategories") { value }
              homeDecorSub: metafield(namespace: "custom", key: "home_decor_subcategories") { value }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
              collections(first: 5) {
                edges {
                  node {
                    title
                    handle
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }`;
    
    let allEdges = [];
    let hasNextPage = true;
    let cursor = null;
    let pageNum = 1;

    while (hasNextPage) {
      const variables = { handle, first: 250, after: cursor };
      const { data, errors } = await client.request(queryStr, { variables });
      
      if (errors || !data?.collectionByHandle) {
        console.error('Shopify fetchProducts collection error', errors);
        break;
      }
      
      const edges = data.collectionByHandle.products.edges;
      allEdges.push(...edges);
      console.log(`Fetched page ${pageNum} (Collection: ${handle}): ${edges.length} products`);
      
      hasNextPage = data.collectionByHandle.products.pageInfo.hasNextPage;
      cursor = data.collectionByHandle.products.pageInfo.endCursor;
      pageNum++;
    }
    
    console.log(`Total fetched (Collection: ${handle}): ${allEdges.length} products`);
    let results = allEdges.map(e => mapShopifyProduct(e.node));
    
    // Client-side filtering
    if (tag) {
      results = results.filter(p => {
        const subcatsForHandle = p.category_mapping[handle] || [];
        return subcatsForHandle.includes(tag);
      });
    }
    
    if (search) {
      const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
      results = results.filter(p => {
        const title = p.name.toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const tags = (p.tags || []).join(' ').toLowerCase();
        return terms.every(term => 
          title.includes(term) || desc.includes(term) || tags.includes(term)
        );
      });
    }
    
    if (filters) {
      if (filters.minPrice) {
        results = results.filter(p => parseFloat(p.price.replace(/[^0-9.]/g, '')) >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        results = results.filter(p => parseFloat(p.price.replace(/[^0-9.]/g, '')) <= Number(filters.maxPrice));
      }
    }
    
    // Client-side sorting
    if (sort === 'p.price') {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return order === 'ASC' ? priceA - priceB : priceB - priceA;
      });
    } else if (sort === 'pd.name') {
      results.sort((a, b) => order === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }
    
    return results;
  }
  
  // 2) Generic fetch (no collection handle provided)
  let queryStr = `query getProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean, $after: String) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          tags
          kitchenwareSub: metafield(namespace: "custom", key: "kitchenware_subcategories") { value }
          fashionSub: metafield(namespace: "custom", key: "fashion_subcategories") { value }
          giftsSub: metafield(namespace: "custom", key: "gifts_subcategories") { value }
          hospitalitySub: metafield(namespace: "custom", key: "hospitality_subcategories") { value }
          homeDecorSub: metafield(namespace: "custom", key: "home_decor_subcategories") { value }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          collections(first: 5) {
            edges {
              node {
                title
                handle
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }`;

  let shopifyQuery = [];
  if (search) {
    const terms = search.trim().split(/\s+/).filter(Boolean);
    if (terms.length > 0) {
      const formattedSearch = terms.map(t => `${t}*`).join(' AND ');
      shopifyQuery.push(`(${formattedSearch})`);
    }
  }

  if (filters) {
    if (filters.minPrice || filters.maxPrice) {
      let priceQ = 'variants.price:';
      if (filters.minPrice && filters.maxPrice) {
        priceQ += `>=${filters.minPrice} <=${filters.maxPrice}`;
      } else if (filters.minPrice) {
        priceQ += `>=${filters.minPrice}`;
      } else if (filters.maxPrice) {
        priceQ += `<=${filters.maxPrice}`;
      }
      shopifyQuery.push(priceQ);
    }
  }

  let sortKey = 'CREATED_AT';
  let reverse = order === 'DESC';

  if (sort === 'p.price') {
    sortKey = 'PRICE';
  } else if (sort === 'pd.name') {
    sortKey = 'TITLE';
    reverse = order === 'DESC';
  }

  let allEdges = [];
  let hasNextPage = true;
  let cursor = null;
  let pageNum = 1;

  while (hasNextPage) {
    const variables = {
      first: 250,
      query: shopifyQuery.length > 0 ? shopifyQuery.join(' AND ') : null,
      sortKey: sortKey,
      reverse: reverse,
      after: cursor
    };

    const { data, errors } = await client.request(queryStr, { variables });
    if (errors) {
      console.error('Shopify fetchProducts errors', errors);
      break;
    }

    const edges = data.products.edges;
    allEdges.push(...edges);
    console.log(`Fetched page ${pageNum} (Generic): ${edges.length} products`);

    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
    pageNum++;
  }

  console.log(`Total fetched (Generic): ${allEdges.length} products`);
  return allEdges.map(edge => mapShopifyProduct(edge.node));
}

export async function fetchProduct(id) {
  const queryStr = `query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      tags
      kitchenwareSub: metafield(namespace: "custom", key: "kitchenware_subcategories") { value }
      fashionSub: metafield(namespace: "custom", key: "fashion_subcategories") { value }
      giftsSub: metafield(namespace: "custom", key: "gifts_subcategories") { value }
      hospitalitySub: metafield(namespace: "custom", key: "hospitality_subcategories") { value }
      homeDecorSub: metafield(namespace: "custom", key: "home_decor_subcategories") { value }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
      collections(first: 5) {
        edges {
          node {
            title
            handle
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }`;

  const gid = `gid://shopify/Product/${id}`;
  
  const { data, errors } = await client.request(queryStr, { variables: { id: gid } });
  
  if (errors || !data?.product) {
    console.error('Shopify fetchProduct error', errors);
    return null;
  }

  const product = mapShopifyProduct(data.product);
  
  // Find matching mocked category for the UI
  const category = {
    category_id: product.category_id,
    name: data.product.collections?.edges?.[0]?.node?.title || 'Shop',
  };
  
  // Related products (fetch 4 from same category client-side via simple fetchProducts call)
  const relatedResults = await fetchProducts({ categoryId: product.category_id, limit: 8 });
  const related = relatedResults.filter(p => p.product_id !== product.product_id).slice(0, 4);

  return { ...product, category, related };
}

export async function fetchCollections() {
  const queryStr = `query getCollections {
    collections(first: 250) {
      edges {
        node {
          id
          title
          handle
          image {
            url
          }
        }
      }
    }
  }`;
  const { data, errors } = await client.request(queryStr);
  if (errors || !data?.collections) {
    console.error('Shopify fetchCollections error', errors);
    return [];
  }
  return data.collections.edges.map(e => ({
    category_id: e.node.handle,
    name: e.node.title,
    image: e.node.image?.url || null,
    handle: e.node.handle,
    subcategories: []
  }));
}

export async function fetchCategoryWithSubcategories(handle) {
  const queryStr = `query collectionByHandle($handle: String!, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: 250, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            kitchenwareSub: metafield(namespace: "custom", key: "kitchenware_subcategories") { value }
            fashionSub: metafield(namespace: "custom", key: "fashion_subcategories") { value }
            giftsSub: metafield(namespace: "custom", key: "gifts_subcategories") { value }
            hospitalitySub: metafield(namespace: "custom", key: "hospitality_subcategories") { value }
            homeDecorSub: metafield(namespace: "custom", key: "home_decor_subcategories") { value }
          }
        }
      }
    }
  }`;
  
  let allEdges = [];
  let hasNextPage = true;
  let cursor = null;
  let collTitle = handle;
  let pageNum = 1;
  
  while (hasNextPage) {
    const { data, errors } = await client.request(queryStr, { variables: { handle, after: cursor } });
    if (errors || !data?.collectionByHandle) {
      break;
    }
    
    collTitle = data.collectionByHandle.title;
    const edges = data.collectionByHandle.products.edges;
    allEdges.push(...edges);
    console.log(`Fetched page ${pageNum} (Subcategories: ${handle}): ${edges.length} products`);
    
    hasNextPage = data.collectionByHandle.products.pageInfo.hasNextPage;
    cursor = data.collectionByHandle.products.pageInfo.endCursor;
    pageNum++;
  }
  
  console.log(`Total fetched (Subcategories: ${handle}): ${allEdges.length} products`);
  
  const categorySet = new Set();
  
  const handleToMetafieldAlias = {
    'kitchenware': 'kitchenwareSub',
    'fashion': 'fashionSub',
    'gifts': 'giftsSub',
    'hospitality': 'hospitalitySub',
    'home-decor': 'homeDecorSub'
  };
  
  const aliasToUse = handleToMetafieldAlias[handle];
  
  if (aliasToUse) {
    allEdges.forEach(edge => {
      const metaStr = edge.node[aliasToUse]?.value;
      if (metaStr) {
        try {
          let parsed = JSON.parse(metaStr);
          if (!Array.isArray(parsed)) parsed = [parsed];
          parsed.forEach(c => categorySet.add(c));
        } catch (e) {
          metaStr.split(',').forEach(c => categorySet.add(c.trim()));
        }
      }
    });
  }
  
  const subcategories = Array.from(categorySet).sort().map(name => ({
    category_id: `${handle}___${name}`,
    name: name
  }));
  
  return {
    category_id: handle,
    name: collTitle,
    subcategories
  };
}

export async function fetchCategories() {
  const collections = await fetchCollections();
  const fullCategories = await Promise.all(
    collections.map(c => fetchCategoryWithSubcategories(c.handle))
  );
  console.log('fetchCategories Verification:', fullCategories);
  return fullCategories;
}

export async function fetchCustomerOrders(customerAccessToken) {
  if (!customerAccessToken) return [];
  
  const queryStr = `query getCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  
  const { data, errors } = await client.request(queryStr, { variables: { customerAccessToken } });
  if (errors || !data?.customer) {
    console.error('Shopify fetchCustomerOrders error', errors);
    return [];
  }
  
  return data.customer.orders.edges.map(e => {
    const node = e.node;
    const fulfillmentStatus = node.fulfillmentStatus === 'FULFILLED' ? 'delivered' :
                              node.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'shipped' : 'processing';
    return {
      id: `ORD-${node.orderNumber}`,
      date: new Date(node.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: fulfillmentStatus,
      total: `${node.totalPrice.currencyCode} ${node.totalPrice.amount}`,
      items: node.lineItems.edges.map(li => ({
        name: li.node.title,
        quantity: li.node.quantity,
        price: li.node.variant ? `${li.node.variant.price.currencyCode} ${li.node.variant.price.amount}` : ''
      }))
    };
  });
}

// Preserve existing export for UI compatibility
export async function fetchOrders(customerAccessToken) {
  return await fetchCustomerOrders(customerAccessToken);
}
