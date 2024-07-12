import { useId } from 'react';

export interface DropdownItem {
  label: string
  value: string | number
}

interface Props {
  items: DropdownItem[]
  defaultValue?: string | number
  disabled?: boolean
  onChange?: (item: DropdownItem) => void
}

const Dropdown = ({
  items,
  defaultValue,
  disabled = false,
  onChange = () => {},
}: Props) => {
  const id = useId();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const item = items.find((i) => i.value === e.target.value) as DropdownItem;

    onChange(item);
  };

  const itemList = items.map((item) => (
    <option
      key={item.label}
      value={item.value}
    >
      {item.label}
    </option>
  ));

  return (
    <div>
      <select
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleSelect}
      >
        {itemList}
      </select>
    </div>
  )
};

export default Dropdown;
