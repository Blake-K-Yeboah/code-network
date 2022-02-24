// Framer Motion
import { motion } from "framer-motion";

// useState hook
import { useState } from "react";

// Components
import ModalStep from "../ModalStep";

// Styles
import styles from "./styles";

const WelcomeModal = () => {
    const [step, setStep] = useState(1);
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const width = `${(step / 4) * 100}%`;
    const progressBar = (
        <motion.div
            animate={{ width }}
            className={styles.progressBar}
        ></motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.backdrop}
            transition={{
                ease: "easeOut",
                duration: 0.5,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    ease: "easeOut",
                    duration: 1,
                }}
                className={styles.modal}
            >
                {progressBar}
                <ModalStep
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            </motion.div>
        </motion.div>
    );
};

export default WelcomeModal;
