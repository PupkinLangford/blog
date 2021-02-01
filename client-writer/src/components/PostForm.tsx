import React, {ChangeEvent, useEffect, useState} from "react";
import "./PostForm.css";
import {createPost, getPost, updatePost} from '../apiFunctions';
import {useHistory, useParams} from 'react-router-dom';



interface PostFormProps {
    method: string,
};

const PostForm = (props: PostFormProps) => {

    const { id } = useParams<{id: string}>();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/');
        }
        const fillPost = async () => {
            const p = await getPost(id);
            setTitle(p.title);
            setContent(p.content);
        };
        if (props.method === "PUT") {
            fillPost();
        }
    }, [history, id, props.method]);

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
        const apiCall = await props.method === 'PUT' ? updatePost : createPost;
        const res = await apiCall(title, content, id);
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
                <textarea id="content" name="content" defaultValue={content} onChange={handleChange} required></textarea>
            </div>
            <p>{error}</p>
            <button type="submit">Submit Post</button>
            </form>
        </div>
    );

};

export default PostForm;