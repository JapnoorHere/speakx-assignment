const QuestionCard = ({ question, index }) => {
    const blocks = Array.isArray(question.blocks) ? question.blocks : [];

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const shuffledBlocks = shuffleArray([...blocks]);

    const categoryColors = {
        ALL: 'blue-500',
        MCQ: 'yellow-500',
        ANAGRAM: 'purple-500',
        READ_ALONG: 'orange-500',
        CONTENT_ONLY: 'gray-500',
        CONVERSATION: 'teal-500'
    };

    const borderColor = `border-${categoryColors[question.type] || 'border-blue-500'}`;
    const textColor = `text-${categoryColors[question.type] || 'text-blue-500'}`;

    return (
        <div className={`p-6 bg-white shadow-md rounded-lg border-l-4 ${borderColor} mb-4 flex flex-col md:flex-row items-start md:items-center`}>
            <span className="text-2xl mr-4 font-bold">{index}.</span>
            <div className="w-full">    
                <h3 className="font-bold text-xl">{question.title}</h3>
                <p className={`font-semibold mb-4`}>Type: {question.type}</p>

                {question.type === "MCQ" && question.options && Array.isArray(question.options) ? (
                    <div className="mt-3">
                        {question.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`w-full text-left border px-6 py-3 rounded-lg mb-2 text-lg font-medium transition-all duration-200 ${
                                    option.isCorrectAnswer
                                        ? 'bg-yellow-100 border-yellow-400 text-yellow-700 hover:bg-yellow-200'
                                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-400'
                                }`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                ) : question.type === "ANAGRAM" && blocks.length > 0 ? (
                    <div className="mt-3 bg-gray-100 p-4 rounded-lg">
                        <div className="text-center font-mono text-xl font-semibold mb-3">Arrange the sentence:</div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {shuffledBlocks.map((block, idx) => (
                                block.showInOption && (
                                    <div
                                        key={idx}
                                        className="px-4 py-2 bg-purple-100 rounded-lg text-lg font-medium shadow cursor-pointer hover:bg-purple-200 transition-all"
                                    >
                                        {block.text}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-purple-100 text-purple-700 font-bold text-lg rounded-lg text-center">
                            {blocks.filter(block => block.isAnswer).map((block, idx) => (
                                <span key={idx}>{block.text} </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-2">No options available</p>
                )}
            </div>
        </div>
    );
};

export default QuestionCard;
