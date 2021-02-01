import React, {ChangeEvent, useEffect, useState} from "react";
import "./Post.css";
import {Link, useHistory, useParams} from "react-router-dom";
import {createComment, deletePost, getComments, getPost, publishPost} from '../apiFunctions';
import { IComment, IPost } from "../types";
import Loader from "react-loader-spinner";
import Comment from './Comment';

const Post = () => {
    const { id } = useParams<{id: string}>();
    const history = useHistory();
    const [post, setPost] = useState<IPost | null>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentUsername, setCommentUsername] = useState("");
    const [commentContent, setCommentContent] = useState("");
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'commentusername') {
            setCommentUsername(e.target.value);
        } else if (e.target.name === 'commentcontent') {
            setCommentContent(e.target.value);
        }
    };

    const publishSubmit = async () => {
        await publishPost(id);
        history.go(0);
    }

    const deleteSubmit = async () => {
        const r = window.confirm("Are you sure you want to delete this post?");
        if(r) {
            await deletePost(id);
            history.push("/");
        }
    }

    const commentSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!commentUsername) {
            window.alert("username not provided");
            return;
        }
        else if(!commentContent) {
            window.alert("comment may not be blank");
            return;
        }
        const res = await createComment(id, commentUsername, commentContent);
        if (res.message) {
            window.alert("Error posting content");
        } else {
            setCommentUsername("");
            setCommentContent("");
            history.go(0);
        }
    }

    
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
                <button type="button" onClick={publishSubmit}>{post.published ? "Unpublish Post" : "Publish Post"}</button>
                <button type="button" onClick={deleteSubmit}>Delete Post</button>
            </div> : null}
            <div className="content">{post.content}</div>
            <h3>Comments</h3>
            {comments.map(comment => {
                return <Comment comment={comment} parent={post}/>
            })}
            <form onSubmit={commentSubmit}>
                <div>
                    <label htmlFor="commentusername">Username</label>
                    <input id="commentusername" name="commentusername" value={commentUsername} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="commentcontent">Comment</label>
                    <textarea id="commentcontent" name="commentcontent" defaultValue={commentContent} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Submit Comment</button>
            </form>
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
