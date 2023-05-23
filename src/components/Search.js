import React, { useContext, useState } from "react";
import { CoinsContext } from "../context/CoinsContext";
import axios from "axios";

function Search({ path }) {
  const [search, setSearch] = useState("");
  const { setCoins, setDidSearch } = useContext(CoinsContext);

  const handleSubmit = async e => {
    e.preventDefault();

    if (search.trim() === "") return;

    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${search.replaceAll(
          " ",
          "%20"
        )}`
      );
      const coinsId = data.coins.map(coin => coin.id);

      const idsQuery = `&ids=${coinsId.join(",")}`;
      const { data: coins } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      );
      setDidSearch(true);
      setCoins(coins);
    } catch (e) {
      console.error(e);
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
