import axios from "axios";
import React, { useEffect, useState } from "react";
import { getLocalWatchList } from "../modules/getLocal";
import CoinRow from "../components/CoinRow";

function WatchList() {
  const [coins, setCoins] = useState([]);

  function fetchCoins() {
    const watchList = getLocalWatchList();
    let idsQuery = "&ids=";

    console.log(watchList);
    if (watchList.length > 0) {
      idsQuery += watchList.join(",");
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        )
        .then(res => {
          setCoins(res.data);
        })
        .catch(err => console.log(err));
    }
  }
  useEffect(() => {
    fetchCoins();
  }, []);

  function handleStar(id) {
    setCoins(prev => prev.filter(coin => coin.id !== id));
    const updatedLocal = getLocalWatchList().filter(coin => coin !== id);
    localStorage.setItem("watchlist", JSON.stringify(updatedLocal));
  }

  return (
    <div className="container my-5">
      <h2>Watchlist</h2>
      {coins.length ? (
        <>
          <div className="row py-3 border-top border-bottom mt-4">
            <h5 className="col-5 col-sm-4 col-md-3 col-lg-3">Name</h5>
            <h5 className="col-4 col-sm-3 col-md-2 col-lg-2">Price</h5>
            <h5 className="col-1 col-sm-2 col-md-3 col-lg-2 d-none d-sm-block">
              Change (24h)
            </h5>
            <h5 className="col-3 col-lg-2 d-none d-lg-block">Market Cap</h5>
            <h5 className="col-4 col-lg-2 d-sm-none d-md-block d-none d-sm-block">
              Volume
            </h5>
            <i
              className="bi bi-arrow-clockwise col-md-1 col-3"
              type="button"
              onClick={fetchCoins}
            ></i>
          </div>
          {coins.map(coin => (
            <CoinRow key={coin.id} coin={coin} handleStar={handleStar} />
          ))}
        </>
      ) : (
        <p className="text-center">No coins in watchlist!</p>
      )}
    </div>
  );
}

export default WatchList;
