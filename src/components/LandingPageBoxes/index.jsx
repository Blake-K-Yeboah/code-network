// Styles
import styles from "./styles";

// Prop Types
import PropTypes from "prop-types";

// Icons
import { FaShareAlt, FaUsers, FaPlay } from "react-icons/fa";

const Box = ({ details }) => {
    return (
        <div className={styles.box}>
            <div className={styles.iconBox}>{details.icon}</div>
            <h6 className={styles.title}>{details.title}</h6>
            <p className={styles.description}>{details.desc}</p>
        </div>
    );
};

// Box Prop Types
Box.propTypes = {
    details: PropTypes.object,
};

const LandingPageBoxes = () => {
    const boxDetails = [
        {
            icon: <FaShareAlt className={styles.icon} />,
            title: "Share Posts",
            desc: "Share posts with the community and interact with other user's posts",
        },
        {
            icon: <FaUsers className={styles.icon} />,
            title: "Experience Community",
            desc: "Be a part of an awesome community of developers just like you who love coding",
        },
        {
            icon: <FaPlay className={styles.icon} />,
            title: "Play Tech Trivia",
            desc: "A fun trivia games with various questions about tech so you have fun whilst learning",
        },
    ];

    return (
        <div className={styles.container}>
            {boxDetails.map((detail) => {
                return <Box details={detail} key={detail.title} />;
            })}
        </div>
    );
};

export default LandingPageBoxes;
