import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './Home';
import axios from 'axios';
import Protected from './Protected';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.headers.post['Content-Type'] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Protected Cmp={Home} />}></Route>
              <Route path='login' element={<Login />}>
              </Route>
              <Route path='register' element={<Register />}>
              </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
