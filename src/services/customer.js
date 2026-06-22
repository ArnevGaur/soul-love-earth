import { client } from '../lib/shopify';

export async function registerCustomer({ firstName, lastName, email, phone, password }) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      firstName,
      lastName,
      email,
      phone,
      password,
    }
  };

  const { data, errors } = await client.request(query, { variables });
  
  if (errors || data?.customerCreate?.customerUserErrors?.length > 0) {
    const errorMsg = data?.customerCreate?.customerUserErrors?.[0]?.message || 'Failed to register';
    throw new Error(errorMsg);
  }

  return true; // Registration successful
}

export async function loginCustomer({ email, password }) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
    }
  };

  const { data, errors } = await client.request(query, { variables });

  if (errors || data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
    const errorMsg = data?.customerAccessTokenCreate?.customerUserErrors?.[0]?.message || 'Invalid credentials';
    throw new Error(errorMsg);
  }

  return data.customerAccessTokenCreate.customerAccessToken.accessToken;
}

export async function logoutCustomer(customerAccessToken) {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = { customerAccessToken };
  
  try {
    await client.request(query, { variables });
  } catch (e) {
    console.error('Error logging out on server', e);
  }
  return true;
}

export async function recoverPassword(email) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = { email };

  const { data, errors } = await client.request(query, { variables });
  
  if (errors || data?.customerRecover?.customerUserErrors?.length > 0) {
    const errorMsg = data?.customerRecover?.customerUserErrors?.[0]?.message || 'Failed to send recovery email';
    throw new Error(errorMsg);
  }

  return true;
}

export async function getCustomer(customerAccessToken) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          id
          address1
          address2
          city
          country
          zip
        }
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              country
              zip
            }
          }
        }
      }
    }
  `;
  const variables = { customerAccessToken };

  const { data, errors } = await client.request(query, { variables });

  if (errors || !data?.customer) {
    return null;
  }

  return data.customer;
}

export async function updateCustomer(customerAccessToken, customerData) {
  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    customerAccessToken,
    customer: customerData
  };

  const { data, errors } = await client.request(query, { variables });

  if (errors || data?.customerUpdate?.customerUserErrors?.length > 0) {
    const errorMsg = data?.customerUpdate?.customerUserErrors?.[0]?.message || 'Failed to update profile';
    throw new Error(errorMsg);
  }

  return data.customerUpdate.customer;
}

// Addresses
export async function createCustomerAddress(customerAccessToken, address) {
  const query = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = { customerAccessToken, address };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.customerAddressCreate?.customerUserErrors?.length > 0) {
    throw new Error(data?.customerAddressCreate?.customerUserErrors?.[0]?.message || 'Failed to create address');
  }
  return data.customerAddressCreate.customerAddress;
}

export async function updateCustomerAddress(customerAccessToken, id, address) {
  const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = { customerAccessToken, id, address };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.customerAddressUpdate?.customerUserErrors?.length > 0) {
    throw new Error(data?.customerAddressUpdate?.customerUserErrors?.[0]?.message || 'Failed to update address');
  }
  return data.customerAddressUpdate.customerAddress;
}

export async function deleteCustomerAddress(customerAccessToken, id) {
  const query = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = { customerAccessToken, id };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.customerAddressDelete?.customerUserErrors?.length > 0) {
    throw new Error(data?.customerAddressDelete?.customerUserErrors?.[0]?.message || 'Failed to delete address');
  }
  return true;
}

export async function defaultCustomerAddress(customerAccessToken, addressId) {
  const query = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = { customerAccessToken, addressId };
  const { data, errors } = await client.request(query, { variables });
  if (errors || data?.customerDefaultAddressUpdate?.customerUserErrors?.length > 0) {
    throw new Error(data?.customerDefaultAddressUpdate?.customerUserErrors?.[0]?.message || 'Failed to set default address');
  }
  return true;
}
