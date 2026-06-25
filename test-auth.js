import dotenv from 'dotenv';
dotenv.config();

async function testAuth() {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { code field message }
      }
    }
  `;
  const variables = {
    input: {
      firstName: "Test",
      lastName: "User",
      email: "testuser12345@example.com",
      password: "Password123!"
    }
  };
  try {
    const res = await fetch(process.env.VITE_SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
testAuth();
