import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css"
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();  

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div 
            className="post" 
            key={key}  // Add a unique key for each post
            onClick={() => { navigate(`/post/${value.id}`); }}  // Use navigate for navigation
          >
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText} </div>
            <div className="footer"> {value.username} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
