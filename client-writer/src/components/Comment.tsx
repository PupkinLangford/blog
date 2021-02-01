import React from "react";
import "./Comment.css";
import {Link} from "react-router-dom";
import { IComment, IPost } from "../types";

interface CommentProps {
    parent: IPost;
    comment: IComment
}

const Comment = (props: CommentProps) => {

    const commentLink = props.parent.author.username === localStorage.getItem('username') ? 
                        "/comments/" + props.comment._id : "";
    return (
        <div className="comment">
            <Link to={"/posts/" + props.comment._id}>
            </Link>
            <div className="byline">{"by " + props.comment.username}</div>
            <div className="dateline">{props.comment.format_date}</div>
            <Link to={"/posts/" + props.parent._id + commentLink}>
                <div className="snippet">{props.comment.content}</div>
            </Link>
            </div>
        )
}

export default Comment;
