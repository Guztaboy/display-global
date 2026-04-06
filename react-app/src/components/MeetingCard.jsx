import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

/**
 * MeetingCard — A single meeting entry in the agenda list.
 * @param {object} meeting - { title, organizer, start, end }
 * @param {"upcoming"|"ongoing"|"finished"} cardStatus
 * @param {number} index - for stagger animation
 */
export default function MeetingCard({ meeting, cardStatus = "upcoming", index = 0 }) {
  const startStr = formatTime(meeting.start);
  const endStr = meeting.end ? formatTime(meeting.end) : "--:--";

  const statusConfig = {
    ongoing: {
      border: "#ef4444",
      bg: "rgba(255, 255, 255, 0.05)",
      tagBg: "rgba(239, 68, 68, 0.1)",
      tagColor: "#ef4444",
      tagText: "EM ANDAMENTO",
      timeColor: "#ef4444",
    },
    upcoming: {
      border: "#3b82f6",
      bg: "rgba(255, 255, 255, 0.05)",
      tagBg: "rgba(59, 130, 246, 0.08)",
      tagColor: "#3b82f6",
      tagText: "CONFIRMADO",
      timeColor: "#3b82f6",
    },
    finished: {
      border: "#475569",
      bg: "rgba(255, 255, 255, 0.05)",
      tagBg: "rgba(71, 85, 105, 0.08)",
      tagColor: "#64748b",
      tagText: "FINALIZADO",
      timeColor: "#64748b",
    },
  };

  const sc = statusConfig[cardStatus];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "20px 24px",
        marginBottom: 12,
        borderRadius: 16,
        background: sc.bg,
        borderLeft: `5px solid ${sc.border}`,
        backdropFilter: "blur(4px)",
        border: `1px solid rgba(255,255,255,0.04)`,
        borderLeftWidth: 5,
        borderLeftStyle: "solid",
        borderLeftColor: sc.border,
        transition: "all 0.3s ease",
      }}
    >
      {/* Time */}
      <div style={{ minWidth: 110 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sc.timeColor,
            fontWeight: 800,
            fontSize: "1.15rem",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <Clock size={14} />
          {startStr}
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "#64748b",
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          até {endStr}
        </div>
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 4,
          }}
        >
          {meeting.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={12} color="rgba(255, 255, 255, 0.6)" />
          </div>
          {meeting.organizer}
        </div>
      </div>

      {/* Tag */}
      <div
        style={{
          padding: "6px 14px",
          borderRadius: 9999,
          background: sc.tagBg,
          color: sc.tagColor,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {sc.tagText}
      </div>
    </motion.div>
  );
}

function formatTime(d) {
  if (!d) return "--:--";
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
