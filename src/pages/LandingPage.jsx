// useEffect Hook
import { useEffect } from "react";

// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingPageTextSection from "../components/LandingPageTextSection";
import LandingPageBoxes from "../components/LandingPageBoxes";

const LandingPage = () => {
    useEffect(() => {
        // Automatic dark mode on landing page
        document.querySelector("body").classList.add("dark", "bg-gray-900");
    }, []);

    const textSections = [
        {
            heading: "Simple, Social And Fun",
            paragraph:
                "The platform allows you to socialize with other developers, share your awesome resources with the community and play tech trivia for fun.",
        },
        {
            heading: "Why Should You Join",
            paragraph:
                "Our platform has various features that allows you to have a fun time whilst building connections and socializing with other developers",
        },
        {
            heading: "Help Us Grow",
            paragraph:
                "We're an open-source platform so if you've got a cool idea, feel free to check out the github repository and make some changes",
        },
        {
            heading: "Join the Platform Today",
            paragraph:
                "Hit the button below to start creating your account and join this awesome platform",
        },
    ];

    const contributeBtn = {
        link: {
            external: true,
            text: "https://github.com/Blake-K-Yeboah/code-network",
        },
        content: "Contribute",
    };

    const createAnAccountBtn = {
        link: {
            external: false,
            text: "/register",
        },
        content: "Create an account",
    };

    return (
        <>
            <Helmet>
                <title>Code Network - Home</title>
            </Helmet>
            <Navbar />
            <Header />
            <LandingPageTextSection text={textSections[0]}>
                <img
                    className="w-[50%] mx-auto mt-8 mb-16 rounded-xl shadow-xl"
                    src="/img/screenshot.jpg"
                    alt="Screenshot of platform"
                />
            </LandingPageTextSection>
            <LandingPageTextSection text={textSections[1]}>
                <LandingPageBoxes />
            </LandingPageTextSection>
            <LandingPageTextSection
                text={textSections[2]}
                button={contributeBtn}
            >
                <img
                    className="w-[50%] mx-auto mt-16 mb-12 rounded-xl shadow-xl"
                    src="/img/code-img.jpg"
                    alt="Code on a screen"
                />
            </LandingPageTextSection>
            <LandingPageTextSection
                text={textSections[3]}
                button={createAnAccountBtn}
            />
            <Footer />
        </>
    );
};

export default LandingPage;
