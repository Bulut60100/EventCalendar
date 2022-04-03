import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function Navbar() {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/logout').then(res => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('success','çıkış başarılı','success');
                navigate('/login');
        });
    });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page" href="#">Giriş Yap</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link" href="#">Kayıt Ol</Link>
                </li>
            </ul>
        );
    }
    else {
        AuthButtons = (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {localStorage.getItem('auth_name')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><button type='button' onClick={logoutSubmit} className="dropdown-item">Çıkış Yap</button></li>
                </ul>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
            <div className="container">
                <Link to="/" className="navbar-brand" href="#">Calendar App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" href="#">Anasayfa</Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
