import { useState } from "react";
import Counter from "./components/Counter";
import SearchMovie from "./components/SearchMovie";
import Select from "./components/form/Select";

function App() {
  const [search, setSearch] = useState("");

  const genreOptions = [
    { label: "Crime", value: "crime" },
    { label: "Documentary", value: "documentary" },
    { label: "Horror", value: "horror" },
    { label: "Comedy", value: "comedy" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Submit Search Form");
  };

  return (
    <div>
      <div className="mb-1">
        <Counter />
      </div>
      <div className="mb-1">
        <SearchMovie
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />
      </div>
      <Select options={genreOptions} placeholder="Please select genre" selectedValue={'Crime'} />
    </div>
  );
}

export default App;
