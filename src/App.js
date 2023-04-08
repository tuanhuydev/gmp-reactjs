import { useState } from "react";
import Counter from "./components/Counter";
import SearchMovie from "./components/SearchMovie";
import Select from "./components/form/Select";
import { GENRE_OPTIONS } from "./configs/constants";
import Home from "./pages/Home";

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(["crime"]);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Submit Search Form");
  };

  const handleChangeGenre = (value) => {
    setGenre(value);
  };

  return <Home />;
}

export default App;
