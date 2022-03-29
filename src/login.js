import './bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const login = () => {
        try {   
            axios.post('http://localhost:8000/login',{
                email:email,
                password:password
            }, history.push("/") );
        } catch (error) {
            alert(error);
        }
    };

    return ( 

    <div className='container' style={{
        width: "960px",
        margin:"0 auto",
        marginTop:"100px"
    }}>
        <h4 className='page-header'>Login</h4>
        <form className='form'>
            <div className="col">
                <label>Email</label>
                <input className='form-control' type="email" placeholder='Enter Email' required onChange={(event) => {
                    setEmail(event.target.value);
                }}/>
            </div>

            <div className="col">
                <label>Password</label>
                <input className='form-control' type="password" placeholder='Enter Password' required onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            </div>
            
            <button type='submit' className='btn btn-success' onClick={login}>Login</button>
        </form>
        <a href='/register' className='btn btn-primary'>Click Here to Register</a>
    </div> );
}
 
export default Login;