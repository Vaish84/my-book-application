import React from 'react';
import { useNavigate } from 'react-router-dom';
import Next from '../assets/Next.svg';
import "../style/BookCard.css"

const categories = [
  {
    id: 1,
    name: "FICTION",
    icon: "/assets/Fiction.svg",
  },
  {
    id: 2,
    name: "PHILOSOPHY",
    icon: "/assets/Philosophy.svg",
  },
  {
    id: 3,
    name: "DRAMA",
    icon: "/assets/Drama.svg",
  },
  {
    id: 4,
    name: "HISTORY",
    icon: "/assets/History.svg",
  },
  {
    id: 4,
    name: "HUMOUR",
    icon: "/assets/Humour.svg",
  },
  {
    id: 4,
    name: "ADVENTURE",
    icon: "/assets/Adventure.svg",
  }, {
    id: 4,
    name: "POLITICS",
    icon: "/assets/Politics.svg",
  },
];


const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    navigate(`/books/${formattedCategory}`);
  };

  return (
    <div >
      <div className="pattern-background " >
        <div className=' md:w-9/12 m-auto  py-6 flex flex-col px-8'>
          <h1 className="text-[48px] font-bold mt-6 text-[#5E56E7] ">Gutenberg Project</h1>
          <p className="text-xl">
            A social cataloging website that allows you to freely search its database of books, annotations,
            and reviews.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-24 gap-y-4 p-4 md:w-9/12 m-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="w-full flex justify-between items-center px-2 h-12 my-1 bg-white rounded-md shadow-md hover:bg-gray-200"
          >
            <div className="flex items-center">
              <img src={category.icon} alt={category.name} className="w-6 h-6 mr-4" />
              <span className="text-lg font-semibold">{category.name}</span>
            </div>
            <span className="text-gray-500 text-lg">
              <img src={Next} alt="Next" className="w-6 h-6 mr-4" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
