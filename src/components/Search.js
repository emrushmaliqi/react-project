import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === "") return;

    navigate(`/search/${search.replaceAll(" ", "%20")}`);
    setSearch("");
  };
  return (
    <form className={`mx-auto d-flex`} onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Tokens"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
