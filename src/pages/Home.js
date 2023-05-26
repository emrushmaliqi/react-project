import React, { useContext, useEffect, useState } from "react";
import { CoinsContext } from "../context/CoinsContext";
import axios from "axios";
import Coiins from "../coins.json";
import Pagination from "../components/Pagination";
import CoinsTable from "../components/CoinsTable";

function Home() {
  const { setCoins } = useContext(CoinsContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) setCoins(Coiins);
    else
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
        )
        .then(res => {
          setCoins(res.data);
        })
        .catch(err => console.error(err));
  }, [page, setCoins]);

  return (
    <>
      <CoinsTable />
      <Pagination page={page} setPage={setPage} />
    </>
  );
}

export default Home;
