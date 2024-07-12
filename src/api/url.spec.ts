import { getSearchUrls } from './url'; 

describe('getSearchUrls', () => {

  test('should return the base api URL at the start', () => {
    const [url] = getSearchUrls();

    expect(url.startsWith(process.env.REACT_APP_FOLEON_API_BASE as string)).toBe(true);
  });

  test('should include default page param of 1 and default limit param of 10', () => {
    const [url] = getSearchUrls();
    const params = (new URL(url)).searchParams;

    expect(params.get('page')).toBe('1');
    expect(params.get('limit')).toBe('10');
  });

  test('should point to "/magazine/title" by default', () => {
    const [url] = getSearchUrls();

    expect(url.includes('/magazine/title?')).toBe(true);
  });

  test('should point to "/magazine/edition" by when searchText or category provided', () => {
    const [searchTextUrl] = getSearchUrls({ searchText: 'foo' });
    const [categoryUrl] = getSearchUrls({ searchText: 'foo' });

    expect(searchTextUrl.includes('/magazine/edition?')).toBe(true);
    expect(categoryUrl.includes('/magazine/edition?')).toBe(true);
  });

  test('should produce a second URL with page param one greater than the first', () => {
    const mockPage = 4;
    const [url, nextUrl] = getSearchUrls({ page: mockPage });
    const params = (new URL(url)).searchParams;
    const nextParams = (new URL(nextUrl)).searchParams;

    expect(params.get('page')).toBe(`${mockPage}`);
    expect(nextParams.get('page')).toBe(`${mockPage + 1}`);
  });

});
