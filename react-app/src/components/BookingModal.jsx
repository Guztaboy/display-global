import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db, ROOM_COLLECTION } from "../config/firebase";
import { X, Clock, Check } from "lucide-react";

/**
 * BookingModal — Modal for creating a quick reservation.
 * @param {boolean} isOpen
 * @param {function} onClose
 */
export default function BookingModal({ isOpen, onClose }) {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const durations = [
    { mins: 15, label: "15 min" },
    { mins: 30, label: "30 min" },
    { mins: 60, label: "1 hora" },
  ];

  async function handleConfirm() {
    setIsSubmitting(true);
    const now = new Date();
    const end = new Date(now.getTime() + selectedDuration * 60000);
    const finalTitle = title.trim() === "" ? "Reserva Local" : title;

    try {
      await addDoc(collection(db, ROOM_COLLECTION), {
        titulo: finalTitle,
        inicio: now.toISOString(),
        fim: end.toISOString(),
        organizer: "Agendamento Local",
        criadoEm: new Date().toISOString(),
      });
      setTitle("");
      setSelectedDuration(30);
      onClose();
    } catch (error) {
      console.error("Erro ao reservar:", error);
      alert("Erro ao realizar reserva.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 28,
              padding: "40px",
              width: "min(480px, 90vw)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#f8fafc",
                  letterSpacing: "-0.5px",
                }}
              >
                Nova Reserva
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "0.9rem",
                marginBottom: 28,
              }}
            >
              Selecione a duração da reunião
            </p>

            {/* Duration buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {durations.map((d) => (
                <button
                  key={d.mins}
                  onClick={() => setSelectedDuration(d.mins)}
                  style={{
                    padding: "16px",
                    borderRadius: 16,
                    border:
                      selectedDuration === d.mins
                        ? "2px solid #0ea5e9"
                        : "2px solid rgba(255,255,255,0.08)",
                    background:
                      selectedDuration === d.mins
                        ? "rgba(14,165,233,0.1)"
                        : "rgba(255,255,255,0.03)",
                    color:
                      selectedDuration === d.mins ? "#7dd3fc" : "#94a3b8",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: "inherit",
                  }}
                >
                  <Clock size={16} />
                  {d.label}
                </button>
              ))}
            </div>

            {/* Title input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da Reunião (Opcional)"
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 14,
                border: "2px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
                fontFamily: "inherit",
                marginBottom: 28,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(14,165,233,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 14,
                  border: "none",
                  background: isSubmitting
                    ? "#475569"
                    : "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 4px 20px rgba(14,165,233,0.35)",
                }}
              >
                <Check size={18} />
                {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
