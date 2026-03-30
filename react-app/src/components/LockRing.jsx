import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

/**
 * LockRing — The hero visual component.
 * An animated SVG ring that represents the lock state.
 *
 * @param {"free"|"busy"|"idle"} status
 * @param {"sm"|"md"|"lg"} size
 */
export default function LockRing({ status = "idle", size = "md" }) {
  const sizes = { sm: 160, md: 260, lg: 360 };
  const iconSizes = { sm: 40, md: 64, lg: 88 };
  const strokeWidths = { sm: 4, md: 6, lg: 8 };

  const dim = sizes[size];
  const iconDim = iconSizes[size];
  const sw = strokeWidths[size];
  const r = (dim - sw * 2) / 2;
  const circumference = 2 * Math.PI * r;

  const colors = {
    free: { ring: "#0ea5e9", glow: "rgba(14,165,233,0.45)", icon: "#0ea5e9" },
    busy: { ring: "#ef4444", glow: "rgba(239,68,68,0.4)", icon: "#ef4444" },
    idle: { ring: "#475569", glow: "rgba(71,85,105,0.15)", icon: "#64748b" },
  };

  const c = colors[status];
  const IconComponent = status === "busy" ? Lock : Unlock;

  return (
    <div
      style={{
        position: "relative",
        width: dim,
        height: dim,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow */}
      <motion.div
        style={{
          position: "absolute",
          width: dim * 1.3,
          height: dim * 1.3,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
        }}
        animate={
          status === "busy"
            ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }
            : status === "free"
              ? { scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }
              : { scale: [1, 1.03, 1], opacity: [0.2, 0.35, 0.2] }
        }
        transition={{
          duration: status === "busy" ? 1.5 : status === "free" ? 3 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SVG Ring */}
      <svg
        width={dim}
        height={dim}
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        {/* Background ring */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={sw}
        />
        {/* Active ring */}
        <motion.circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={c.ring}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${c.glow})`,
          }}
        />
      </svg>

      {/* Rotating tick marks */}
      <motion.div
        style={{
          position: "absolute",
          width: dim,
          height: dim,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 10 : 5,
              background:
                i % 5 === 0
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.05)",
              transformOrigin: "center",
              transform: `rotate(${i * 6}deg) translateY(-${r - 4}px)`,
              borderRadius: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Center icon */}
      <motion.div
        style={{ position: "relative", zIndex: 2 }}
        animate={
          status === "busy"
            ? { scale: [1, 1.1, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: 1.5,
          repeat: status === "busy" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <IconComponent
          size={iconDim}
          color={c.icon}
          strokeWidth={1.5}
          style={{ filter: `drop-shadow(0 0 12px ${c.glow})` }}
        />
      </motion.div>
    </div>
  );
}
