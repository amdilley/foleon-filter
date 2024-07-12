import { render, screen } from '@testing-library/react';
import SearchResultItem, { DEFAULT_COLOR } from './';

describe('SearchResultItem', () => {

  test('renders with specified text', () => {
    const mockText = 'Foo';

    render(<SearchResultItem text={mockText} />);

    const item = screen.getByText(mockText);

    expect(item).toBeInTheDocument();
  });

  test('renders with default color', () => {
    const mockText = 'Foo';

    render(<SearchResultItem text={mockText} />);

    const item = screen.getByText(mockText);

    expect(getComputedStyle(item).backgroundColor).toBe(DEFAULT_COLOR);
  });

  test('renders with specified color', () => {
    const mockText = 'Foo';
    const mockColor = 'rgb(150, 140, 130)'

    render(<SearchResultItem text={mockText} color={mockColor} />);

    const item = screen.getByText(mockText);

    expect(getComputedStyle(item).backgroundColor).toBe(mockColor);
  });

});
