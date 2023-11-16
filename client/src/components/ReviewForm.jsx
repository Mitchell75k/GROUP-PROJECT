import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewForm = () => {
    const navigate = useNavigate();

    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [songLink, setSongLink] = useState('');
    const [userId, setUserId] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/session', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {
                    console.log(
                        'User is logged in, user ID:', response.data.userId,
                        'Username:', response.data.username
                    );
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
        axios.post('http://localhost:8000/api/reviews', {
            songTitle,
            artistName,
            review,
            rating,
            songLink,
            userId // Include the user ID here
        }, { withCredentials: true
        })
        .then((res) => {
            console.log(res);
            navigate('/reviews');
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
                } else {
                    console.error('Error response structure is not as expected:', errorResponse);
                    setErrors(['An unexpected error occurred.']);
                }
            } else {
                console.error('No response received from the server');
                setErrors(['An unexpected error occurred.']);
            }
        });
    };

    return (
        <>
            <div className="container mt-4">
                <h2>Write a Review</h2>
                <form onSubmit={submitHandler}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <div className="form-group">
                        <label htmlFor="">Song Title</label>
                        <input onChange={(e) => setSongTitle(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Artist Name</label>
                        <input onChange={(e) => setArtistName(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Song Link</label>
                        <input onChange={(e) => setSongLink(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Review</label>
                        <input onChange={(e) => setReview(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Rating</label>
                        <input onChange={(e) => setRating(e.target.value)} type="number" className="form-control" />
                    </div>
                    <button className="btn btn-primary mr-4">Submit</button>
                    <button className="btn btn-danger" onClick={() => navigate('/reviews')}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default ReviewForm;
