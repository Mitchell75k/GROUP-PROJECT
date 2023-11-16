import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllComments = () => {
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/session', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get('http://localhost:8000/api/comments', { withCredentials: true })
                .then(response => {
                    console.log(response.data); // Log the comment data to the console
                    setComments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
            }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className="AllComments container">
            <h1 className="my-4">All Comments</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Posted By</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment.commentBody}</td>
                            <td>{comment.userName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllComments;
        