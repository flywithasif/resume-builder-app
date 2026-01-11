// src/components/DropdownMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-[#E7F6F2] hover:text-[#A5C9CA] font-medium px-4 py-2 focus:outline-none">
        {title}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-48 bg-[#395B64] shadow-md rounded z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block px-4 py-2 text-[#E7F6F2] hover:bg-[#2C3333] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
