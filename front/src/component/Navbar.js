import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="images/logo1.png" alt="" width={'100px'}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li>
                                <Link to={'/'} className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to={'/login'} className={'btn btn-dark'} href="#">Login</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;