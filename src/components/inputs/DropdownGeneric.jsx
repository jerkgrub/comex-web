import { useState } from "react";
import ButtonGeneric from "./ButtonGeneric";

const DropdownGeneric = ({ label, icon, items }) => {
  const [selectedItem, setSelectedItem] = useState(label || items[0].label); // Default to first item if label not provided

  const handleItemClick = (item) => {
    setSelectedItem(item.label); // Update the label with the selected item
  };

  return (
    <div className="dropdown dropdown-left">
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