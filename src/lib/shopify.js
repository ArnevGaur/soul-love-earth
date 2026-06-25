export const client = {
  request: async (query, { variables } = {}) => {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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