import React, { useEffect, useState } from "react";
import { number } from "../modules/format_numbers";
import { getLocalWallet } from "../modules/getLocal";

function Trade({ id, name, symbol, price }) {
  const [walletData, setWalletData] = useState();
  const [coinAmount, setCoinAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(price);
  const [error, setError] = useState("");

  useEffect(() => {
    const localWallet = getLocalWallet();
    if (localWallet) {
      if (localWallet[id]) {
        setWalletData(localWallet);
      } else {
        localStorage.setItem(
          "wallet",
          JSON.stringify({ ...localWallet, [id]: 0 })
        );
        setWalletData(getLocalWallet());
      }
    } else {
      localStorage.setItem("wallet", JSON.stringify({ usd: 10000, [id]: 0 }));
      setWalletData(getLocalWallet());
    }
  }, [id]);

  useEffect(() => {
    if (walletData) localStorage.setItem("wallet", JSON.stringify(walletData));
  }, [walletData]);

  function handleUsdChange(e) {
    const amount = Number(e.target.value);
    setUsdAmount(amount);
    setCoinAmount(amount / price);
  }

  function handleCoinChange(e) {
    const amount = Number(e.target.value);
    setCoinAmount(amount);
    setUsdAmount(amount * price);
  }

  function handleBuy() {
    if (usdAmount > walletData.usd) {
      setError("Insufficient USD");
    } else if (usdAmount < 0) {
      setError("Invalid amount");
    } else {
      setWalletData(prev => ({
        ...prev,
        usd: prev.usd - usdAmount,
        [id]: prev[id] + coinAmount,
      }));
      setError("");
    }
  }

  function handleSell() {
    if (coinAmount > walletData[id]) {
      setError(`Insufficient ${symbol}`);
    } else if (coinAmount < 0) {
      setError("Invalid amount");
    } else {
      setWalletData(prev => ({
        ...prev,
        usd: prev.usd + usdAmount,
        [id]: prev[id] - coinAmount,
      }));
      setError("");
    }
  }

  if (walletData)
    return (
      <div className="mx-auto width-100 width-75 w-50 d-flex flex-column gap-2 border rounded p-3 mt-5">
        <div className="d-flex justify-content-around">
          <span>
            USD: <span id="usdValue">{number.format(walletData.usd)}</span>
          </span>
          <span>
            {name}: <span id="tokenValue">{number.format(walletData[id])}</span>
          </span>
        </div>
        <div>
          <div className="d-flex border rounded ps-2">
            <label htmlFor="tokenInput" className="py-2">
              {symbol.toUpperCase()}
            </label>
            <input
              min="0"
              type="number"
              value={coinAmount}
              onChange={handleCoinChange}
              id="tokenInput"
              className="w-100 ps-2 py-2"
            />
          </div>
          <div className="d-flex border rounded ps-2 mt-2">
            <label htmlFor="usdInput" className="py-2">
              USD
            </label>
            <input
              type="number"
              value={usdAmount}
              onChange={handleUsdChange}
              id="usdInput"
              className="w-100 ps-2 py-2"
            />
          </div>
        </div>
        <div className="d-flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleBuy}
            className="btn btn-success w-50"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={handleSell}
            className="btn btn-danger w-50"
          >
            Sell
          </button>
        </div>
        {error && <div className="text-center text-danger">{error}</div>}
      </div>
    );
  else return <div className="text-center">Loading...</div>;
}

export default Trade;
