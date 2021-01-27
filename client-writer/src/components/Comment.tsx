import React from "react";
import "./Comment.css";
import {Link} from "react-router-dom";
import { IComment, IPost } from "../types";

interface CommentProps {
    parent: string;
    comment: IComment
}

const Comment = (props: CommentProps) => {
    
    return (
        <div className="comment">
            <Link to={"/posts/" + props.comment._id}>
            </Link>
            <div className="byline">{"by " + props.comment.username}</div>
            <div className="dateline">{props.comment.format_date}</div>
            <Link to={"/posts/" + props.parent + "/comments/" + props.comment._id}>
                <div className="snippet">{props.comment.content}</div>
            </Link>
            </div>
        )
}

export default Comment;
