import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Dashboard.css'
import Topbar from '../Topbar/Topbar';
import {Button} from 'reactstrap'
import { Spinner } from 'react-bootstrap';

export default function Component(){
    const [dashObject, setdashObject] = useState([]);
    const [netAmount, setnetAmount] = useState(0);
    const [Role, setRole] = useState("");
    const [refresh, setrefresh] = useState(0);
    const [email, setemail  ] = useState("");



    useEffect(() =>{
        axios.get('http://127.0.0.1:5000/getDashData/getcalculation',{
            params:{
                per:localStorage.getItem('userid')
            }
        })
        .then( res => {
            console.log('response data', res.data);
            setRole(res.data.userRole);
            setnetAmount(res.data.netAmout);
            // console.log('response netamount', res.data.netAmout);
            setdashObject(res.data.finalObjectArray);


            // console.log(this.state.dashObject[0].total);
        })
    },[refresh]);


    function handleAck (senderid, payment) {
        const postAck = JSON.stringify({
            "personGive_id":senderid,
            "personAccept_id":localStorage.getItem('userid'),
            "payment":payment,
            "acknowledgment":true
        });
        console.log(postAck);
        axios.post('http://127.0.0.1:5000/getDashData/acknowledgeMoney', postAck,
        {
            "headers": {
            "content-type": "application/json"
        }})
        .then(res => {
            console.log('acknowledged', res.data);  
        })
    };

    function handlePay (giveid, payment) {
        // const navigate = useNavigate();
        let postPay = {}
        const postid = {
            "personGive_id":localStorage.getItem('userid'),
            "personAccept_id":giveid
        };

        if (payment>-netAmount){
            const pay = {"payment":-netAmount};
            postPay ={
                ...pay,
                ...postid
            }
            setnetAmount(0);
            // this.setState({netAmount:0});
        }
        else{
            const pay = {"payment":payment};
            postPay ={
                ...pay,
                ...postid
            }
            setnetAmount(netAmount+payment);
            // this.setState({netAmount:this.state.netAmount+payment});
        }
        console.log('From pay', postPay);
        const strpay = JSON.stringify(postPay);
        console.log('user pay', strpay);
        setrefresh(refresh+1);
        
        axios.post('http://127.0.0.1:5000/getDashData/gaveMoney', strpay,
        {
            "headers": {
            "content-type": "application/json"
        }})
        .then(res => {
            console.log('acknowledged', res.data);
              
        });

        // return <Navigate to="/"></Navigate>
    };

    
    console.log('dashboard object',dashObject);
    console.log('dashboard role', Role);
    console.log('dashboard Netamount', netAmount);


    if (Role === "Acceptor"){
        return(
            <div className='Dash'>
                <Topbar />
                <h1>Dashboard</h1>
                <ul>
                    {dashObject.map( data => <li className='listClass' key={data.personGive_id}> {data.personGive_id} person has sent you {data.payment} amount <Button className=' btn-light' onClick={() => handleAck(data.personGive_id, data.payment)}>Acknowledge</Button></li>)}
                    
                </ul>
                
            </div>
        )
    }
    else if (Role === "Payer"){
        return( (netAmount !== 0) ?
            <div className='Dash'>
                <Topbar />
                <h1>Dashboard</h1>
                You have to pay total of {netAmount}
                
                <ul>
                    {dashObject.map( data => (data.total>0) ? <li className='listClass' key={data._id}> You can pay {data.total} amount to {data._id} person <Button className='btn-light' onClick={() => handlePay(data._id, data.total)}>Pay</Button></li>: null)}
                    
                </ul> 
                
            </div> :
            <div className='Dash'>
                <Topbar />
                <h1>Dashboard</h1>
                <ul>
                    <li> Your net transactions are nill....</li>
                    
                </ul>
                
            </div>
        )
    }
    else if (Role === "No Payment"){
        return(
            <div className='Dash'>
                <Topbar />
                <h1>Dashboard</h1>
                <ul>
                    <li> Your net transactions are nill</li>
                    
                </ul>
                
            </div>
        )
    };
    return (
        <div className='Dash'>
                <Topbar />
                Loading the dashboard. Please wait
        </div>
    )
    
};

