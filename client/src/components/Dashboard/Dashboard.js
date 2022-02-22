import axios from 'axios';
import React, {Component} from 'react';
import './Dashboard.css'
import Topbar from '../Topbar/Topbar';

class Dash extends Component{
    constructor(){
        super();
        this.state = {
            dashObject : [],
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

            // console.log(this.state.dashObject[0].total);
        })
    }

    render(){
        console.log('dashboard res object',this.state.dashObject);
        console.log('dashboard res role', this.state.Role);

        if (this.state.Role === "Acceptor"){
            return(
                <div className='Dash'>
                    <Topbar />
                    Dashboard
                    <ul>
                        {this.state.dashObject.map( data => <li> {data.personGive_id} person has sent you {data.payment} amount</li>)}
                        
                    </ul>
                    
                </div>
            )
        }
        else if (this.state.Role === "Payer"){
            return(
                <div className='Dash'>
                    <Topbar />
                    Dashboard
                    <ul>
                        {this.state.dashObject.map( data => <li> You have to pay {data.total} amount to {data._id} person </li>)}
                        
                    </ul>
                    
                </div>
            )
        }
        else if ( this.state.Role === "No Payment"){
            return(
                <div className='Dash'>
                    <Topbar />
                    Dashboard
                    <ul>
                        <li> Your net transactions are nill</li>
                        
                    </ul>
                    
                </div>
            )
        };
        return (
            <div className='Dash'>
                    <Topbar />
                    Looding the dashboard. Please wait
            </div>
        )
        
    };
}

export default Dash;