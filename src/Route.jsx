import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/user/dashboard.jsx";
import Question from "./pages/user/question.jsx";
import Result from "./pages/user/result.jsx";
import AddAcc from "./pages/admin/add_acc.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/AddAcc" element={<AddAcc />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quest" element={<Question />} />
            <Route path="/result" element={<Result />} />
            {/* other routes */}
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={1700}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover={false}
            draggable
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
