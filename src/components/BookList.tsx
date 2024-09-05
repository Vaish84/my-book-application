import React, { useState, useEffect } from 'react';
import SearchIcon from '../assets/Search.svg'
interface Book {
    id: number;
    title: string;
    authors: { name: string }[];
    formats: { [key: string]: string };
}

interface BookListProps {
    category: string;
}

const BookList: React.FC<BookListProps> = ({ category }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetchBooks();
    }, [category, query, page]);

    const fetchBooks = async () => {
        debugger
        const response = await fetch(`http://skunkworks.ignitesol.com:8000/books?topic=${category}&search=${query}&page=${page}`);
        const data = await response.json();
        debugger
        setBooks([...data.results]);
    };

    const handleSearchChange = (e: any) => {
        debugger
        setQuery(e.target.value);
        setBooks([]);
        setPage(1);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBookClick = (book: Book) => {
        const url = book.formats['text/html'] || book.formats['application/pdf'] || book.formats['text/plain'];
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('No viewable version available');
        }
    };

    return (
        <div className=" bg-white">
            <div id="inputWrapper" className="relative flex items-center my-7 md:w-9/12 m-auto px-2">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 text-gray-500 absolute left-4" />
                <input
                    id="input"
                    className="w-full pl-12 py-2 bg-[#F0F0F6] border border-gray-300 rounded-md focus:outline-none focus:border-[#5E56E7]"
                    type="search"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Search"
                    value={query}
                    onChange={handleSearchChange} />
            </div>
            <div className='bg-[#f0f0f6]'>
                <ul className="pl-4 grid grid-cols-3 gap-8 sm:grid-cols-6 p-8 md:w-9/12 m-auto ">

                    {books.map((book) => (
                        <li key={book.id} onClick={() => handleBookClick(book)} className="cursor-pointer hover:underlineflex flex-col items-center ">
                            <img src={book.formats['image/jpeg'] || 'fallback-image-url.jpg'}
                                alt={`${book.title} cover`}
                                className="rounded-lg shadow-lg" />
                            <div className='mt-2'>
                                <p className=" text-[20px] text-sm font-semibold line-clamp-3">{book.title}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{book.authors.map((author) => author.name).join(', ')}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
};

export default BookList;
