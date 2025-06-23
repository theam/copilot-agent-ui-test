import React from 'react';

const Header: React.FC = () => {
  return (
    <header 
      className="h-[35px] bg-[#eee] border-b border-black flex items-center px-4"
      data-testid="app-header"
    >
      <img 
        src="/vite.svg" 
        alt="Logo" 
        className="h-6 w-6 mr-3"
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