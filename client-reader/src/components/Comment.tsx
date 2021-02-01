import React from "react";
import "./Comment.css";
import { IComment, IPost } from "../types";

interface CommentProps {
    parent: IPost;
    comment: IComment
}

const Comment = (props: CommentProps) => {

    return (
        <div className="comment">
            <div className="byline">{"by " + props.comment.username}</div>
            <div className="dateline">{props.comment.format_date}</div>
            <div className="snippet">{props.comment.content}</div>
        </div>
        )
}

export default Comment;
