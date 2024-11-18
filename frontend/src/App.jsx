import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./assets/components/Home";
import Login from "./assets/components/Login";
import Signup from "./assets/components/Signup";
import LandingPage from "./assets/components/LandingPage.jsx";
import BookService from "./assets/components/BookService.jsx";
import Dashboard from "./assets/components/Admin/Dashboard.jsx";
import { useAuth } from './assets/context/ContextAPI.jsx'; 
import ErrorPage from "./assets/components/ErrorPage.jsx";

function App() {
  const { user} = useAuth(); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/bookservice/:title" element={<BookService />} />


        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            user?.isAdmin ? <Dashboard /> : <Navigate to="/" replace /> 
          }
        />

          <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
