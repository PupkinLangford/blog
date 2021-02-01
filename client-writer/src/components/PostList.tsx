import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {getPosts} from '../apiFunctions';
import { IPost } from "../types";
import PostPreview from "./PostPreview";
import Loader from "react-loader-spinner";

interface PostListProps {

}

const PostList = (props: PostListProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    
    const history = useHistory();

    useEffect(() => {
        const getAllPosts = async () => {
            const allPosts = await getPosts();
            if (allPosts.error) {
                history.push('/login');
            } else {
                setPosts(allPosts);
            }
        }
        if (!localStorage.getItem('token')) {
            history.push('/login');
        } else {
            getAllPosts();
        }
    });

    return ( posts.length ?
        <div className="page">
            <ul>
                
                {posts.map(post => {
                   return <li><PostPreview post={post}/></li>
                })}
            </ul>
        </div>
        : 
            <Loader
            className="page"
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={2000}
            />
    );

};

export default PostList;
