import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Login() {

  const navigate  = useNavigate ();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 4;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userObject = JSON.stringify({
        "email":email,
        "password":password
    })

    // const headers = {
    //     "Access-Control-Allow-Origin":true,
    //     "Access-Control-Allow-Headers":"X-Requested-With"
    // }

    axios.post('http://127.0.0.1:5000/Login/login', userObject,
    {
        "headers": {
        "content-type": "application/json"
    }
    })
    .then( res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.userid);

        console.log('value of token ' ,res.data.token);
        console.log('id of person ' ,res.data.userid);
        console.log('email of person ' ,res.data.email);
        console.log('locally stored token ' ,localStorage.getItem('token'));

        navigate("/");


    })
    .catch( err =>{
      console.log('error in the login', err.response);
      alert(err.response.data);
    })
  }

  return (
    <div className="Login">
      <Form className='loginForm'onSubmit={handleSubmit}>
          <h1>Login Page</h1>
        <FormGroup>
          <Label>User ID</Label>
          <Input autoFocus type="text" placeholder="emailid should be unique" onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" placeholder="Atleast 5 characters long" onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button className='btn-lg btn-dark' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
