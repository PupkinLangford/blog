import React, {ChangeEvent, useEffect, useState} from "react";
import "./Post.css";
import {Link, useHistory, useParams} from "react-router-dom";
import {getComments, getPost} from '../apiFunctions';
import { IComment, IPost } from "../types";
import Loader from "react-loader-spinner";
import Comment from './Comment';

const Post = () => {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<IPost | null>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [showButtons, setShowButtons] = useState(false);

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
        setShowButtons(localStorage.getItem('username') === post?.author.username);
        getAllComments();
    },[id, post?.author.username]);

    
    return (
        post ?
        <div className="page post">
            <div className="title"><h1>{post.title}</h1></div>
            <Link to={'/users/' + post.author._id}><div className="byline">{post.author.username}</div></Link> 
            <div className="dateline">{post.format_date}</div>
            {showButtons ? <div className="editbuttons">
                <Link to={"/posts/" + post._id + "/edit"}>
                    <button>Edit Post</button>
                </Link>
                <button>{post.published ? "Unpublish Post" : "Publish Post"}</button>
                <button>Delete Post</button>
            </div> : null}
            <div className="content">{post.content}</div>
            <h3>Comments</h3>
            {comments.map(comment => {
                return <Comment comment={comment} parent={id}/>
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
