import Login from "./pages/login.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;