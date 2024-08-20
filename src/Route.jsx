
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/user/dashboard.jsx";
import Question from "./pages/user/question.jsx";
import Result from "./pages/user/result.jsx";
import AddAcc from "./pages/admin/add_acc.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddAcc" element={<AddAcc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quest" element={<Question />} />
        <Route path="/result" element={<Result />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
