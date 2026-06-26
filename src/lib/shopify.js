export const client = {
  request: async (query, { variables } = {}) => {
    const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
    const url = `https://${domain}/api/2024-01/graphql.json`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error('Too many attempts. Please try again later.');
      }
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  }
};