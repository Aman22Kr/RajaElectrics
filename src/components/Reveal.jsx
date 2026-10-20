import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';

export default function Reveal({ children, index = 0, x = 0, className = '' }) {
  const { m } = useStore();
  if (!m.on) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: m.dist, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: m.dur, delay: Math.min(index, 8) * m.stagger, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
