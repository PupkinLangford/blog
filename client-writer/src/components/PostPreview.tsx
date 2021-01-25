import React from "react";
import "./PostPreview.css";
import {Link} from "react-router-dom";
import { IPost } from "../types";

interface PostPreviewProps {
    post: IPost
}

const PostPreview = (props: PostPreviewProps) => {
    
    return (
        <div className="post-preview" style={props.post.published? {border: "1px solid red"} : {border: "1px solid black"}}>
            <h1><Link to={"/posts/" + props.post._id}>
                <div className="title">{props.post.title}</div>
            </Link></h1>
            <div className="byline"><Link to={"users/" + props.post.author._id}>{"by " + props.post.author.username}</Link></div>
            <div className="dateline">{props.post.format_date}</div>
            <div className="snippet">{props.post.snippet}</div>
            </div>
        )
}

export default PostPreview;
