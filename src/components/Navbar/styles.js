const styles = {
    navbar: "w-full flex px-[8.75vw] bg-gradient-to-r from-blue-400 to-indigo-600 h-[7.5vh] min-h-[72px] items-center relative font-mono",
    brand: "text-white font-bold text-xl tracking-widest lowercase",
    navLinksContainer: "flex items-center ml-[8.5vw]",
    navLink:
        "flex items-center justify-center px-3 pt-5 pb-3 flex-col text-md lowercase transition ease-in-out duration-333 cursor-pointer hover:bg-[rgba(255,255,255,.125)] hover:text-gray-100 hover:border-t-2 dark:hover:text-black dark:border-black",
    activeLink: "text-white dark:text-gray-900 border-t-2 dark:border-gray-900",
    notActiveLink: "text-gray-300",
};

export default styles;
