// Styles
import styles from "./styles";

// Icons
import { AiOutlineBulb } from "react-icons/ai";

// Link Component
import { Link } from "react-router-dom";

const TriviaPreview = () => {
    return (
        <div className={styles.box}>
            <h5 className={styles.title}>Tech Trivia</h5>
            <p className={styles.description}>
                Tech trivia is a fun game you can play on this platform where
                you are tasked with answering as many questions correct as
                possible about all things technology related.
            </p>
            <Link to="/trivia" className={styles.link}>
                Play Now <AiOutlineBulb className={styles.icon} />
            </Link>
        </div>
    );
};

export default TriviaPreview;
