import React, { useEffect, useState } from "react";
import { getLocalWallet } from "../modules/getLocal";
import { number } from "../modules/format_numbers";
import WalletCoin from "../components/WalletCoin";
import axios from "axios";

function Wallet() {
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState();

  useEffect(() => {
    const localWallet = getLocalWallet();
    if (!localWallet)
      localStorage.setItem("wallet", JSON.stringify({ usd: 10000 }));
    setWallet(localWallet);
    let idsQuery = "&ids=";
    const ids = [];
    for (const key in localWallet) {
      if (key !== "usd" && localWallet[key] > 0) {
        ids.push(key);
      }
    }
    if (ids.length > 0) {
      idsQuery += ids.join(",");
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        )
        .then(res => {
          setCoins(res.data);
        });
    }
  }, []);
  if (wallet)
    return (
      <div>
        <h2 className="container mt-4">Wallet</h2>
        <div id="tokens" className="container my-5">
          <div className="row px-sm-4 px-lg-4 mx-sm-5 py-2 border-bottom">
            <span className="col-3">Token</span>
            <span className="col-3">Amount</span>
            <span className="col-3">24H Change</span>
          </div>
          <div className="row px-sm-4 px-lg-4 mx-sm-5 py-2 border-bottom">
            <span className="col-3">$ - USD</span>
            <span className="col-6" id="usdAmount">
              {number.format(wallet.usd)}
            </span>
          </div>
          {coins.map(coin => (
            <WalletCoin
              key={coin.id}
              amount={wallet[coin.id]}
              change={coin.price_change_percentage_24h}
              price={coin.current_price}
              symbol={coin.symbol}
              id={coin.id}
            />
          ))}
        </div>
      </div>
    );
}

export default Wallet;
