import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setHistory, setCurrent } from '../../slices/historySlices';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../../creators/postsCreator';

const Posts = () => {
    const { history, current } = useSelector(state => state.history);
    const { posts, setPosts} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(current);

    useEffect(() => {
        dispatch(fetchAllPosts());
        
           


    }, []);


    useEffect(() => {
        const prevPath = window.location.pathname;

        return () => {  
            const currentPath = window.location.pathname;
            if (prevPath !== currentPath) {
                dispatch(setCurrent('Posts'));
                console.log('change!');
            }
        };
    }, [dispatch, location]);

    function GetShortValue(word, id) {
        if (word.length > 20) {
            return (
                <>
                    {word.substr(0, 20)}+''+<Link to={'/posts/' + id}>More...</Link>
                </>
            );
        } else {
            return word;
        }
    }

    return (
        <div>
            <h1>From: {current}</h1>
            { 
                 posts.length !== 0 ? posts.map(item => (
                    <div className='post' key={item.id}>
                        <strong>{item.id}</strong>
                        <h1>{item.title}</h1>
                        <p>{GetShortValue(item.body, item.id)}</p>
                        <Link to={`/posts/${item.id}`}>
                            <button>Details</button>
                        </Link>
                    </div>
                )) : <p>Loading posts...</p>
            }
        </div>
    );
};

export default Posts;
