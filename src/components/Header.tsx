import React from 'react';

const Header: React.FC = () => {
  return (
    <header 
      className="h-[150px] bg-[#eee] border-b border-black flex items-center px-4"
      data-testid="app-header"
    >
      <img 
        src="/user-group-296.svg" 
        alt="Logo" 
        className="h-12 w-12 mr-3"
        data-testid="header-logo"
      />
      <h1 
        className="text-lg font-semibold text-slate-800 m-0"
        data-testid="header-title"
      >
        Welcome to the best user's App
      </h1>
    </header>
  );
};

export default Header;