import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  const safeId = id ? String(id).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

  let productTitle = 'Soul Love & Earth';
  let productDescription = 'Shop beautiful, sustainable products at Soul Love & Earth.';
  let productImage = '';

  let debugInfo = '';
  if (!domain || !token) {
    debugInfo = 'Missing env vars';
  }

  if (id && domain && token) {
    try {
      const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({
          query: `
            query getProduct($id: ID!) {
              product(id: $id) {
                title
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          `,
          variables: {
            id: `gid://shopify/Product/${id}`,
          },
        }),
      });

      const json = await response.json();
      if (json.errors) {
        debugInfo = `GraphQL Errors: ${JSON.stringify(json.errors)}`;
      }

      const data = json.data;
      
      if (data && data.product) {
        productTitle = data.product.title;
        productDescription = data.product.description;
        if (data.product.images?.edges?.length > 0) {
          productImage = data.product.images.edges[0].node.url;
        }
      } else if (data && !data.product) {
        debugInfo = `Product not found for ID: ${id}`;
      }
    } catch (error) {
      console.error('Error fetching product for OG tags:', error);
      debugInfo = `Fetch Error: ${error.message}`;
    }
  }

  // Try to load index.html from dist
  let html = '';
  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    html = fs.readFileSync(indexPath, 'utf8');
  } catch (err) {
    // If not found (e.g. running locally without build), fetch from host or fallback
    console.error('Could not find dist/index.html locally', err);
    try {
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers['x-forwarded-host'] || req.headers.host;
      const indexResp = await fetch(`${protocol}://${host}/index.html`);
      html = await indexResp.text();
    } catch (fetchErr) {
      console.error('Could not fetch index.html from host', fetchErr);
      html = `<!doctype html><html lang="en"><head><title>${productTitle}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`;
    }
  }

  const safeDescription = productDescription ? productDescription.replace(/"/g, '&quot;').substring(0, 160) : '';
  const safeTitle = productTitle ? productTitle.replace(/"/g, '&quot;') : '';

  // Inject Open Graph tags into the HTML head
  const metaTags = `
    <!-- DEBUG: ${debugInfo} -->
    <title>${safeTitle} | Soul Love & Earth</title>
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${productImage}" />
    <meta property="og:url" content="https://soul-love-earth.vercel.app/product/${safeId}" />
    <meta property="og:type" content="product" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${productImage}" />
  `;

  // Replace existing generic title with specific meta tags
  if (html.includes('<title>Soul Love & Earth</title>')) {
    html = html.replace('<title>Soul Love & Earth</title>', metaTags);
  } else {
    // Fallback injection if the exact title string isn't found
    html = html.replace('</head>', `${metaTags}</head>`);
  }

  // Add Cache-Control (short duration for testing)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
