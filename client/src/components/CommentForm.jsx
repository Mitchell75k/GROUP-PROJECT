import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

const CommentForm = () => {
    const navigate = useNavigate();
    const [commentBody, setCommentBody] = useState('');
    const [userId, setUserId] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/session', {withCredentials: true})
            .then(response => {
                if (response.data.loggedIn) {
                    console.log('User is logged in, user ID:', response.data.userId, 'Username:', response.data.username);
                    setUserId(response.data.userId);
                } else {
                    console.log('User is not logged in');
                }
            })
            .catch(error => {
                console.log('Error getting session:', error);
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/comments', {
            commentBody,
            userId,
            reviewId
        }, {withCredentials: true})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);

                if (err.response) {
                    console.error('Server responded with error status:', err.response.status);

                    const errorResponse = err.response.data;

                    if (errorResponse && typeof errorResponse === 'object' && errorResponse.errors) {
                        const errorArr = [];
                        for (const key of Object.keys(errorResponse.errors)) {
                            errorArr.push(errorResponse.errors[key].message);
                        }

                        setErrors(errorArr);
                    }
                } else {
                    console.error('Server responded with error:', err.message);
                }
            });
    }

    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <textarea className="form-control" name="commentBody" placeholder='Add comment...' onChange={(e) => setCommentBody(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                errors.map((err, index) => <p key={index}>{err}</p>)
            }
        </div>
    );
}

export default CommentForm;