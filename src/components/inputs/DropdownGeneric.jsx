import React, { useState, useEffect } from 'react';
import ButtonGeneric from './ButtonGeneric';

const DropdownGeneric = ({ value, icon, items, onChange }) => {
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const selected = items.find(item => item.value === value);
    if (selected) {
      setSelectedItem(selected.label);
    } else {
      // Set default values if "All Usertypes" or "All Departments" are present
      const defaultItem = items.find(item => item.label === "All Usertypes" || item.label === "All Departments");
      if (defaultItem) {
        setSelectedItem(defaultItem.label);
        onChange(defaultItem.value);
      }
    }
  }, [value, items, onChange]);

  const handleItemClick = (item) => {
    setSelectedItem(item.label); // Update the label with the selected item
    onChange(item.value); // Call the onChange handler with the selected value
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // Blur the active element to close the dropdown
    }
  };

  return (
    <div className="dropdown dropdown-bottom">
      <div className="flex w-max">
        <ButtonGeneric
          label={selectedItem}
          icon={icon}
          tabIndex={0}
          role="button"
          className="btn"
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {/* Map through items passed as props */}
        {items.map((item, index) => (
          <li key={index}>
            <a onClick={() => handleItemClick(item)} value={item.value}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownGeneric;