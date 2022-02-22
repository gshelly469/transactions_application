import axios from 'axios';
import React, {Component} from 'react';
import './Dashboard.css'
import Topbar from '../Topbar/Topbar';
import {Button} from 'reactstrap'

class Dash extends Component{
    constructor(){
        super();
        this.state = {
            dashObject : [],
            netAmout:0,
            Role: ""
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/getDashData/getcalculation',{
            params:{
                per:localStorage.getItem('userid')
            }
        })
        .then( res => {
            console.log('response data', res.data);
            this.setState({dashObject : res.data.finalObjectArray});
            this.setState({Role : res.data.userRole});
            this.setState({netAmout : res.data.netAmout});


            // console.log(this.state.dashObject[0].total);
        })
    }

    handleAck (senderid, payment) {
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

    handlePay (giveid, payment) {
        let postPay = {}
        const postid = {
            "personGive_id":localStorage.getItem('userid'),
            "personAccept_id":giveid
        };

        if (payment>-this.state.netAmout){
            const pay = {"payment":-this.state.netAmout};
            postPay ={
                ...pay,
                ...postid
            }
            this.setState({netAmout:0});
        }
        else{
            const pay = {"payment":payment};
            postPay ={
                ...pay,
                ...postid
            }
            this.setState({netAmout:this.state.netAmout+payment});
        }
        console.log('user pay', payment);
        console.log('From pay', postPay);
        // axios.post('http://127.0.0.1:5000/getDashData/gaveMoney', JSON.stringify(postPay),
        // {
        //     "headers": {
        //     "content-type": "application/json"
        // }})
        // .then(res => {
        //     console.log('acknowledged', res.data);  
        // })
    };

    render(){
        console.log('dashboard res object',this.state.dashObject);
        console.log('dashboard res role', this.state.Role);

        if (this.state.Role === "Acceptor"){
            return(
                <div className='Dash'>
                    <Topbar />
                    <h1>Dashboard</h1>
                    <ul>
                        {this.state.dashObject.map( data => <li className='listClass'> {data.personGive_id} person has sent you {data.payment} amount <Button className=' btn-light' onClick={() => this.handleAck(data.personGive_id, data.payment)}>Acknowledge</Button></li>)}
                        
                    </ul>
                    
                </div>
            )
        }
        else if (this.state.Role === "Payer"){
            return(
                <div className='Dash'>
                    <Topbar />
                    <h1>Dashboard</h1>
                    You have to pay total of {this.state.netAmout}
                    <ul>
                        {this.state.dashObject.map( data => (data.total>0) ? <li className='listClass'> You can pay {data.total} amount to {data._id} person <Button className='btn-light' onClick={() => this.handlePay(data._id, data.total)}>Pay</Button></li>: null)}
                        
                    </ul>
                    
                </div>
            )
        }
        else if ( this.state.Role === "No Payment"){
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
}

export default Dash;