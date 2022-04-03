import React from 'react';
import Navbar from '../../layouts/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function Login() {

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('auth_token')){
            navigate('/');
        }
    },[])

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],

    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`, data).then(res => {
                if(res.data.status === 200){
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.name);
                localStorage.setItem('auth_id', res.data.id);
                swal( "success", res.data.message,"success" );
                navigate('/');
                }
                else if (res.data.status === 401){
                    swal( "warning", res.data.message,"warning" );
                }
                else{
                    swal( "warning", res.data.message,"warning" );
                }
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Giriş Yap</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="email" onChange={handleInput} value={loginInput.email} name="email" className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Şifre</label>
                                        <input type="password" onChange={handleInput} value={loginInput.password} name="password" className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Giriş yap</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

