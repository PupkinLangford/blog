import React, {ChangeEvent, useEffect, useState} from "react";
import "./Post.css";
import {Link, useHistory, useParams} from "react-router-dom";
import {getComments, getPost} from '../apiFunctions';
import { IComment, IPost } from "../types";
import Loader from "react-loader-spinner";
import Comment from './Comment';

// Need to add comments
const Post = () => {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<IPost | null>();
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        const getPostById = async () => {
            const p = await getPost(id);
            setPost(p);
        }
        const getAllComments = async () => {
            const c = await getComments(id);
            setComments(c);
        }
        getPostById();
        getAllComments();
    },[id]);
    
    return (
        post ?
        <div className="page post">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="byline">{post.author.username}</div>
            <div className="dateline">{post.format_date}</div>
            <div className="snippet">{post.content}</div>
            <h3>Comments</h3>
            {comments.map(comment => {
                return <Comment comment={comment}/>
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

export default Post;
