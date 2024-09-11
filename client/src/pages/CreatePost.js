import "../App.css"
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

function CreatePost() {

  let navigate = useNavigate(); 
  
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then(()=> {
      navigate("/");
    });
  };  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must input a title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />
            <button type="submit"> Create form</button>
          </Form>
      </Formik>
    </div>
  )
}

export default CreatePost