import { useEffect, useState } from 'react';
import { setCurrent, setHistory } from '../../slices/historySlices';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Main = () => {
    const [posts, setPost] = useState([])
    const dispatch = useDispatch()
    const location = useLocation();
    const { current, history } = useSelector((state) => state.history)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
            return res.json()
            
            
        }).then((data) => {
            
            setPost(data)
        })    
    }, [])    
    
    
    useEffect(() => {
    
        const prevPath = window.location.pathname;
    
    
        return () => {
            const currentPath = window.location.pathname;
            if (prevPath !== currentPath) {
                dispatch(setCurrent('Users'))
                console.log(current);
                console.log('change!');
            }
    
        };
    }, []);
    return (
        <div>
            <h1>Users</h1>
            <p>From: {current}</p>
        </div>
    );
    
    
    
    }



export default Main;