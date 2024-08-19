import AddAcc from "./pages/admin/add_acc.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddAcc />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;