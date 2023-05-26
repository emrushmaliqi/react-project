import React, { useContext } from "react";
import { CoinsContext } from "../context/CoinsContext";
import CoinRow from "../components/CoinRow";

function CoinsTable() {
  const { coins } = useContext(CoinsContext);
  return (
    <div className="container my-5">
      <div className="row py-3 border-top border-bottom">
        <h5 className="col-5 col-sm-4 col-md-3 col-lg-3">Name</h5>
        <h5 className="col-4 col-sm-3 col-md-2 col-lg-2">Price</h5>
        <h5 className="col-1 col-sm-2 col-md-3 col-lg-2 d-none d-sm-block">
          Change (24h)
        </h5>
        <h5 className="col-3 col-lg-2 d-none d-lg-block">Market Cap</h5>
        <h5 className="col-4 col-lg-2 d-sm-none d-md-block d-none d-sm-block">
          Volume
        </h5>
      </div>
      {coins.map(coin => (
        <CoinRow key={coin.id} coin={coin} />
      ))}
    </div>
  );
}

export default CoinsTable;
