import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { price } from "../modules/format_numbers";
import CoinDetailsTable from "../components/CoinDetailsTable";
import Trade from "../components/Trade";
import { getLocalWatchList } from "../modules/getLocal";
import axios from "axios";

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [inWatchList, setInWatchList] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
      )
      .then(res => {
        setCoin(res.data);
        setInWatchList(getLocalWatchList().includes(res.data.id));
      })
      .catch(err => console.log(err));
  }, [id]);

  function addToWatchlist() {
    const watchList = getLocalWatchList();

    if (!watchList) {
      localStorage.setItem("watchlist", JSON.stringify([coin.id]));
    } else {
      if (inWatchList) {
        localStorage.setItem(
          "watchlist",
          JSON.stringify(watchList.filter(c => c !== coin.id))
        );
      } else {
        localStorage.setItem(
          "watchlist",
          JSON.stringify([coin.id, ...watchList])
        );
      }
      setInWatchList(prev => !prev);
    }
  }

  if (coin) {
    return (
      <div className="container my-5 d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-2">
          <img src={coin.image.small} alt={`${coin.name} logo`} />
          <h3>{coin.name}</h3>
          <span className="text-secondary">{coin.symbol.toUpperCase()}</span>
          <i
            role="button"
            className={`bi bi-star${inWatchList ? "-fill text-yellow" : ""}`}
            title="Click to add to WatchList"
            onClick={addToWatchlist}
          ></i>
        </div>
        <div>
          <h2 className="d-flex align-items-center">
            {price.format(coin.market_data.current_price.usd)}{" "}
            <span
              className={`fs-5 ${
                coin.market_data.price_change_percentage_24h > 0
                  ? "text-green"
                  : "text-red"
              }`}
            >
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </h2>
        </div>
        <div>
          <span className="text-secondary">
            {coin.market_data.current_price.btc} BTC{" "}
          </span>
          <span
            className={
              coin.market_data.price_change_percentage_24h_in_currency.btc > 0
                ? "text-green"
                : "text-red"
            }
          >
            {coin.market_data.price_change_percentage_24h_in_currency.btc.toFixed(
              2
            )}
            %
          </span>
        </div>
        <CoinDetailsTable
          market_cap={coin.market_data.market_cap.usd}
          volume={coin.market_data.total_volume.usd}
          valuation={coin.market_data.fully_diluted_valuation.usd}
          circulating_supply={coin.market_data.circulating_supply}
          total_supply={coin.market_data.total_supply}
          max_supply={coin.market_data.max_supply}
        />

        <Trade
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.market_data.current_price.usd}
        />
      </div>
    );
  } else {
    return <div className="text-center">Coin doesn't exist</div>;
  }
}

export default Coin;
