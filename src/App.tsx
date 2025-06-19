import { Routes, Route } from 'react-router';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
    </Routes>
  );
}

export default App;
