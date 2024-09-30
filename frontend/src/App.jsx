import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./assets/components/Home";
import Login from "./assets/components/Login";
import Signup from "./assets/components/Signup";
import LandingPage from "./assets/components/LandingPage.jsx";
import BookService from "./assets/components/BookService.jsx";
import Dashboard from "./assets/components/Admin/Dashboard.jsx";
import { useAuth } from './assets/context/ContextAPI.jsx'; 

function App() {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <h1>Loading...</h1>; 
  }

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
      </Routes>
    </Router>
  );
}

export default App;
