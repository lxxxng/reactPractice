import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });

    }, []);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", 
            {
                commentBody: newComment, 
                PostId: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
            .then((res) => {
                if(res.data.error)
                {
                    alert(res.data.error);
                }
                else{
                    const commentToAdd = {commentBody: newComment, username: res.data.username};
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
                
        })
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="title">{postObject.title}</div>
                <div className="body">{postObject.postText}</div>
                <div className="footer">{postObject.username}</div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="comment..."  
                        onChange={(event) => {setNewComment(event.target.value)}}
                        value={newComment}
                    />
                    <button onClick={addComment}> Add comment </button>
                </div>
                <div className="listOfComments"></div>
                {comments.map((comment, key) => {
                    return (
                        <div>
                            <div className="comment">{comment.commentBody}</div>
                            <label> username: {comment.username} </label>
                        </div>
                    )
                })}
            </div>
        </div>
  );
}

export default Post 