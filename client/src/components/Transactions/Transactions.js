import React, {Component} from 'react';
import Topbar from '../Topbar/Topbar';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './Transactions.css'


class Trans extends Component{

    constructor(){
        super();
        this.state = {
            tableContent : []
        }
    };

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/getOutTrans/getOutTransactions')
        .then( res => {
            this.setState({tableContent:res.data});
            console.log(this.state.tableContent);

        })
    }

    render(){
        if (this.state.tableContent.length===0){
            console.log('did not get the data', this.state.tableContent);
            return(
                <div className='UploadClass'>
                    <Topbar />
                    Getting the data
                </div>
            )
        }
        else{
            console.log('data', this.state.tableContent)
        return(
            
                <div className='UploadClass'>
                    <Topbar />
                    <div className='tab'>
                    <Table>
                        <thead>
                            <tr>
                                <th>NameID</th>
                                <th>Trip</th>
                                <th>Activity</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>{this.state.tableContent[0].name_id}</td>
                                <td>{this.state.tableContent[0].trip_name} </td>
                                <td>{this.state.tableContent[0].activity}</td>
                                <td>{this.state.tableContent[0].payment}</td>
                            </tr> */}
                            {this.state.tableContent.map((item) =>(
                                <tr key={item._id}>
                                    <td>{item.name_id}</td>
                                    <td>{item.trip_name} </td>
                                    <td>{item.activity}</td>
                                    <td>{item.payment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </div>
            
        )
        }
    }
}

export default Trans;