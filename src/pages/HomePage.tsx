import React from 'react';
import CategoryList from '../components/CategoryList';

const HomePage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 font-myfont">
      <CategoryList />
    </div>
  );
};

export default HomePage;
