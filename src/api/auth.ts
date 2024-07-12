interface TokenMetadata {
  access_token: string
  expires_in: number
  token_type: string
  scope: string | null
}

export const getAuthToken = async () => {
  const now = Date.now();
  const expiration = localStorage.getItem('expiration');
  const token = localStorage.getItem('token');

  if (!expiration || Number(expiration) < now) {
    const response = await fetch(
      process.env.REACT_APP_FOLEON_API_AUTH_URL as string,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: process.env.REACT_APP_FOLEON_API_CLIENT_ID as string,
          client_secret: process.env.REACT_APP_FOLEON_API_CLIENT_SECRET as string,
        }),
      },
    );
    const data = await response.json() as TokenMetadata;

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('expiration', `${(data.expires_in * 1000 + now)}`);

    return data.access_token;
  }

  return token;
}
