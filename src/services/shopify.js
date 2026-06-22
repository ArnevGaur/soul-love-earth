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
    const queryStr = `query collectionProducts($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              tags
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
    
    const variables = { handle, first: 250 };
    const { data, errors } = await client.request(queryStr, { variables });
    
    if (errors || !data?.collectionByHandle) {
      console.error('Shopify fetchProducts collection error', errors);
      return [];
    }
    
    let results = data.collectionByHandle.products.edges.map(e => mapShopifyProduct(e.node));
    
    // Client-side filtering
    if (tag) {
      results = results.filter(p => p.tags.includes(tag));
    }
    
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(s));
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
  let queryStr = `query getProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          id
          title
          description
          tags
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
    shopifyQuery.push(`title:${search}*`);
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

  const variables = {
    first: limit,
    query: shopifyQuery.length > 0 ? shopifyQuery.join(' AND ') : null,
    sortKey: sortKey,
    reverse: reverse
  };

  const { data, errors } = await client.request(queryStr, { variables });
  if (errors) {
    console.error('Shopify fetchProducts errors', errors);
    return [];
  }

  return data.products.edges.map(edge => mapShopifyProduct(edge.node));
}

export async function fetchProduct(id) {
  const queryStr = `query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      tags
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
  const queryStr = `query collectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: 250) {
        edges {
          node {
            tags
          }
        }
      }
    }
  }`;
  
  const { data, errors } = await client.request(queryStr, { variables: { handle } });
  if (errors || !data?.collectionByHandle) {
    return { category_id: handle, name: handle, subcategories: [] };
  }
  
  const coll = data.collectionByHandle;
  const tagsSet = new Set();
  
  coll.products.edges.forEach(edge => {
    if (edge.node.tags) {
      edge.node.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  const subcategories = Array.from(tagsSet).sort().map(tag => ({
    category_id: `${handle}___${tag}`,
    name: tag
  }));
  
  return {
    category_id: coll.handle,
    name: coll.title,
    subcategories
  };
}

export async function fetchCategories() {
  const collections = await fetchCollections();
  const fullCategories = await Promise.all(
    collections.map(c => fetchCategoryWithSubcategories(c.handle))
  );
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
