import React from "react";

const TICKERS = [
  { symbol: "AAPL", price: "198.42", change: "+1.24%", up: true },
  { symbol: "MSFT", price: "428.15", change: "+0.87%", up: true },
  { symbol: "NVDA", price: "131.28", change: "+2.41%", up: true },
  { symbol: "GOOGL", price: "178.63", change: "-0.32%", up: false },
  { symbol: "AMZN", price: "214.75", change: "+0.56%", up: true },
  { symbol: "META", price: "612.38", change: "+1.08%", up: true },
  { symbol: "TSLA", price: "352.91", change: "-1.15%", up: false },
  { symbol: "SPY", price: "598.22", change: "+0.44%", up: true },
  { symbol: "QQQ", price: "521.47", change: "+0.71%", up: true },
  { symbol: "BTC", price: "97,842", change: "+3.12%", up: true },
  { symbol: "VIX", price: "14.82", change: "-2.10%", up: false },
];

function TickerItem({ item }) {
  return (
    <span className="ticker-item">
      <span className="ticker-symbol">{item.symbol}</span>
      <span className="ticker-price">{item.price}</span>
      <span className={`ticker-change ${item.up ? "up" : "down"}`}>
        {item.change}
      </span>
    </span>
  );
}

export default function TickerBar() {
  const items = [...TICKERS, ...TICKERS];

  return (
    <div className="ticker-bar" aria-hidden="true">
      <div className="ticker-track">
        {items.map((item, i) => (
          <TickerItem key={`${item.symbol}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
