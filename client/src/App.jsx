import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import QuestionCard from './components/QuestionCard';
import FilterBar from './components/FilterBar';
import Loader from './components/Loader';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const questionsPerPage = 12;

    
    const categoryColors = {
        All: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            border: 'border-blue-500',
            darkBg: 'bg-blue-500'
        },
        MCQ: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-500',
            darkBg: 'bg-yellow-500'
        },
        ANAGRAM: {
            bg: 'bg-purple-100',
            text: 'text-purple-700',
            border: 'border-purple-500',
            darkBg: 'bg-purple-500'
        },
        READ_ALONG: {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            border: 'border-orange-500',
            darkBg: 'bg-orange-500'
        },
        CONTENT_ONLY: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            border: 'border-gray-500',
            darkBg: 'bg-gray-500'
        },
        CONVERSATION: {
            bg: 'bg-teal-100',
            text: 'text-teal-700',
            border: 'border-teal-500',
            darkBg: 'bg-teal-500'
        }
    };

    const currentColors = categoryColors[selectedType] || categoryColors.All;

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions`, {
                params: {
                    page: currentPage,
                    limit: questionsPerPage,
                    type: selectedType === 'All' ? '' : selectedType,
                    search: searchQuery,
                }
            });
            setQuestions(data.questions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        setLoading(false);
    }, [currentPage, selectedType, searchQuery]);

    useEffect(() => {
        fetchQuestions();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        fetchQuestions();
    }, [selectedType, searchQuery]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const filterByType = (type) => {
        setSelectedType(type);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }; return (
        <div className={`p-8 max-w-screen min-h-screen mx-auto ${currentColors.bg} relative`}>
            <h1 className={`text-4xl font-bold text-center ${currentColors.text} mb-6`}>QuestSearch</h1>

            <SearchBox
                onSearch={(query) => handleSearch(query)}
                className={`w-full border-2 rounded-lg p-3 ${currentColors.border} focus:ring-2 focus:ring-opacity-50`}
            />

            <FilterBar
                types={['All', 'MCQ', 'ANAGRAM', 'CONVERSATION', 'READ_ALONG', 'CONTENT_ONLY']}
                selectedType={selectedType}
                onSelectType={filterByType}
            />

            <div className="mt-24">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="mt-4 mb-8">
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <QuestionCard key={index} question={q} index={index + 1} />
                            ))
                        ) : (
                            <p className="text-red-500 mt-4 text-center">No questions found.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Fixed pagination bar */}
            <div className={`fixed m-auto bottom-0 rounded-t-xl left-0 right-0 ${currentColors.darkBg} shadow-md p-2 flex justify-center items-center`}>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-1 rounded-lg border ${currentColors.border} bg-white ${currentColors.text} cursor-pointer hover:scale-105 transition-all mx-2 disabled:opacity-50`}
                >
                    Prev
                </button>
                <span className="text-lg font-semibold mx-4 text-white">{currentPage} / {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-1 rounded-lg border ${currentColors.border} bg-white ${currentColors.text} cursor-pointer hover:scale-105 transition-all mx-2 disabled:opacity-50`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
