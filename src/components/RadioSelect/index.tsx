import { Fragment, useId, useState } from 'react';

export interface RadioItem {
  label: string
  value: string | number
}

interface Props {
  name?: string
  items: RadioItem[]
  defaultValue?: string | number
  onChange?: (item: RadioItem) => void
}

const RadioSelect = ({
  items,
  defaultValue,
  onChange = () => {},
}: Props) => {
  const [selected, setSelected] = useState<RadioItem>();
  const prefix = useId();

  const handleSelect = (item: RadioItem) => {
    setSelected(item);
    onChange(item);
  };

  const itemList = items.map((item) => (
    <Fragment key={item.value}>
      <input
        type="radio"
        id={`${prefix}-${item.label}`}
        name={`${prefix}-${item.label}`}
        value={item.value}
        checked={selected ? selected?.value === item.value : defaultValue === item.value}
        onChange={() => handleSelect(item)}
      />
      <label htmlFor={`${prefix}-${item.label}`}>
        {item.label}
      </label>
    </Fragment>
  ));

  return (
    <div>
      {itemList}
    </div>
  )
};

export default RadioSelect;
