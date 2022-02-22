import React, { useEffect } from "react";

// Prop Types
import PropTypes from "prop-types";

// Styles
import styles from "./styles";

// Link Component
import { Link } from "react-router-dom";

// Animation Imports
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LandingPageTextSection = ({ text, button, children }) => {
    const animationVariants = {
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" },
        },
        hidden: { opacity: 0, y: 150, scale: 0.85 },
    };

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            animate={controls}
            variants={animationVariants}
            initial="hidden"
            className={styles.section}
        >
            <h3 className={styles.h3}>{text.heading}</h3>
            <p className={styles.paragraph}>{text.paragraph}</p>
            {button && (
                <>
                    {button.link.external ? (
                        <>
                            <a
                                href={button.link.text}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <div className={styles.btnContainer}>
                                    <button className={styles.primaryBtn}>
                                        {button.content}
                                    </button>
                                </div>
                            </a>
                        </>
                    ) : (
                        <Link to={button.link.text}>
                            <div className={styles.btnContainer}>
                                <button className={styles.primaryBtn}>
                                    {button.content}
                                </button>
                            </div>
                        </Link>
                    )}
                </>
            )}
            {children}
        </motion.section>
    );
};

// Prop Types
LandingPageTextSection.propTypes = {
    text: PropTypes.object,
    button: PropTypes.object,
};

export default LandingPageTextSection;
