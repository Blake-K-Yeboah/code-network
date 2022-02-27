const styles = {
    container: "flex flex-col items-center justify-center h-[calc(100%-8px)]",
    title: "text-4xl font-black text-gray-700 capitalize text-center w-[80%]",
    textGradient:
        "bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent",
    paragraph:
        "text-gray-500 text-md w-[75%] mx-auto mt-8 mb-10 text-center leading-[1.6em]",
    btn: "py-5 px-8 bg-gradient-to-r rounded-lg text-white font-medium ",
    btnPrimary: "from-blue-400 to-indigo-600",
    btnSecondary: "from-slate-500 to-slate-700 mb-8 sm:mb-0 sm:mr-8",
    input: "w-[75%] mx-auto mb-8 h-14 px-3 bg-gray-200 focus:bg-gray-300 text-gray-900 focus:outline-none focus:border-b-2 focus:border-blue-500 rounded-lg",
    btnGroup: "flex flex-col sm:flex-row items-center justify-center",
    profilePicGrid:
        "grid grid-cols-2 sm:grid-cols-4 gap-4 w-[90%] md:w-[60%] mx-auto mb-8 h-64 sm:h-24",
    gridBox:
        "bg-gray-200 flex flex-col items-center justify-center w-full h-full transition duration-333 hover:bg-blue-200 cursor-pointer rounded-lg py-8 sm:py-0",
    activeBox: "bg-gradient-to-r from-blue-400 to-indigo-600",
    profilePic: "min-w-[50px] w-[25%] sm:w-[50%] rounded-full",
    darkModeGrid:
        "grid grid-cols-1 sm:grid-cols-2 gap-4 w-[90%] md:w-[30%] mx-auto mb-8 h-72 sm:h-24",
    circle: "w-8 h-8 rounded-full mb-2",
};

export default styles;
