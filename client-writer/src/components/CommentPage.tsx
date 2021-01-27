import React, {useEffect, useState} from "react";
import "./CommentPage.css";
import {useParams} from "react-router-dom";
import {getComment} from '../apiFunctions';
import { IComment } from "../types";
import Loader from "react-loader-spinner";

const CommentPage = () => {
    const { id, comment_id } = useParams<{id: string, comment_id: string}>();
    const [comment, setComment] = useState<IComment | null>();

    useEffect(() => {
        const getUserById = async () => {
            const c = await getComment(id, comment_id);
            setComment(c);
        }
        getUserById();
    },[id, comment_id]);
    
    return (
        comment ?
        <div className="page commentpage">
            <div className="byline"><h1>{comment.username}</h1></div>
            <div className="dateline">{comment.format_date}</div>
            <p className="content">{comment.content}</p>
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

export default CommentPage;