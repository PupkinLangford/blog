import React, {useEffect, useState} from "react";
import "./UserPage.css";
import {useParams} from "react-router-dom";
import {getUser} from '../apiFunctions';
import { IUser } from "../types";
import Loader from "react-loader-spinner";
import PostPreview from "./PostPreview";

const UserPage = () => {
    const { id } = useParams<{id: string}>();
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const getUserById = async () => {
            const u = await getUser(id);
            setUser(u);
        }
        getUserById();
    },[id]);
    
    return (
        user ?
        <div className="page user">
            <div className="username"><h1>{user.username}</h1></div>
            <h3>Articles</h3>
            {user.posts.map(post => {
                return <PostPreview post={post}/>
            })}
        </div>
        :   <Loader
            className="page"
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={1000}
            />);
}

export default UserPage;