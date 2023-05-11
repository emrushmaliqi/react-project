import React from "react";
import { Link } from "react-router-dom";
import { compactPrice, price } from "../modules/format_numbers";

function CoinRow({ coin, handleStar = false }) {
  return (
    <>
      <div
        className="row d-flex align-items-center border-bottom coin-container"
        style={{ minHeight: "60px" }}
      >
        <div className="col-5 col-sm-4 col-md-3 col-lg-3 d-flex gap-1 align-items-center py-2">
          <img src={coin.image} alt={coin.name} style={{ height: "25px" }} />
          <Link className="text-decoration-none" to={`/coin/${coin.id}`}>
            <p className="coin-name d-sm-block d-none">{coin.name}</p>
          </Link>
          <p className="text-secondary">{coin.symbol.toUpperCase()}</p>
        </div>
        <div className="col-4 col-sm-3 col-md-2 col-lg-2">
          <p>{price.format(coin.current_price)}</p>
        </div>
        <div
          className={`col-1 col-sm-2 col-md-3 col-lg-2 d-sm-block d-none ${
            coin.price_change_percentage_24h < 0
              ? "text-red"
              : "ps-3 text-green"
          }`}
        >
          <p>
            {coin.price_change_percentage_24h
              ? `${coin.price_change_percentage_24h.toFixed(2)}%`
              : "no info"}
          </p>
        </div>
        <div className="col-3 col-lg-2 d-lg-block d-none">
          <p>{compactPrice.format(coin.market_cap)}</p>
        </div>
        <div className="col-3 col-lg-2 d-none d-md-block">
          <p>{compactPrice.format(coin.total_volume)}</p>
        </div>
        <div className="col-md-1 col-3 d-flex align-items-center gap-2">
          {handleStar ? (
            <i
              type="button"
              className="bi bi-star-fill text-yellow unWatch"
              onClick={() => handleStar(coin.id)}
            ></i>
          ) : (
            <Link
              type="button"
              className="btn btn-primary"
              to={`/coin/${coin.id}`}
            >
              Details
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default CoinRow;
