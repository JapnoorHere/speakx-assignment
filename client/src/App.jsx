import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import QuestionCard from './components/QuestionCard';
import FilterBar from './components/FilterBar';
import Loader from './components/Loader';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 12;

    const questionTypes = ['All', 'MCQ', 'ANAGRAM', 'CONVERSATION', 'READ_ALONG', 'CONTENT_ONLY'];

    const categoryColors = {
        All: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            border: 'border-blue-500'
        },
        MCQ: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-500'
        },
        ANAGRAM: {
            bg: 'bg-purple-100',
            text: 'text-purple-700',
            border: 'border-purple-500'
        },
        READ_ALONG: {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            border: 'border-orange-500'
        },
        CONTENT_ONLY: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            border: 'border-gray-500'
        },
        CONVERSATION: {
            bg: 'bg-teal-100',
            text: 'text-teal-700',
            border: 'border-teal-500'
        }
    };

    const currentColors = categoryColors[selectedType] || categoryColors.All;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions`);
            setQuestions(data);
            setFilteredQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        setLoading(false);
    };

    const handleSearch = useCallback((query) => {
        const filtered = questions.filter(q =>
            q.title.toLowerCase().includes(query.toLowerCase()) &&
            (selectedType === 'All' || q.type === selectedType)
        );
        setFilteredQuestions(filtered);
        setCurrentPage(1);
    }, [questions, selectedType]);

    const filterByType = (type) => {
        setSelectedType(type);
        setCurrentPage(1);
        if (type === 'All') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(q => q.type === type));
        }
    };

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredQuestions.length / questionsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={`p-8 max-w-screen min-h-screen mx-auto ${currentColors.bg}`}>
            <h1 className={`text-4xl font-bold text-center ${currentColors.text} mb-6`}>QuestSearch</h1>

            <SearchBox 
                onSearch={{handleSearch}} 
                className={`w-full border-2 rounded-lg p-3 ${currentColors.border} focus:ring-2 focus:ring-opacity-50`}
            />

            <FilterBar 
                types={questionTypes} 
                selectedType={selectedType} 
                onSelectType={filterByType} 
            />

            <div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="mt-4">
                        {currentQuestions.length > 0 ? (
                            currentQuestions.map((q, index) => (
                                <QuestionCard key={index} question={q} index={index + 1 + indexOfFirstQuestion} />
                            ))
                        ) : (
                            <p className="text-red-500 mt-4 text-center">No questions found.</p>
                        )}

                        {filteredQuestions.length > 0 && (
                            <div className="flex justify-center mt-6 space-x-4 items-center">
                                <button 
                                    onClick={prevPage} 
                                    className={`px-4 py-2 rounded-lg border ${currentColors.border} bg-white ${currentColors.text} cursor-pointer transition-all hover:scale-110`}
                                >
                                    Prev
                                </button>
                                <span className="text-lg">{currentPage}/{Math.ceil(filteredQuestions.length / questionsPerPage)}</span>
                                <button 
                                    onClick={nextPage} 
                                    className={`px-4 py-2 rounded-lg border ${currentColors.border} bg-white ${currentColors.text} cursor-pointer transition-all hover:scale-110`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
