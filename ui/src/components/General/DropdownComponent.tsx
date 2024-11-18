import React, { useState, useEffect, useRef } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownComponentProps {
  label: string;
  options: Option[];
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Close dropdown when user clicks outsite
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input Field */}
      <div
        className={`border min-w-56	 ${isOpen ? 'border-blue-500' : 'border-gray-300'} rounded-md p-2 flex items-center justify-between cursor-pointer`}
        onClick={toggleDropdown}
      >
        <span className="text-gray-700">{selectedOption ? selectedOption.label : label}</span>
        <svg
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
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

export default DropdownComponent;
