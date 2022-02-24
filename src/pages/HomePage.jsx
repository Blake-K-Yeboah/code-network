// Helmet
import { Helmet } from "react-helmet";

// Redux hooks
import { useSelector } from "react-redux";

// Components
import Navbar from "../components/Navbar";
import WelcomeModal from "../components/WelcomeModal";

const HomePage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <Helmet>
                <title>Code Network - Home</title>
            </Helmet>
            <Navbar />
            {user.isNewAccount && <WelcomeModal />}
        </>
    );
};

export default HomePage;
