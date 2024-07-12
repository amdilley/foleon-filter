import { act } from 'react';
import { render, screen } from '@testing-library/react';
import RadioSelect from './';

describe('RadioSelect', () => {

  test('renders input and label for each item', () => {
    const mockItems = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ];

    render(<RadioSelect items={mockItems} />);

    const inputs = screen.getAllByRole('radio');

    expect(inputs.length).toBe(mockItems.length);

    mockItems.forEach((item) => {
      const label = screen.getByLabelText(item.label);

      expect(label).toBeInTheDocument();
    });
  });

  test('initially selects specified default item', () => {
    const mockDefault = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockDefault,
    ];

    render(<RadioSelect items={mockItems} defaultValue={mockDefault.value} />);

    const defaultItem = screen.getAllByRole('radio').find(
      (input) => (input as HTMLInputElement).checked
    ) as HTMLInputElement;

    expect(defaultItem.value).toBe(mockDefault.value);
  });

  test('calls onChange callback with selected item', async () => {
    const mockSelect = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockSelect,
    ];
    const mockOnChange = jest.fn();

    render(<RadioSelect items={mockItems} onChange={mockOnChange} />);

    const itemToSelect = screen.getByLabelText(mockSelect.label);

    await act(() => {
      itemToSelect.click();
    });

    expect(mockOnChange).toHaveBeenCalledWith(mockSelect);
  });

  test('radio should update as selected after click', async () => {
    const mockSelect = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockSelect,
    ];

    render(<RadioSelect items={mockItems} />);

    const items = screen.getAllByRole('radio') as HTMLInputElement[];
    const itemToSelect = items.find(
      (input) => input.value === mockSelect.value
    ) as HTMLInputElement;

    expect(items.every((input) => !input.checked)).toBe(true);

    await act(() => {
      itemToSelect.click();
    });

    expect(itemToSelect.checked).toBe(true);
  });

});
