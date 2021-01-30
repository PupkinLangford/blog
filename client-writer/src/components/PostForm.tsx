import React, {ChangeEvent, useEffect, useState} from "react";
import "./PostForm.css";
import {createPost} from '../apiFunctions';
import {useHistory} from 'react-router-dom';

interface PostFormProps {
    //handleUser: (user: string) => void
};

const PostForm = (props: PostFormProps) => {

    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/');
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if (e.target.name === 'content') {
            setContent(e.target.value);
        }
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
            setError("title not provided");
            return;
        }
        else if(!content) {
            setError("content not provided");
            return;
        }
        const res = await createPost(title, content);
        if (res.message) {
            setError(res.message);
        } else {
            setTitle("");
            setContent("");
            setError("");
            history.push("/posts/" + res.id);
        }
    }

    return (
        <div className="page postform">
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" value={title} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="content">Post Body</label>
                <textarea id="content" name="content" onChange={handleChange}>{content}</textarea>
            </div>
            <p>{error}</p>
            <button type="submit">Submit Post</button>
            </form>
        </div>
    );

};

export default PostForm;