import React from "react";
import { compactPrice, compactNumber } from "../modules/format_numbers";

function CoinDetailsTable({
  market_cap,
  volume,
  valuation,
  circulating_supply,
  total_supply,
  max_supply,
}) {
  return (
    <div className="row mt-4">
      <div className="col-12 col-sm-6 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
          <span className="text-secondary">Market Cap</span>
          <span className="text-end">{compactPrice.format(market_cap)}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
          <span className="text-secondary">24H Trading Vol</span>
          <span className="text-end">{compactPrice.format(volume)}</span>
        </div>

        {valuation ? (
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <span className="text-secondary">Fully Diluted Valuation</span>
            <span className="text-end">{compactPrice.format(valuation)}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="col-12 col-sm-6 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
          <span className="text-secondary">Circulating Supply</span>
          <span className="text-end">
            {compactNumber.format(circulating_supply)}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
          <span className="text-secondary">Total Supply</span>
          <span className="text-end">
            {total_supply ? compactNumber.format(total_supply) : "&infin;"}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center border-bottom py-2">
          <span className="text-secondary">Max Supply</span>
          <span className="text-end">
            {max_supply ? compactNumber.format(max_supply) : "&infin;"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CoinDetailsTable;
