import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home'; 
import CreatePost from './pages/CreatePost'; 
import Post from './pages/Post'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import { AuthContext } from './helpers/AuthContext';
import {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [AuthState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {headers: {
        accessToken: localStorage.getItem("accessToken"), },
      })
        .then((response) => {
          if(response.data.error){
            setAuthState(false)
          }
          else{
            setAuthState(true);
          }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{AuthState, setAuthState}}>
        <Router>
          <div className="navbar">
            <Link to="/createpost">Create a post</Link>
            <Link to="/">Home Page</Link>
            {!AuthState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            
          </div>
          <Routes>
            <Route path="/" element={< Home />} /> 
            <Route path="/createpost" element={< CreatePost />} /> 
            <Route path="/post/:id" element={< Post />} /> 
            <Route path="/login" element={< Login />} /> 
            <Route path="/register" element={< Register />} /> 
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;


