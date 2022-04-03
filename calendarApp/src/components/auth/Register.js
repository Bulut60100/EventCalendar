import React from 'react';
import Navbar from '../../layouts/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function Register() {

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('auth_token')){
            navigate('/');
        }
    },[])

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',

    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.name);
                localStorage.setItem('auth_id', res.data.id);
                swal( "success", res.data.name,"success" );
                navigate('/');
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
                                <h4>Kayıt Ol</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Ad-Soyad</label>
                                        <input type="text" onChange={handleInput} value={registerInput.name} name="name" className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="email" onChange={handleInput} value={registerInput.email} name="email" className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Şifre</label>
                                        <input type="password" onChange={handleInput} value={registerInput.password} name="password" className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Register</button>
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

