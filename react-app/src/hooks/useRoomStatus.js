import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, ROOM_COLLECTION } from "../config/firebase";

/**
 * Hook that listens to Firestore for today's meetings
 * and derives the room status (free / busy).
 *
 * Returns:
 *  - meetings: array of today's meetings
 *  - isBusy: boolean
 *  - currentMeeting: the meeting happening right now (or null)
 */
export function useRoomStatus() {
  const [meetings, setMeetings] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  // Listen to Firestore
  useEffect(() => {
    const q = query(collection(db, ROOM_COLLECTION));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const today = new Date();
      const todayStr = today.toDateString();
      const parsed = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const rawStart = data.inicio || data.start;
        const rawEnd = data.fim || data.end;

        if (!rawStart) return;

        const startDate = new Date(rawStart);
        if (startDate.toDateString() !== todayStr) return;

        parsed.push({
          id: doc.id,
          title: data.titulo || data.title || "Sem Título",
          organizer: data.organizer || "Reservado",
          start: startDate,
          end: rawEnd ? new Date(rawEnd) : null,
          rawStart,
          rawEnd,
        });
      });

      // Sort by start time client-side
      parsed.sort((a, b) => a.start - b.start);

      setMeetings(parsed);
    });

    return () => unsubscribe();
  }, []);

  // Check status every second
  useEffect(() => {
    function check() {
      const now = new Date();
      let busy = false;
      let current = null;

      for (const m of meetings) {
        if (m.start && m.end && now >= m.start && now < m.end) {
          busy = true;
          current = m;
          break;
        }
      }

      setIsBusy(busy);
      setCurrentMeeting(current);
    }

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [meetings]);

  return { meetings, isBusy, currentMeeting };
}
