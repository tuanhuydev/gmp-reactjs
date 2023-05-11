import React, { createRef, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Option = React.memo(function Option({ value, label, selected, onSelect }) {
  const select = useCallback(
    (event) => {
      event.preventDefault();
      onSelect(value, label);
    },
    [label, onSelect, value]
  );

  return (
    <div
      className={`flex items-center px-2 py-3 cursor-pointer ${styles.option} ${selected ? styles.selected : ''}`}
      aria-label={value}
      onClick={select}
    >
      <input type="checkbox" onChange={select} checked={selected} className="mr-1" />
      <span className="grow">{label}</span>
    </div>
  );
});

Option.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

const Select = React.memo(function Select({
  label,
  placeholder = 'Select',
  value = null,
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
          const newState = optionSelected(newOption)
            ? selectState.filter((option) => option.value !== value)
            : [...selectState, newOption];
          return newState;
        });
      }
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
  }, [isMultiple, options]);

  useEffect(() => {
    if (selectState) {
      onSelect(selectState);
    }
  }, [selectState]);

  // SHOULD DISPLAY PLACEHOLDER
  // multiple select & selectState has at least 1 item
  // single select & selectState exist value
  const showPlaceholder = placeholder && ((isMultiple && !selectState?.length) || !selectState);

  return (
    <div className={`relative w-full ${className}`} data-testid="select-testid">
      {label && <label className="block text-primary text-lg upper mb-2">{label}</label>}
      <div className="relative">
        <div className={`input relative ${styles.select}`} onClick={toggleMenu(true)} onMouseLeave={toggleMenu(false)}>
          {showPlaceholder ? (
            <span className="text-light">{placeholder}</span>
          ) : isMultipleSelect ? (
            <span>{selectState.map((option) => option.label).join(',')}</span>
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

Select.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  onSelect: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
