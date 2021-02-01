import React, {useEffect, useState} from "react";
import "./CommentPage.css";
import {useHistory, useParams} from "react-router-dom";
import {deleteComment, getComment} from '../apiFunctions';
import { IComment } from "../types";
import Loader from "react-loader-spinner";

const CommentPage = () => {
    const { id, comment_id } = useParams<{id: string, comment_id: string}>();
    const [comment, setComment] = useState<IComment | null>();
    const history = useHistory();

    useEffect(() => {
        const getUserById = async () => {
            const c = await getComment(id, comment_id);
            setComment(c);
        }
        getUserById();
    },[id, comment_id]);

    const deleteSubmit = async () => {
        const r = window.confirm("Are you sure you want to delete this comment?");
        if(r) {
            await deleteComment(id, comment_id);
            history.push("/posts/" + id);
        }
    }
    
    return (
        comment ?
        <div className="page commentpage">
            <div className="byline"><h1>{comment.username}</h1></div>
            <div className="dateline">{comment.format_date}</div>
            <p className="content">{comment.content}</p>
            <button type="button" onClick={deleteSubmit}>Delete</button>
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