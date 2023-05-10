import React, { useState } from "react";

function Search({ path }) {
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }
  };

  return (
    <form
      className={`mx-auto d-flex ${path !== "home" && "invisible"}`}
      onSubmit={handleSubmit}
    >
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
