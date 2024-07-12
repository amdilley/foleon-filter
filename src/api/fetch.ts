import { getAuthToken } from './auth';

export const fetcher = async (url: string) => {
  const token = await getAuthToken();

  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then((r) => r.json());
};
