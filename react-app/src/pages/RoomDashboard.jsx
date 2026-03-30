import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Plus, ShieldOff } from "lucide-react";

import LockRing from "../components/LockRing";
import StatusBadge from "../components/StatusBadge";
import ClockDisplay from "../components/ClockDisplay";
import MeetingCard from "../components/MeetingCard";
import BookingModal from "../components/BookingModal";
import CountdownTimer from "../components/CountdownTimer";

import { useRoomStatus } from "../hooks/useRoomStatus";

/**
 * RoomDashboard — Main agenda view.
 * Handles both FREE and BUSY states in one unified layout.
 * When busy: red theme, locked ring, countdown, booking disabled.
 * When free: green theme, unlocked ring, booking enabled.
 */
export default function RoomDashboard() {
  const { meetings, isBusy, currentMeeting } = useRoomStatus();
  const [modalOpen, setModalOpen] = useState(false);

  // Theme based on status
  const theme = isBusy
    ? {
      panelBg: "linear-gradient(180deg, #450a0a 0%, #1a0505 100%)",
      panelGlow: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
      containerBorder: "rgba(239,68,68,0.2)",
      containerShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(239,68,68,0.15)",
      rightBg: "linear-gradient(180deg, #1a0505 0%, #0f0000 100%)",
      headerBorder: "rgba(239,68,68,0.1)",
      lockStatus: "busy",
      bgGradient: "linear-gradient(135deg, #450a0a 0%, #1a0505 50%, #2d0a0a 100%)",
    }
    : {
      panelBg: "linear-gradient(180deg, #0c2840 0%, #071929 100%)",
      panelGlow: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
      containerBorder: "rgba(14,165,233,0.15)",
      containerShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 60px rgba(14,165,233,0.08)",
      rightBg: "linear-gradient(180deg, #0a1929 0%, #06111d 100%)",
      headerBorder: "rgba(14,165,233,0.1)",
      lockStatus: "free",
      bgGradient: "linear-gradient(135deg, #0c2840 0%, #0f172a 50%, #071929 100%)",
    };

  // Derive card statuses
  const now = new Date();
  function getCardStatus(meeting) {
    if (meeting.start && meeting.end) {
      if (now >= meeting.start && now < meeting.end) return "ongoing";
      if (now >= meeting.end) return "finished";
    }
    return "upcoming";
  }

  return (
    <motion.div
      key={isBusy ? "busy" : "free"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <motion.div
        animate={{ background: theme.bgGradient }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.7,
        }}
      />

      {/* Red radial light when busy */}
      {isBusy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 25% center, rgba(239,68,68,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main Container */}
      <motion.div
        layout
        animate={{
          borderColor: theme.containerBorder,
          boxShadow: theme.containerShadow,
        }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "92%",
          maxWidth: 1280,
          height: "88vh",
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          borderRadius: 32,
          overflow: "hidden",
          border: `1px solid ${theme.containerBorder}`,
          boxShadow: theme.containerShadow,
        }}
      >
        {/* ────── LEFT PANEL — Status ────── */}
        <motion.div
          animate={{ background: theme.panelBg }}
          transition={{ duration: 0.8 }}
          style={{
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: theme.panelGlow,
              pointerEvents: "none",
              transition: "background 0.8s",
            }}
          />

          {/* Busy alert pulse overlay */}
          {isBusy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.06, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(239,68,68,1)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Logo */}
          <img
            src="https://globalsrv.com.br/wp-content/uploads/2023/02/Logo_60px_white.png"
            alt="Logo"
            style={{
              maxWidth: 150,
              maxHeight: 55,
              objectFit: "contain",
              zIndex: 2,
              opacity: 0.9,
            }}
          />

          {/* Lock Ring + Status — constrained so it never overlaps the logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              zIndex: 2,
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <LockRing status={theme.lockStatus} size="md" />
            <StatusBadge status={theme.lockStatus} />

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <h1
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  color: "#f8fafc",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
              >
                SALA PACAEMBU
              </h1>
              <motion.p
                animate={{ color: isBusy ? "#fca5a5" : "rgba(255,255,255,0.5)" }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: "0.85rem",
                  marginTop: 6,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {isBusy ? "Em Reunião" : "Sala Principal"}
              </motion.p>
            </div>

            {/* Countdown when busy */}
            {isBusy && currentMeeting?.end && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  textAlign: "center",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  zIndex: 2,
                  width: "100%",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 10,
                  }}
                >
                  Termina em
                </div>
                <CountdownTimer endTime={currentMeeting.end} />
              </motion.div>
            )}
          </div>

          {/* Clock */}
          <div style={{ zIndex: 2 }}>
            <ClockDisplay />
          </div>
        </motion.div>

        {/* ────── RIGHT PANEL — Schedule ────── */}
        <motion.div
          animate={{ background: theme.rightBg }}
          transition={{ duration: 0.8 }}
          style={{
            padding: "36px 40px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
              paddingBottom: 20,
              borderBottom: `1px solid ${theme.headerBorder}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CalendarDays size={22} color="#94a3b8" />
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  letterSpacing: "-0.5px",
                }}
              >
                Agenda do Dia
              </h2>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {/* Reserve button — disabled when busy */}
              <motion.button
                whileHover={!isBusy ? { y: -2 } : {}}
                onClick={() => !isBusy && setModalOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 22px",
                  borderRadius: 14,
                  border: isBusy ? "1px solid rgba(239,68,68,0.2)" : "none",
                  background: isBusy
                    ? "rgba(239,68,68,0.15)"
                    : "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: isBusy ? "#fca5a5" : "white",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: isBusy ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  boxShadow: isBusy
                    ? "none"
                    : "0 4px 16px rgba(14,165,233,0.35)",
                  transition: "all 0.4s",
                }}
              >
                <Plus size={16} />
                {isBusy ? "Sala Ocupada" : "Reservar"}
              </motion.button>
            </div>
          </div>

          {/* Current meeting highlight — shown when busy */}
          <AnimatePresence>
            {isBusy && currentMeeting && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                style={{
                  padding: "20px 24px",
                  marginBottom: 20,
                  borderRadius: 16,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#ef4444",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(239,68,68,0.6)",
                    animation: "pulseGlowRed 1.5s infinite",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "#ef4444",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    Reunião em Andamento
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fca5a5" }}>
                    {currentMeeting.title}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Meeting List */}
          <div style={{ flex: 1 }}>
            {meetings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: 16,
                }}
              >
                <ShieldOff size={48} color="#334155" />
                <p style={{ color: "#475569", fontSize: "1.1rem", fontWeight: 500 }}>
                  Agenda livre por hoje
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {meetings.map((m, i) => (
                  <MeetingCard
                    key={m.id}
                    meeting={m}
                    cardStatus={getCardStatus(m)}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
}
