// Styles
import styles from "./styles";

const MoreInfoCard = () => {
    return (
        <div className={styles.box}>
            <h5 className={styles.title}>What Can You Share?</h5>
            <p className={styles.description}>
                You can share posts of whatever you like. As long as its code
                related. Build an awesome project you want to share with the
                world? Write a post about it. Found a new cool resource? Share
                it. <br /> <br />
                This platform is designed to let you share with the community
                and have fun whilst doing so.
            </p>
        </div>
    );
};

export default MoreInfoCard;
