import React, { useState, useEffect } from 'react';
import "../style/BookCard.css"
interface Book {
    id: number;
    title: string;
    authors: { name: string }[];
    formats: { [key: string]: string };
}

interface BookListProps {
    card: Book;
}

const BookCard: React.FC<BookListProps> = ({ card }) => {
    return (
        <>
            <img src={card.formats['image/jpeg'] || 'fallback-image-url.jpg'}
                alt={`${card.title} cover`}
                className=" Rectangle" />
            <div className='mt-2'>
                <p className=" text-[20px] text-sm font-semibold line-clamp-3">{card.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{card.authors.map((author: any) => author.name).join(', ')}</p>
            </div>

        </>
    );
};

export default BookCard;
