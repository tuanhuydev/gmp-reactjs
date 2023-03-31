import { useState } from "react";
import Counter from "./components/Counter";
import SearchMovie from "./components/SearchMovie";
import Select from "./components/form/Select";
import { GENRE_OPTIONS } from './configs/constants';
import Home from "./pages/Home";

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(['crime']);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Submit Search Form");
  };

  const handleChangeGenre = (value) => {
    setGenre(value);
  };

  return (
    <div>
      <div className="mb-1">
        <Counter />
      </div>
      <div className="mb-1">
        <SearchMovie
          value={search}
          placeholder="What do you want to watch ?"
          onChange={setSearch}
          onSearch={handleSearch}
        />
      </div>
      <Select options={GENRE_OPTIONS} onChange={handleChangeGenre} placeholder="Please select genre" value={genre} />
      <Home />
    </div>
  );
}

export default App;
