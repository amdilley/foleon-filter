import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './';

describe('Dropdown', () => {

  test('renders input and label for each item', () => {
    const mockItems = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ];

    render(<Dropdown items={mockItems} />);

    const inputs = screen.getAllByRole('option');

    expect(inputs.length).toBe(mockItems.length);

    mockItems.forEach((item) => {
      const option = screen.getByText(item.label);

      expect(option).toBeInTheDocument();
    });
  });

  test('initially selects specified default item', () => {
    const mockDefault = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockDefault,
    ];

    render(<Dropdown items={mockItems} defaultValue={mockDefault.value} />);

    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;

    expect(dropdown.value).toBe(mockDefault.value);
  });

  test('calls onChange callback with selected item', () => {
    const mockSelect = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockSelect,
    ];
    const mockOnChange = jest.fn();

    render(<Dropdown items={mockItems} onChange={mockOnChange} />);

    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: mockSelect.value } });

    expect(mockOnChange).toHaveBeenCalledWith(mockSelect);
  });

  test('dropwon should update as selected after click', async () => {
    const mockSelect = { label: 'Foo', value: 'foo' };
    const mockItems = [
      { label: 'Bar', value: 'bar' },
      mockSelect,
    ];

    render(<Dropdown items={mockItems} />);

    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: mockSelect.value } });

    expect(dropdown.value).toBe(mockSelect.value);
  });

});
