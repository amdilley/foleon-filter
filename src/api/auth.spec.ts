import { faker } from '@faker-js/faker';
import { getAuthToken } from './auth';

const ONE_HOUR_IN_SECONDS = 3600;

describe('getAuthToken', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({
        access_token: faker.string.alphanumeric({ length: 20 }),
        expires_in: ONE_HOUR_IN_SECONDS,
        token_type: 'Bearer',
        scope: null,
      }),
    } as unknown as Response);
  });

  afterEach(() => {
    localStorage.clear();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should return an string token', async () => {
    const token = await getAuthToken();

    expect(typeof token).toBe('string');
  });

  test('should return the same value the second time called', async () => {
    const firstToken = await getAuthToken();
    const secondToken = await getAuthToken();

    expect(firstToken).toBe(secondToken);
  });

  test('should return the a different value the second time called if after expiration time', async () => {
    jest.useFakeTimers();

    const firstToken = await getAuthToken();

    jest.advanceTimersByTime(ONE_HOUR_IN_SECONDS * 1000 + 1);

    const secondToken = await getAuthToken();

    expect(firstToken).not.toBe(secondToken);
  });

});
