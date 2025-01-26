const FilterBar = ({ types, selectedType, onSelectType }) => {
    const categoryColors = {
        All: 'bg-blue-600 text-white hover:bg-blue-700',
        MCQ: 'bg-yellow-500 text-white hover:bg-yellow-600',
        ANAGRAM: 'bg-purple-500 text-white hover:bg-purple-600',
        READ_ALONG: 'bg-orange-500 text-white hover:bg-orange-600',
        CONTENT_ONLY: 'bg-gray-500 text-white hover:bg-gray-600',
        CONVERSATION: 'bg-teal-500 text-white hover:bg-teal-600'
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 my-4">
            {types.map((type, index) => (
                <button
                    key={index}
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all cursor-pointer ${
                        selectedType === type
                            ? `${categoryColors[type]} shadow-lg`
                            : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                    onClick={() => onSelectType(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
