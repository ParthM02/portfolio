import React, { useEffect, useRef } from "react";

const CANDLE_WIDTH = 12;
const CANDLE_GAP = 4;

function getCandleCount(width) {
  const slot = CANDLE_WIDTH + CANDLE_GAP;
  return Math.max(24, Math.floor(width / slot));
}

function createCandle(prevClose) {
  const open = prevClose ?? 50 + Math.random() * 20;
  const change = (Math.random() - 0.48) * 8;
  const close = Math.max(10, open + change);
  const high = Math.max(open, close) + Math.random() * 4;
  const low = Math.min(open, close) - Math.random() * 4;
  return { open, close, high, low: Math.max(2, low) };
}

function initCandles(count) {
  const candles = [];
  let last = 55;
  for (let i = 0; i < count; i++) {
    const c = createCandle(last);
    candles.push(c);
    last = c.close;
  }
  return candles;
}

export default function CandlestickBackground() {
  const canvasRef = useRef(null);
  const candlesRef = useRef([]);
  const candleCountRef = useRef(0);
  const frameRef = useRef(null);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced =
      typeof window.matchMedia === "function"
        ? Boolean(window.matchMedia("(prefers-reduced-motion: reduce)")?.matches)
        : false;
    const ctx = canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getCandleCount(window.innerWidth);
      if (count !== candleCountRef.current) {
        candleCountRef.current = count;
        candlesRef.current = initCandles(count);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const candles = candlesRef.current;
      const count = candles.length;
      if (!count) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      const minPrice = Math.min(...candles.map((c) => c.low));
      const maxPrice = Math.max(...candles.map((c) => c.high));
      const range = maxPrice - minPrice || 1;
      const paddingY = h * 0.1;
      const chartH = h - paddingY * 2;

      const priceToY = (price) =>
        paddingY + chartH - ((price - minPrice) / range) * chartH;

      const slot = CANDLE_WIDTH + CANDLE_GAP;
      const startX = (w - count * slot) / 2;

      candles.forEach((candle, i) => {
        const x = startX + i * slot + CANDLE_WIDTH / 2;
        const isUp = candle.close >= candle.open;
        const color = isUp ? "rgba(52, 211, 153, 0.2)" : "rgba(239, 68, 68, 0.18)";
        const wickColor = isUp ? "rgba(52, 211, 153, 0.28)" : "rgba(239, 68, 68, 0.24)";

        const openY = priceToY(candle.open);
        const closeY = priceToY(candle.close);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);
        const bodyTop = Math.min(openY, closeY);
        const bodyH = Math.max(Math.abs(closeY - openY), 2);

        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillRect(x - CANDLE_WIDTH / 2, bodyTop, CANDLE_WIDTH, bodyH);
      });

      if (!prefersReduced) {
        tickRef.current += 1;
        if (tickRef.current % 75 === 0) {
          const last = candles[candles.length - 1].close;
          candles.shift();
          candles.push(createCandle(last));
        } else if (tickRef.current % 2 === 0) {
          const last = candles[candles.length - 1];
          const nudge = (Math.random() - 0.5) * 0.8;
          last.close = Math.max(10, last.close + nudge);
          last.high = Math.max(last.high, last.close, last.open);
          last.low = Math.min(last.low, last.close, last.open);
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="candlestick-bg"
      aria-hidden="true"
    />
  );
}
