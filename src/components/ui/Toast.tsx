"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FiCheck } from "react-icons/fi";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
        >
          <FiCheck className="w-4 h-4" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
