import React from "react";
import { Link } from "react-router-dom";

function WalletCoin({ id, price, symbol, change, amount }) {
  return (
    <div className="token-container row d-flex align-items-center py-2 px-sm-4 px-lg-4 mx-sm-5 border-bottom">
      <span className="col-3">{symbol.toUpperCase()}</span>
      <div className="col-3 d-flex flex-column">
        <span>{amount}</span>
        <span className="fs-7">${(amount * price).toFixed(2)}</span>
      </div>
      <span className="col-3 ">{change.toFixed(2)}%</span>
      <div className="col-3 text-center">
        <Link type="button" className="btn btn-primary" to={`/coin/${id}`}>
          Trade
        </Link>
      </div>
    </div>
  );
}

export default WalletCoin;
