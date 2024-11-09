import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface CategoryDropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex justify-center gap-4 items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p>Explorar por categorías</p>
        <div className="border-tertiaryColor border-2 py-[5px] px-[9px] rounded-2xl w-64 h-8 flex justify-end items-center">
          <img src="icons/home/arrowDown.svg" alt="dropdown arrow" className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-tertiaryColor rounded-lg shadow-lg p-4">
          <ul>
            {options.map(option => (
              <li 
                key={option.value} 
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
