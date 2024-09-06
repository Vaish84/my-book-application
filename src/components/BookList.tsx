import React, { useState, useEffect } from 'react';
import SearchIcon from '../assets/Search.svg'
import BookCard from './BookCard';
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
    }, [category, query]);

    useEffect(() => {
        fetchBooks(true);
    }, [page]);

    const hasCoverImage = (formats: any) => {
        return formats['image/jpeg'] || formats['image/png'];
    };

    const fetchBooks = async (pageChanged: boolean = false) => {
        const response = await fetch(`http://skunkworks.ignitesol.com:8000/books?topic=${category}&search=${query}&page=${page}`);
        const data = await response.json();
        const booksWithCovers = data.results.filter((book: Book) =>
            hasCoverImage(book.formats)
        );
          
        if (pageChanged) {
              
            setBooks((books) => [...books, ...booksWithCovers]);
        } else {
              
            setBooks(booksWithCovers);  // Clear books if no results
        }
    };

    const handleSearchChange = (e: any) => {
        setQuery(e.target.value);
        setBooks([]);
        setPage(1);
    };

    //Function to handle infinite scrolling
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) return;
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
                    className="w-full pl-12 py-2 h-12 bg-[#F0F0F6] border border-gray-300 rounded-md focus:outline-none focus:border-[#5E56E7]"
                    type="search"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Search"
                    value={query}
                    onChange={handleSearchChange} />
            </div>
            <div className='bg-[#f0f0f6]'>
                {books.length ? <ul className="pl-4 grid grid-cols-3 gap-8 sm:grid-cols-6 p-8 md:w-9/12 m-auto ">
                    {books.map((book) => (
                        <li key={book.id} onClick={() => handleBookClick(book)} className="cursor-pointer hover:underlineflex flex-col items-center ">
                            <BookCard card={book} />
                        </li>
                    ))}
                </ul> : <>
                    <p className="p-4 text-center mt-4">
                        No books found. Please try a different search !!!
                    </p>
                </>
                }

            </div>

        </div>
    );
};

export default BookList;
