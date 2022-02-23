import React, {useState} from 'react';
import Topbar from '../Topbar/Topbar';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './UploadTrans.css'
import axios from 'axios';


export default function UploadTrans(){
    const [trip_name, setTrip] = useState("");
    const [activity, setactivity] = useState("");
    const [payment, setpayment] = useState("");



    function handleSubmit(event) {
        event.preventDefault();
    
        const userObject = JSON.stringify({
            "trip_name":trip_name,
            "activity":activity,
            "payment":payment,
            "name_id":localStorage.getItem('userid')
        })
    
        console.log(userObject)
    
        axios.post('http://127.0.0.1:5000/postTransactions/addTransactions', userObject,
        {
            "headers": {
            "content-type": "application/json"
        }
        })
        .then( res => {
            console.log('value of res ' ,res.data);
        })
      };


    
    return(
        
            <div className='Uploadtrans'>
                <Topbar />
                <Form className='transForm' onSubmit={handleSubmit}>
                    <h1>Create User</h1>
                    <FormGroup>
                        <Label>Trip name</Label>
                        <Input type='text' placeholder='' onChange={(e)=>setTrip(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Activity</Label>
                        <Input type='text' placeholder='' onChange={(e)=>setactivity(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Payment</Label>
                        <Input type='text' placeholder='greater than 0' onChange={(e)=>setpayment(e.target.value)}></Input>
                    </FormGroup>
                    <Button className='btn-lg btn-dark'>Submit</Button>
                </Form>
            </div>
        
    )
    
}

