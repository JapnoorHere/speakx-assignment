const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="relative w-full h-2 bg-gray-300 overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-black animate-[loading_1.5s_infinite] shadow-lg shadow-black"></div>
            </div>
            <style>
                {`
                    @keyframes loading {
                        0% { left: -30%; }
                        50% { left: 50%; width: 40%; }
                        100% { left: 100%; width: 20%; }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;
