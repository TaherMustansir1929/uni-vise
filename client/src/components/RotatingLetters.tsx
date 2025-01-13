import { motion } from "framer-motion";

const RotatingLetters = ({ text }) => {
    return (
      <div className="">
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            {letter === ' ' ? '\u00A0' : letter} {/* Keeps spaces intact */}
          </motion.span>
        ))}
      </div>
    );
};

export default RotatingLetters;