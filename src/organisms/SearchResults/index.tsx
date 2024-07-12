import { useEffect, useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import useSWR, { preload } from 'swr';
import { fetcher } from '../../api/fetch';
import { GET_CATEGORIES_URL, getSearchUrls, OrderBy } from '../../api/url';

import Dropdown, { DropdownItem } from '../../components/Dropdown';
import SearchResultItem from '../../components/SearchResultItem';
import Spinner from '../../components/Spinner';

const FiltersContainer = styled.div`
  display: flex;
  gap: 6px;
  padding: 6px 10px;
`;

const ResultsContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`;

const NakedButton = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

  &[disabled] {
    opacity: 0.6;
    cursor: default;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 6px;
  padding: 0 4px;
`;

interface Props {
  initPage?: number
  limit?: number
}

const SearchResults = ({
  initPage = 1,
  limit = 5,
}: Props) => {
  const [page, setPage] = useState<number>(initPage);
  const [searchText, setSearchText] = useState<string>();
  const [category, setCategory] = useState<string>('none');
  const [orderByDirection, setOrderByDirection] = useState<OrderBy>(OrderBy.ASC);

  const [url, nextUrl] = getSearchUrls({
    page,
    limit,
    searchText,
    ...(category !== 'none' && { category }),
    orderByDirection,
  });
  
  const { data, isLoading } = useSWR(url, fetcher);
  const { data: categories, isLoading: isLoadingCategories } = useSWR(GET_CATEGORIES_URL, fetcher);

  const dataItems = (data?._embedded?.title ?? data?._embedded?.edition ?? []).map(
    (item: { name: string }) => item.name
  ) as string[];
  const categoryItems = [{ label: 'None', value: 'none' }].concat((categories?._embedded?.category ?? []).map(
    (item: { key: string, name: string }) => ({ label: item.name, value: item.key })
  ));

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;

  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, 400);

  const handleCategorySelect = (item: DropdownItem) => {
    setCategory(`${item.value}`);
  };

  const toggleOrderBy = () => {
    setOrderByDirection(orderByDirection === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC);
    setPage(1);
  };

  useEffect(() => {
    if (totalPages && page < totalPages) {
      preload(nextUrl, fetcher);
    }
  }, [page, nextUrl, totalPages]);

  return (
    <div>
      <FiltersContainer>
        <input onChange={handleSearchChange} />
        <Dropdown
          defaultValue='none'
          items={categoryItems}
          disabled={isLoadingCategories}
          onChange={handleCategorySelect}
        />
        <NakedButton
          disabled={dataItems.length === 0}
          onClick={toggleOrderBy}
        >
          {orderByDirection === OrderBy.ASC ? '🔼' : '🔽'}
        </NakedButton>
        {totalPages > 1 && (
          <PaginationContainer>
            <NakedButton
              disabled={page === 1}
              onClick={() => setPage(Math.max(page - 1, 1))}
            >
              ⬅️
            </NakedButton>
            <div>{page} of {totalPages}</div>
            <NakedButton
              disabled={page === totalPages}
              onClick={() => setPage(Math.min(page + 1, totalPages))}
            >
              ➡️
            </NakedButton>
          </PaginationContainer>
        )}
      </FiltersContainer>
      <ResultsContainer>
        {isLoading ? (
          <Spinner/>
        ) : (
          dataItems.map((id, i) => <SearchResultItem key={i} text={id}/>)
        )}
      </ResultsContainer>
    </div>
  );
};

export default SearchResults;
