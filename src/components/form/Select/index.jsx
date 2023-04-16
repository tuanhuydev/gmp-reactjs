import React, { createRef, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

const Option = React.memo(function Option({
  value,
  label,
  selected,
  onSelect,
}) {
  const select = useCallback(
    (event) => {
      event.preventDefault();
      onSelect(value, label);
    },
    [label, onSelect, value]
  );

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
});

export default React.memo(function Select({
  label,
  placeholder = "Select",
  value,
  options = [],
  onSelect,
  isMultiple = false,
  className,
}) {
  // State
  const [selectState, setSelectState] = useState(null); // can be array or single object

  const isMultipleSelect = selectState && Array.isArray(selectState);

  // Ref
  const menuRef = createRef(null);

  const toggleMenu = useCallback(
    (isFocus = true) =>
      () => {
        const menuEl = menuRef.current;
        if (!menuEl) return;

        const menuClasses = menuEl.classList;
        const menuParentClasses = menuEl.parentNode.firstChild.classList;

        // Visibility handle
        menuClasses.remove(styles.visible);
        menuParentClasses.remove(styles.active);

        if (isFocus) {
          menuClasses.add(styles.visible);
          menuParentClasses.add(styles.active);
        }
      },
    [menuRef]
  );

  /**
   * Detect whenever option is selected
   * - if multiple state then check option existed
   * - if single state then value
   */
  const optionSelected = useCallback(
    (option) =>
      isMultipleSelect
        ? selectState.some((item) => item?.value === option?.value)
        : option?.value === selectState?.value,
    [isMultipleSelect, selectState]
  );

  /**
   * update state on selection
   * - if single select then override current state
   * - if multiple select then check whenever existed and update state as array
   * - update state action should trigger callback
   */
  const selectOption = useCallback(
    (value, label) => {
      const newOption = { label, value };
      if (!isMultipleSelect) {
        setSelectState(newOption);
      } else {
        // check / un-check
        setSelectState((selectState) => {
          return optionSelected(newOption)
            ? selectState.filter((option) => option.value !== value)
            : [...new Set([...selectState, newOption])];
        });
      }
      onSelect(selectState);
    },
    [isMultipleSelect, onSelect, optionSelected, selectState]
  );

  useEffect(() => {
    if (value) {
      // map value
      let movieState;
      if (isMultiple && Array.isArray(value)) {
        movieState = options.filter(({ value: optionValue }) => value === optionValue);
      } else {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) {
          movieState = selectedOption;
        }
      }
      setSelectState(movieState);
    }
  }, [isMultiple, options, value]);

  return (
    <div className={`relative w-full ${className}`} data-testid="select-testid">
      {label && (
        <label className="block text-primary text-lg upper mb-2">{label}</label>
      )}
      <div className="relative">
        <div
          className={`input relative ${styles.select}`}
          onClick={toggleMenu(true)}
          onMouseLeave={toggleMenu(false)}
        >
          {placeholder && !selectState ? (
            <span className="text-light">{placeholder}</span>
          ) : isMultipleSelect ? (
            <span>{selectState.map((option) => option.label).join(",")}</span>
          ) : (
            <span>{selectState.label}</span>
          )}
        </div>
        <div
          className={`absolute w-full ${styles.menu}`}
          ref={menuRef}
          data-testid="select-menu"
          onMouseEnter={toggleMenu(true)}
          onMouseLeave={toggleMenu(false)}
        >
          {options.map((option) => (
            <Option
              label={option?.label}
              key={option?.value}
              value={option?.value}
              selected={optionSelected(option)}
              onSelect={selectOption}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
