import styled from 'styled-components';

export const DEFAULT_COLOR = 'rgb(234, 182, 118)';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100px;
  height: 150px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }
`;

interface Props {
  text: string
  color?: string
}

const SearchResultItem = ({
  text,
  color = DEFAULT_COLOR,
}: Props) => {
  return (
    <Container color={color}>
      {text}
    </Container>
  );
};

export default SearchResultItem;
