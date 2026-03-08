import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Heart = ({ style }) => (
  <motion.div
    style={{ position: "absolute", pointerEvents: "none", userSelect: "none", ...style }}
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [-20, -140],
      scale: [0, 1.2, 0.9, 0],
      x: [0, (Math.random() - 0.5) * 70],
    }}
    transition={{ duration: 2.5 + Math.random(), ease: "easeOut" }}
  >
    ❤️
  </motion.div>
);

const Petal = ({ id, onDone }) => {
  const left = useRef(Math.random() * 100).current;
  const delay = useRef(Math.random() * 2).current;
  const duration = useRef(5 + Math.random() * 4).current;
  const size = useRef(14 + Math.random() * 14).current;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: `${left}%`,
        fontSize: size,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0], rotate: 360 }}
      transition={{ duration, delay, ease: "linear" }}
      onAnimationComplete={onDone}
    />
  );
};

export default function App() {
  const [phase, setPhase] = useState("question");
  const [noPos, setNoPos] = useState({ top: "62%", left: "62%" });
  const [hearts, setHearts] = useState([]);
  const [petals, setPetals] = useState([]);
  const [noCount, setNoCount] = useState(0);
  const containerRef = useRef(null);
  const idRef = useRef(0);

  // Generate petals continuously
  useEffect(() => {
    if (phase !== "question") return;
    const add = () =>
      setPetals((p) => [...p.slice(-14), { id: idRef.current++, emoji: Math.random() > 0.5 ? "🌸" : "🌷" }]);
    add();
    const iv = setInterval(add, 700);
    return () => clearInterval(iv);
  }, [phase]);

  // Burst hearts on success
  useEffect(() => {
    if (phase !== "success") return;
    const burst = () => {
      const batch = Array.from({ length: 14 }, () => ({
        id: idRef.current++,
        style: {
          left: `${15 + Math.random() * 70}%`,
          bottom: `${5 + Math.random() * 35}%`,
          fontSize: `${18 + Math.random() * 22}px`,
          zIndex: 50,
        },
      }));
      setHearts((h) => [...h, ...batch]);
      setTimeout(() => setHearts((h) => h.slice(batch.length)), 3200);
    };
    burst();
    const iv = setInterval(burst, 1600);
    return () => clearInterval(iv);
  }, [phase]);

  const flee = () => {
    let newTop, newLeft;
    do {
      newTop = 8 + Math.random() * 78;
      newLeft = 5 + Math.random() * 80;
    } while (
      Math.abs(newTop - parseFloat(noPos.top)) < 12 &&
      Math.abs(newLeft - parseFloat(noPos.left)) < 12
    );
    setNoPos({ top: `${newTop}%`, left: `${newLeft}%` });
    setNoCount((c) => c + 1);
  };

  const noLabels = [
    "Não 🙄",
    "Tenta de novo 😏",
    "Claro que não!",
    "Nem pense! 🏃",
    "Nunca! 😂",
    "Impossível!",
    "Tá louco(a)?",
    "Para de tentar!",
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 30% 15%, #ffe4ec 0%, #ffc2d4 35%, #ffb7c5 65%, #ff8fab 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.45,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow blobs */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 520, height: 520, borderRadius: "50%", background: "rgba(255,183,197,0.3)", filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 420, height: 420, borderRadius: "50%", background: "rgba(255,143,171,0.22)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{ position: "absolute", top: 0, left: `${Math.random() * 100}%`, fontSize: 16 + Math.random() * 14, pointerEvents: "none", userSelect: "none", zIndex: 0 }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0], rotate: 360 }}
          transition={{ duration: 5 + Math.random() * 4, delay: Math.random() * 1.5, ease: "linear" }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Hearts burst */}
      {hearts.map((h) => (
        <Heart key={h.id} style={h.style} />
      ))}

      {/* ===== QUESTION PHASE ===== */}
      <AnimatePresence mode="wait">
        {phase === "question" && (
          <motion.div
            key="question"
            style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, padding: "0 24px", textAlign: "center" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "clamp(60px, 14vw, 96px)", lineHeight: 1 }}
            >
              💕
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: "clamp(2rem, 7vw, 4rem)",
                  color: "#8b1a4a",
                  fontWeight: "bold",
                  textShadow: "2px 2px 14px rgba(255,143,171,0.55)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Você me ama?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ color: "#c0427a", marginTop: 10, fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)" }}
              >
                Pense bem antes de responder... 🌸
              </motion.p>
            </div>

            {/* SIM */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase("success")}
              style={{
                background: "linear-gradient(135deg, #ff6b9d, #c9184a)",
                color: "white",
                border: "none",
                borderRadius: 50,
                padding: "16px 52px",
                fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(201,24,74,0.38)",
                letterSpacing: "0.04em",
                fontFamily: "inherit",
              }}
            >
              💖 Sim, claro!
            </motion.button>

            {noCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: "#c0427a", fontSize: "clamp(0.7rem, 2vw, 0.85rem)", opacity: 0.7, fontStyle: "italic" }}
              >
                {noCount < 3 ? "Esse botão não quer ser clicado... 😅" : noCount < 6 ? "Desista! O 'Sim' é o único caminho 💕" : "Você é teimoso(a) hein! 😂❤️"}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ===== SUCCESS PHASE ===== */}
        {phase === "success" && (
          <motion.div
            key="success"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              padding: "0 24px",
              textAlign: "center",
              maxWidth: 480,
              margin: "0 auto",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 0] }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontSize: "clamp(56px, 13vw, 90px)", lineHeight: 1 }}
            >
              ❤️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                fontSize: "clamp(1.6rem, 5.5vw, 2.6rem)",
                color: "#8b1a4a",
                fontWeight: "bold",
                textShadow: "1px 1px 12px rgba(255,143,171,0.65)",
                lineHeight: 1.2,
              }}
            >
              Eu sabia! 🥰
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                background: "rgba(255,255,255,0.52)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderRadius: 24,
                padding: "clamp(20px, 5vw, 34px)",
                border: "1.5px solid rgba(255,143,171,0.38)",
                boxShadow: "0 8px 42px rgba(201,24,74,0.13)",
              }}
            >
              <p style={{ color: "#6b1535", fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)", lineHeight: 1.8, fontStyle: "italic" }}>
                Eu também te amo muito! Você é o amor da minha vida. Obrigado por
                sempre estar comigo nos momentos tristes e felizes.
              </p>
              <p style={{ color: "#c9184a", fontSize: "clamp(1rem, 3vw, 1.3rem)", marginTop: 18, fontWeight: "bold" }}>
                Te amo muito xuxubah! ❤️❤️
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", letterSpacing: 6 }}
            >
              💕🌸💕🌸💕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NÃO button - escapes on hover/touch */}
      {phase === "question" && (
        <motion.button
          animate={{ top: noPos.top, left: noPos.left }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          onMouseEnter={flee}
          onTouchStart={(e) => { e.preventDefault(); flee(); }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.48)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#c9184a",
            border: "1.5px solid rgba(201,24,74,0.28)",
            borderRadius: 50,
            padding: "12px 30px",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            cursor: "pointer",
            fontWeight: "600",
            zIndex: 20,
            fontFamily: "inherit",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(201,24,74,0.12)",
          }}
        >
          {noLabels[Math.min(noCount, noLabels.length - 1)]}
        </motion.button>
      )}
    </div>
  );
}
