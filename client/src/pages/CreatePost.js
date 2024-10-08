import "../App.css"
import React, { useContext, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {

  let navigate = useNavigate(); 
  const { AuthState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if(!localStorage.getItem("accessToken"))
    {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios.post(
		"https://react-practice-a75bfd5abb62.herokuapp.com/posts", 
		data, 
		{headers: {accessToken: localStorage.getItem('accessToken')}}
	).then(()=> {
		navigate("/");
    });
  };  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must input a title"),
    postText: Yup.string().required(),
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
            <button type="submit"> Create form</button>
          </Form>
      </Formik>
    </div>
  )
}

export default CreatePost