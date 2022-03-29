import './bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPwd] = useState('');
    const history = useHistory();

    const register = () => {
        axios.post("http://localhost:8000/register",{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        });
        history.push("/login");
    };
    return ( 
        <div className="container" style={{
            width: "960px",
            margin:"0 auto",
            marginTop:"100px"
        }}>
            <h4 className='page-header'>Register</h4>
            <form className="form">
                <div className="col">
                    <label>First Name</label>
                    <input className='form-control' type="text" placeholder='Enter First Name' required onChange={(event) => {
                        setFirstName(event.target.value);
                    }}/>
                </div>

                <div className="col">
                    <label>Last Name</label>
                    <input className='form-control' type="text" placeholder='Enter Last Name' required onChange={(event) => {
                        setLastName(event.target.value);
                    }}/>
                </div>

                <div className="col">
                    <label>Email</label>
                    <input className='form-control' type="email" placeholder='Enter Email' required onChange={(event) => {
                        setEmail(event.target.value);
                    }}/>
                </div>

                <div className="col">
                    <label>Password</label>
                    <input className='form-control' type="password" placeholder='Enter Password' required onChange={(event) => {
                        setPwd(event.target.value);
                    }}/>
                </div>

                <button type='submit' className='btn btn-success' onClick={register}>Register</button>
            </form>

            <a href='/login' className='btn btn-primary'>Click Here To Login</a>
        </div>
     );
}
 
export default Register;