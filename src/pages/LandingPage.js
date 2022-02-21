// useEffect Hook
import { useEffect } from "react";

// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";

const LandingPage = () => {
    useEffect(() => {
        document.querySelector("body").classList.add("dark");
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - The social network for developers</title>
            </Helmet>
            <Navbar />
            <header className="flex justify-center items-center flex-col h-[92.5vh] relative bg-slate-900">
                <h2 className="text-6xl font-black text-gray-50 text-center capitalize leading-[1.3em] relative -top-6">
                    Welcome to a new
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                        digital world
                    </span>
                </h2>
                <p className="text-xl text-slate-400 w-[35%] mx-auto mt-8 mb-12 text-center leading-loose relative -top-6">
                    Code Network is an open-source social platform that allows
                    you to meet other developers with similar interests, play
                    tech trivia and share resources with the awesome tech
                    community.
                </p>
                <div className="flex items-center justify-center relative -top-6">
                    <button
                        onClick={() => console.log("hi")}
                        className="bg-gradient-to-r from-blue-400 to-indigo-600 py-5 px-8 rounded-lg text-white font-medium transition ease-in-out duration-500 hover:opacity-50"
                    >
                        Create an account
                    </button>
                    <button
                        onClick={() => console.log("hi")}
                        className="py-5 px-8 bg-gradient-to-r from-slate-500 to-slate-700 rounded-lg text-white font-medium ml-8 transition ease-in-out duration-500 hover:opacity-50"
                    >
                        Login
                    </button>
                </div>
            </header>
        </>
    );
};

export default LandingPage;
