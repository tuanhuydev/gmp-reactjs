import React, { createRef, useEffect, useState } from "react";
import styles from "./styles.module.css";

export function Option({ value, label, selected, onSelect }) {
  const select = (event) => {
    event.preventDefault();
    onSelect(value);
  };
  return (
    <div
      className={`flex items-center px-2 py-3 cursor-pointer ${styles.option} ${
        selected ? styles.selected : ""
      }`}
      aria-label={value}
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

export default function Select({
  label,
  placeholder = "Select",
  name,
  value,
  options = [],
  onSelect
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

  useEffect(() => {
    // Map values
    let selected = [];
    if (Array.isArray(value) && Array.isArray(options)) {
      options.forEach((option) => {
        if (typeof option === "string") {
          selected = value;
        } else {
          // option is an object
          value.forEach((item) => {
            if (option?.value === item) {
              selected.push(option?.value);
            }
          });
        }
      });
      setSelectedOptions(selected);
    }
  }, [options, value]);

  useEffect(() => {
    onSelect(selectedOptions);
  }, [onSelect, selectedOptions]);

  const selectOption = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div className="relative" data-testid="select-testid">
      {label && <label>{label}</label>}
      <div className="relative">
        <div
          className="input"
          onClick={toggleMenu(true)}
          onMouseLeave={toggleMenu(false)}
        >
          {placeholder && !selectedOptions?.length ? (
            <span className="text-light">{placeholder}</span>
          ) : (
            selectedOptions.join(",")
          )}
        </div>
        <div
          className={`absolute w-full ${styles.menu}`}
          ref={menuRef}
          data-testid="select-menu"
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
