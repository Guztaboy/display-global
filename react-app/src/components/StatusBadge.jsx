import { motion } from "framer-motion";

/**
 * StatusBadge — Animated pill showing lock status text.
 * @param {"free"|"busy"|"idle"} status
 */
export default function StatusBadge({ status = "idle" }) {
  const config = {
    free: {
      label: "LIVRE",
      bg: "rgba(255, 255, 255, 0.05)",
      border: "rgba(14, 165, 233, 0.3)",
      color: "#7dd3fc",
      dot: "#0ea5e9",
    },
    busy: {
      label: "OCUPADO",
      bg: "rgba(255, 255, 255, 0.05)",
      border: "rgba(239, 68, 68, 0.3)",
      color: "#fca5a5",
      dot: "#ef4444",
    },
    idle: {
      label: "SALA 01",
      bg: "rgba(255, 255, 255, 0.05)",
      border: "rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.7)",
      dot: "rgba(255, 255, 255, 0.5)",
    },
  };

  const c = config[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 24px",
        borderRadius: 9999,
        background: c.bg,
        border: `1px solid ${c.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Pulsing dot */}
      <motion.div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: c.dot,
        }}
        animate={
          status === "busy"
            ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }
            : { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{
          duration: status === "busy" ? 1 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "2px",
          color: c.color,
          textTransform: "uppercase",
        }}
      >
        {c.label}
      </span>
    </motion.div>
  );
}
