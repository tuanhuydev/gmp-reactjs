import React, { createRef, useState } from "react";
import styles from "./styles.module.css";

export function Option({ value, label, selected, onSelect }) {
  const select = (event) => {
    event.preventDefault();
    onSelect(value);
  };
  return (
    <div
      className={`flex items-center px-2 py-1 cursor-pointer ${styles.option} ${
        selected ? styles.selected : ""
      }`}
      value={value}
      onClick={select}
    >
      <input
        type="checkbox"
        onChange={select}
        checked={selected}
        className="mr-1"
      />
      <span className="grow">{label}</span>
    </div>
  );
}

export default function SelectGenre({
  label,
  value,
  placeholder,
  options = [],
}) {
  // State
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Ref
  const menuRef = createRef(null);

  const toggleMenu =
    (isFocus = true) =>
    () => {
      const menuEl = menuRef.current;
      if (menuEl && isFocus) {
        menuEl.classList.add(styles.visible);
      } else if (menuEl) {
        menuEl.classList.remove(styles.visible);
      }
    };

  const selectOption = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div className="relative">
      {label && <label>{label}</label>}
      <div className="relative">
        <div
          className="input"
          onClick={toggleMenu(true)}
          onMouseLeave={toggleMenu(false)}
        >
          {placeholder && !selectedOptions?.length
            ? placeholder
            : selectedOptions.join(",")}
        </div>
        <div
          className={`absolute w-full ${styles.menu}`}
          ref={menuRef}
          onMouseEnter={toggleMenu(true)}
          onMouseLeave={toggleMenu(false)}
        >
          {options.map((option) => {
            if (typeof option === "string") {
              return (
                <Option
                  label={option}
                  key={option}
                  value={option}
                  selected={selectedOptions.includes(option)}
                  onSelect={selectOption}
                />
              );
            }
            return (
              <Option
                label={option?.label}
                key={option?.value}
                value={option?.value}
                selected={selectedOptions.includes(option?.value)}
                onSelect={selectOption}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
