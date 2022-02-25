// Styles
import styles from "./styles";

// Link
import { Link } from "react-router-dom";

const CopyrightCard = () => {
    return (
        <div className={styles.box}>
            <p className={styles.textGroup}>
                <Link to="/" className={styles.link}>
                    Home
                </Link>
                <span className={styles.divider}>|</span>
                <Link to="/posts" className={styles.link}>
                    Posts
                </Link>
                <span className={styles.divider}>|</span>
                <a
                    rel="noreferrer"
                    href="https://github.com/Blake-K-Yeboah/code-network"
                    className={styles.link}
                    target="_blank"
                >
                    Contribute
                </a>
            </p>
            <h6 className={styles.logo}>&lt;code network /&gt;</h6>
            <p className={styles.copyrightText}>
                &copy; Copyright 2022. All Rights Reserved.
            </p>
        </div>
    );
};

export default CopyrightCard;
