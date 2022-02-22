// Styles
import styles from "./styles.js";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.p}>
                Built with ❤️ by{" "}
                <a href="https://www.blakeyeboah.com/" className={styles.link}>
                    Blake Yeboah
                </a>
            </p>
            <p className={`${styles.p} mt-8`}>
                &copy; 2022 Code Network. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
