import { motion } from "framer-motion";

const stars = Array.from(
  { length: 80 },
  (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 5 + 3,
  })
);

export default function Stars() {
  return (
    <div className="stars-container">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}