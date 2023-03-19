import React from "react";
import styles from "./styles.module.css";

export default function SearchMovie({ value, onChange, onSearch }) {

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
        placeholder="What do you want to watch ?"
        onChange={handleSearch}
      />
      <button id="search-btn" type="submit" className={`upper text-light ${styles.submit}`}>search</button>
    </form>
  );
}
