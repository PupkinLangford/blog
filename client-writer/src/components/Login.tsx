import React, {ChangeEvent, useEffect, useState} from "react";
import "./Login.css";
import {loginUser} from '../apiFunctions';
import {useHistory} from 'react-router-dom';

interface LoginProps {

};

const Login = (props: LoginProps) => {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/');
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username) {
            setError("Username not provided");
            return;
        }
        const res = await loginUser(username, password);
        if (!res.token) {
            setError(res.message);
        } else {
            localStorage.setItem('token', res.token);
            setUsername("");
            setPassword("");
            setError("");
            history.push("/");
        }
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" value={username} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input id="password" name="password" type="password" value={password} onChange={handleChange}/>
            </div>
            <p>{error}</p>
            <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default Login;