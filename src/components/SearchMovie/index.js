import React from "react";
import styles from "./styles.module.css";

export default function SearchMovie({ value, onChange, onSearch, placeholder }) {

  const handleSearch = (event) => {
    const value = event.target.value || "";
    onChange(value);
  }

  return (
    <form className="flex" onSubmit={onSearch}>
      <input
        name="search"
        className="grow input mr-1"
        defaultValue={value}
        id="search-input"
        placeholder={placeholder}
        onChange={handleSearch}
      />
      <button id="search-btn" type="submit" className={`upper text-light ${styles.submit}`}>search</button>
    </form>
  );
}
