import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ReviewDetail.css';

import CommentForm from './CommentForm';
import AllComments from './AllComments';


const ReviewDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the review ID from the URL parameters

    const [review, setReview] = useState({});
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
            axios.get(`http://localhost:8000/api/reviews/${id}`, { withCredentials: true })
                .then(response => {
                    console.log(response.data); // Log the review data to the console
                    setReview(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [isLoggedIn, id]);

    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <div className="ReviewDetail container">
            <div className="reviewDetails">
                {/* Wrap the review details in a div */}
                <div>
                    <h1>{review.songTitle}</h1>
                    <h4>By: {review.artistName}</h4>
                </div>
                <h4>Reviewed by: {review.userName}</h4>
                <p>{review.review}</p>
                <p>Rating: {review.rating}</p>
                <a href={review.songLink}>Listen to the song</a>
            </div>

            <div className="reviewButton">
                {/* Wrap the button in a separate div */}
                <button onClick={() => navigate(`/reviews`)}>Back</button>
            </div>
        </div>
        <div className="commentForm">
            <CommentForm />
        </div>
        <div className="allComments">
            <AllComments />
        </div>
    </>
    );
}


export default ReviewDetail;