import React, {useState} from 'react';
import Topbar from '../Topbar/Topbar';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './admin.css'
import axios from 'axios';


export default function Admin(){
    const [username, setUsername] = useState("");
    const [mobileno, setmobile] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");




    function handleSubmit(event) {
        event.preventDefault();
    
        const userObject = JSON.stringify({
            "name":username,
            "email":email,
            "password":password,
            "mobile":mobileno,
            "age":age,
            "gender":gender
        })
    
        console.log(userObject)
    
        axios.post('http://127.0.0.1:5000/post_user/addTheData', userObject,
        {
            "headers": {
            "content-type": "application/json"
        }
        })
        .then( res => {
            console.log('value of res ' ,res);
        })
        .catch(err => {
            // console.log('error in api', err.response);
            // console.log('error in api', err);

            alert(err.response.data);
        })
      };


    
    return(
        
            <div className='UploadClass'>
                <Topbar />
                <Form className='adminForm' onSubmit={handleSubmit}>
                    <h1>Create User</h1>
                    <FormGroup>
                        <Label>User name</Label>
                        <Input type='text' placeholder='Name' onChange={(e)=>setUsername(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email ID</Label>
                        <Input type='email' placeholder='email id should be unique' onChange={(e)=>setEmail(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type='password' placeholder='password' onChange={(e)=>setpassword(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Mobile no.</Label>
                        <Input type='text' placeholder='should be 10 digits' onChange={(e)=>setmobile(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Age</Label>
                        <Input type='text' placeholder='less then 100' onChange={(e)=>setage(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Gender</Label>
                        <Input type='text' placeholder='Male/Female' onChange={(e)=>setgender(e.target.value)}></Input>
                    </FormGroup>
                    <Button className='btn-lg btn-dark'>Submit</Button>
                </Form>
            </div>
        
    )
    
}

