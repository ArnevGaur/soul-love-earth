import { client } from '../lib/shopify';

const CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart() {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data, errors } = await client.request(query);
  if (errors || data?.cartCreate?.userErrors?.length) {
    if (import.meta.env.DEV) console.error('Error creating cart', errors || data?.cartCreate?.userErrors);
    return null;
  }
  return data.cartCreate.cart;
}

export async function getCart(cartId) {
  const { data, errors } = await client.request(CART_QUERY, { variables: { cartId } });
  if (errors || !data?.cart) {
    return null;
  }
  return data.cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }]
  };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.cartLinesAdd?.userErrors?.length) {
    if (import.meta.env.DEV) console.error('Error adding to cart', errors || data?.cartLinesAdd?.userErrors);
  }
  return data?.cartLinesAdd?.cart;
}

export async function updateCart(cartId, lineId, quantity) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }]
  };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.cartLinesUpdate?.userErrors?.length) {
    if (import.meta.env.DEV) console.error('Error updating cart', errors || data?.cartLinesUpdate?.userErrors);
  }
  return data?.cartLinesUpdate?.cart;
}

export async function removeFromCart(cartId, lineId) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lineIds: [lineId]
  };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.cartLinesRemove?.userErrors?.length) {
    if (import.meta.env.DEV) console.error('Error removing from cart', errors || data?.cartLinesRemove?.userErrors);
  }
  return data?.cartLinesRemove?.cart;
}
