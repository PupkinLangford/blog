import React, {ChangeEvent, useEffect, useState} from "react";
import "./PostList.css";
import {Link, useHistory} from "react-router-dom";
import {getPosts} from '../apiFunctions';
import { IPost } from "../types";

interface PostListProps {

}

const PostList = (props: PostListProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    
    const history = useHistory();

    useEffect(() => {
        const getAllPosts = async () => {
            const allPosts = await getPosts();
            //console.log(allPosts);
            setPosts(allPosts);
        }
        if (!localStorage.getItem('token')) {
            history.push('/login');
        } else {
            getAllPosts();
        }
    });

    return (
        <div className="page">
            <ul>
                {posts.map(post => {
                   return <li>{post.title + ": " + post.snippet + "---by: "  + post.author.username + post.format_date}</li>
                })}
            </ul>
        </div>
    );

};

export default PostList;
