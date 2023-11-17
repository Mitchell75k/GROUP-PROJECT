// ReviewDetail.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


//css imports
import './css/AllComments.css';
import './css/ReviewDetail.css';
import './css/CommentForm.css';
import './css/styles.css';

//component imports
import CommentForm from './CommentForm';
import AllComments from './AllComments';
import NavBar from './NavBar';

const ReviewDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [review, setReview] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/session', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUserId(response.data.userId); // Save the user ID in state
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
            axios.get(`http://localhost:8000/api/reviews/${id}`, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    setReview(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [isLoggedIn, id]);

    const deleteReview = () => {
        axios.delete(`http://localhost:8000/api/reviews/${id}`, { withCredentials: true })
            .then(response => {
                console.log('Review deleted:', response.data);
                navigate('/reviews');
            })
            .catch(error => {
                console.error('Error deleting review:', error);
            });
    }


    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar className="mb-3" />
            <div className="container-spacing">
                <div className="container ReviewDetail mt-6">
                    <div className="reviewDetails bg-light p-4 rounded">
                        <div>
                            <h1>{review.songTitle}</h1>
                            <h4>By: {review.artistName}</h4>
                        </div>
                        <h4>Reviewed by: {review.userName}</h4>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                        <a href={review.songLink} className="btn btn-primary">Listen to the song</a>
                        <div className="reviewButton d-flex justify-content-between mt-4">
                            <button onClick={() => navigate(`/reviews`)} className="btn btn-secondary">Back</button>
                            {isLoggedIn && review.userId === userId && (
                                <div className="d-flex">
                                    <button onClick={() => navigate(`/reviews/${review._id}/edit`)} className="btn btn-warning">Edit</button>
                                    <button onClick={deleteReview} className="btn btn-danger ml-4">Delete</button>
                                    {/* Increased margin for better spacing */}
                                </div>
                            )}
                        </div>
                    </div>
    
                    <div className="commentForm">
                        <CommentForm reviewId={id} />
                    </div>
                    <div className="allComments mt-4">
                        <AllComments reviewId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
    
    
}

export default ReviewDetail;
