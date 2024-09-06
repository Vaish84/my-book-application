import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookList from '../components/BookList';
import BackIcon from '../assets/Back.svg';

const BookPage: React.FC = () => {
    const navigate = useNavigate();

    const { category } = useParams<{ category: string }>();
    return (
        <div className=" bg-white min-h-screen font-myfont">
            <div className="flex items-center md:w-9/12 m-auto px-2 pt-4" onClick={() => { navigate(`/`); }}>
                <img
                    src={BackIcon}
                    alt="Search Icon"
                    className="w-5 h-5 mr-2  flex items-center"
                />
                <h1 className="text-3xl font-bold text-[#5E56E7]">{category}</h1>
            </div>
            <BookList category={category!} />
        </div>
    );
};

export default BookPage;
