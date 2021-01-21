import React, {ChangeEvent, useEffect, useState} from "react";
import "./PostList.css";
import {Link, useHistory} from "react-router-dom";

interface PostListProps {

}

const PostList = (props: PostListProps) => {
    
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/login');
        }
    });

    return (
        <div className="page">

        </div>
    );

};

export default PostList;
