// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navbarStyles =
        "w-full flex px-[12.5vw] bg-gradient-to-r from-blue-400 to-indigo-600 h-[7.5vh] items-center relative font-mono";

    const brand = (
        <h2
            className={`text-white font-bold text-xl tracking-widest lowercase ${
                isAuthenticated ? "dark:text-black" : ""
            }`}
        >
            &lt;Code Network &#x2f;&gt;
        </h2>
    );

    return (
        <>
            {isAuthenticated ? (
                <nav className={`${navbarStyles} justify-between`}>{brand}</nav>
            ) : (
                <nav className={`${navbarStyles} justify-center`}>{brand}</nav>
            )}
        </>
    );
};

export default Navbar;
