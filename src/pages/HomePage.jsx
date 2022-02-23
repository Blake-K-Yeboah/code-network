// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";

const LandingPage = () => {
    return (
        <>
            <Helmet>
                <title>Code Network - Home</title>
            </Helmet>
            <Navbar />
        </>
    );
};

export default LandingPage;
