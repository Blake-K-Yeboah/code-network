const styles = {
    navbar: "w-full flex bg-gradient-to-r from-blue-400 to-indigo-600 h-[7.5vh] min-h-[72px] items-center relative font-mono px-0 md:px-[8.75vw]",
    brand: "text-white font-bold text-xl tracking-widest lowercase",
    authBrand: "dark:text-black hidden md:block",
    navLinksContainer: "flex items-center w-full md:w-[initial]",
    navLink:
        "flex items-center justify-center px-3 pt-5 pb-3 flex-col lowercase transition ease-in-out duration-333 cursor-pointer hover:bg-[rgba(255,255,255,.125)] hover:text-gray-100 hover:border-t-2 dark:hover:text-black dark:border-black w-1/5 md:w-[initial]",
    activeLink: "text-white dark:text-gray-900 border-t-2 dark:border-gray-900",
    notActiveLink: "text-gray-300",
    dropdownContainer: "hidden lg:block",
    mobileLink: "lg:hidden",
};

export default styles;
