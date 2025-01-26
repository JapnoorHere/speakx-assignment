const Loader = () => {
    return (
        <div className="fixed flex   flex-col  inset-0 z-50  justify-center items-center bg-black/50 backdrop-blur-sm ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
            <h1 className="text-white text-xl">Please wait...</h1>
        </div>
    );
};

export default Loader;
