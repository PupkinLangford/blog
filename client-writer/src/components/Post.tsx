import React, {ChangeEvent, useEffect, useState} from "react";
import "./PostList.css";
import {Link, useHistory, useParams} from "react-router-dom";
import {getPost} from '../apiFunctions';
import { IPost } from "../types";
import Loader from "react-loader-spinner";

// Need to add comments
const Post = () => {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<IPost | null>();

    useEffect(() => {
        const getPostById = async () => {
            const p = await getPost(id);
            setPost(p);
        }
        getPostById();
    },[id]);
    
    return (
        post ?
        <div className="page post">
            <div className="title">{post.title}</div>
            <div className="byline">{"by " + post.author.username}</div>
            <div className="dateline">{post.format_date}</div>
            <div className="snippet">{post.snippet}</div>
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

export default Post;
