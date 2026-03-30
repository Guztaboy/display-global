import { useState, useEffect } from "react";

export function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [date, setDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time, date };
}

function formatTime(d) {
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(d) {
  const opts = { weekday: "long", day: "numeric", month: "long" };
  const str = d.toLocaleDateString("pt-BR", opts);
  return str.charAt(0).toUpperCase() + str.slice(1);
}
