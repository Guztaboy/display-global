import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

/**
 * CountdownTimer — Shows live countdown to meeting end.
 * @param {Date} endTime
 */
export default function CountdownTimer({ endTime }) {
  const [remaining, setRemaining] = useState(calcRemaining(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(calcRemaining(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (!endTime) return null;

  const { hours, minutes, seconds, total } = remaining;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        justifyContent: "center",
      }}
    >
      <Timer
        size={22}
        color={total < 300 ? "#fca5a5" : "rgba(255,255,255,0.5)"}
      />
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "baseline",
        }}
      >
        {hours > 0 && (
          <>
            <TimeBlock value={hours} label="h" warn={total < 300} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.5rem" }}>:</span>
          </>
        )}
        <TimeBlock value={minutes} label="min" warn={total < 300} />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.5rem" }}>:</span>
        <TimeBlock value={seconds} label="seg" warn={total < 300} />
      </div>
    </div>
  );
}

function TimeBlock({ value, label, warn }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          color: warn ? "#fca5a5" : "#f8fafc",
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function calcRemaining(endTime) {
  if (!endTime) return { hours: 0, minutes: 0, seconds: 0, total: 0 };

  const now = new Date();
  const diff = Math.max(0, endTime.getTime() - now.getTime());
  const total = Math.floor(diff / 1000);

  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    total,
  };
}
