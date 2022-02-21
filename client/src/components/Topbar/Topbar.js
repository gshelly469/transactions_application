import React, {Component} from 'react';
import './Topbar.css'

import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Topbar extends Component{
    render(){
        return(
                <div className='TopbarClass'>
                    <Navbar bg='dark' variant='dark' sticky='top'>
                        {/* <NavLink className="navlinkClass" activeClassName="active" to='/' exact>
                            Friends Payment
                        </NavLink>

                        <NavLink className="navlinkClass" activeClassName="active" to='/Transaction' exact>
                            Transaction
                        </NavLink>

                        <NavLink className="navlinkClass" activeClassName="active" to='/UploadTrans' exact>
                            UploadTrans 
                        </NavLink> */}
                        <Nav>
                            <Nav.Link href="/" > Dashboard </Nav.Link>
                            <Nav.Link href="/Transaction" > Transaction </Nav.Link>
                            <Nav.Link href="/UploadTrans" > Upload Transaction </Nav.Link>
                            <Nav.Link href="/Admin" > Admin </Nav.Link>
                            <Nav.Link href="/" > Logout </Nav.Link>
                        </Nav>
                    </Navbar>
                
                </div>
        )

                // <nav className='NavbarClass'>
                //     <NavLink className="navlinkClass" to='/' exact>
                //          Friends Payment
                //     </NavLink>

                    
                //     {/* <a class="navbar-brand" href="/">Navbar</a> */}
                //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                //     <i class="navbar-toggler-icon"></i>
                //     </button>

                //     <div class="collapse navbar-collapse" id="navbarSupportedContent">
                //         <ul class="navbar-nav mr-auto">

                //             {/* <div className='selector'>
                //                 <div className='left'>  </div>
                //                 <div className='right' />
                //             </div> */}

                //             <li class="nav-item active">
                //                 <NavLink class="nav-link" to="/" exact>
                //                     Home <span class="sr-only">(current)</span>
                //                 </NavLink>
                //             </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="/">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/">Action</a>
                                <a class="dropdown-item" href="/">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/">Something else here</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="/">Disabled</a>
                            </li> */}
                //         </ul>
                //     </div>                  

                // </nav>
            
                // <div className='Topbarclass'>
                //     <div className='DashboardClass'>
                //         Dashboard
                //     </div>
                //     <div className='TransactionsClass'>
                //         Transactions
                //     </div>
                //     <div className='UploadClass'>
                //         Upload Transactions    
                //     </div>
                //     <div className='Admin'>
                //         Admin  
                //     </div>
                //     <div className='Logout'>
                //         Logout  
                //     </div>
                // </div>
                    // <NavLink className="navlinkClass" to='/' exact>
                    //     Friends Payment
                    // </NavLink>
            
    }
}

export default Topbar;