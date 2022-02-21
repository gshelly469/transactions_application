import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';

export default function Login() {

  const navigate  = useNavigate ();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userObject = JSON.stringify({
        "id":email,
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
        console.log('locally stored token ' ,localStorage.getItem('token'));

        navigate("/");


    })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
