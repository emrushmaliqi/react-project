import React, { useContext, useEffect } from "react";
import CoinsTable from "../components/CoinsTable";
import { CoinsContext } from "../context/CoinsContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Search() {
  const { setCoins } = useContext(CoinsContext);
  const { query } = useParams();

  useEffect(() => {
    async function fetchSearchedCoins() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );
        const coinsId = data.coins.map(coin => coin.id);

        const idsQuery = `&ids=${coinsId.join(",")}`;
        const { data: coins } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=25&page=1&sparkline=false`
        );
        setCoins(coins);
      } catch (e) {
        console.error(e);
      }
    }

    fetchSearchedCoins();
  }, [query, setCoins]);
  return (
    <>
      <CoinsTable />
    </>
  );
}

export default Search;
