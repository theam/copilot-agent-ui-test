import { Routes, Route } from 'react-router';
import UsersPage from './pages/UsersPage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;
