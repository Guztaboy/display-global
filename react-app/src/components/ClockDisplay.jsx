import { useClock } from "../hooks/useClock";

/**
 * ClockDisplay — Large clock and date display.
 * @param {"light"|"dark"} variant
 */
export default function ClockDisplay({ variant = "light" }) {
  const { time, date } = useClock();

  const isDark = variant === "dark";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "4rem",
          fontWeight: 200,
          letterSpacing: "-3px",
          lineHeight: 1,
          color: "#ffffff",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "rgba(255, 255, 255, 0.7)",
          marginTop: 6,
          fontWeight: 400,
          letterSpacing: "0.5px",
        }}
      >
        {date}
      </div>
    </div>
  );
}
