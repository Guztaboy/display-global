import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import LockRing from "../components/LockRing";

/**
 * Lockdown — Full-screen "LOCKED" overlay when the room is busy.
 * @param {object} meeting - the current active meeting { title, start, end }
 */
export default function Lockdown({ meeting }) {
  const startStr = meeting.start
    ? `${String(meeting.start.getHours()).padStart(2, "0")}:${String(meeting.start.getMinutes()).padStart(2, "0")}`
    : "--:--";
  const endStr = meeting.end
    ? `${String(meeting.end.getHours()).padStart(2, "0")}:${String(meeting.end.getMinutes()).padStart(2, "0")}`
    : "--:--";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          filter: "grayscale(100%) contrast(1.2)",
          animation: "kenBurns 25s infinite alternate ease-in-out",
        }}
      />

      {/* Red radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(220,38,38,0.25) 0%, rgba(127,29,29,0.6) 50%, rgba(0,0,0,0.95) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Lock Ring */}
        <LockRing status="busy" size="lg" />

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <ShieldAlert size={20} color="#fca5a5" />
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#fca5a5",
              }}
            >
              Status da Sala
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: "0 6px 30px rgba(0,0,0,0.7)",
            }}
          >
            OCUPADO
          </h1>
        </motion.div>

        {/* Meeting info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 20,
            padding: "36px 60px",
            borderRadius: 4,
            border: "2px solid rgba(239,68,68,0.2)",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(239,68,68,0.15)",
            animation: "pulseGlowRed 2.5s infinite",
          }}
        >
          {/* Time */}
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#f8fafc",
              fontVariantNumeric: "tabular-nums",
              marginBottom: 8,
            }}
          >
            {startStr} — {endStr}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "1.4rem",
              color: "#e2e8f0",
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            {meeting.title}
          </div>

          {/* Countdown removed per user request */}
        </motion.div>

        {/* Do not disturb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: 30,
            fontSize: "0.8rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
          }}
        >
          NÃO PERTURBE • DO NOT DISTURB
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
