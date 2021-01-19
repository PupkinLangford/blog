import React, {ChangeEvent, useState} from "react";
import "./Login.css";
import {loginUser} from '../apiFunctions';

interface LoginProps {

};

const Login = (props: LoginProps) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({username, password});
        const res = await loginUser(username, password);
        console.log(res);
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
            <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default Login;