import qs from 'qs';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SearchOptions {
  page?: number
  limit?: number
  searchText?: string
  category?: string
  orderByField?: string
  orderByDirection?: OrderBy
}

export const GET_CATEGORIES_URL = `${process.env.REACT_APP_FOLEON_API_BASE}magazine/edition/category`;

export const getSearchUrls = (options: SearchOptions = {}) => {
  const formattedOptions = {
    page: 1,
    limit: 10,
    orderByField: 'name',
    orderByDirection: OrderBy.ASC,
    ...options,
  };

  const hasFilter = Boolean(formattedOptions.searchText || formattedOptions.category);

  const baseParams = {
    page: formattedOptions.page,
    limit: formattedOptions.limit,
    ...(hasFilter && {
      query: [
        ...(formattedOptions.searchText ? [
          {
            field: 'name',
            type: 'like',
            value: `%${formattedOptions.searchText}%`,
          },
        ] : []),
        ...(formattedOptions.category ? [
          {
            field: 'category',
            type: 'eq',
            value: formattedOptions.category,
          },
        ] : []),
      ],
    }),
    'order-by': [
      {
        field: formattedOptions.orderByField,
        type: 'field',
        direction: formattedOptions.orderByDirection,
      },
    ],
  };

  const params = qs.stringify(baseParams);
  const nextParams = qs.stringify({ ...baseParams, page: formattedOptions.page + 1 });
  const path = hasFilter ? 'magazine/edition' : 'magazine/title';
  
  const baseUrl = `${process.env.REACT_APP_FOLEON_API_BASE}${path}`;
  const url = `${baseUrl}?${params}`;
  const nextUrl = `${baseUrl}?${nextParams}`;

  return [url, nextUrl];
};
 