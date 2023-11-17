import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import NavBar from './NavBar';

const AllReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/session', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    // Fetch reviews if the user is logged in
                    axios.get('http://localhost:8000/api/reviews', { withCredentials: true })
                        .then(reviewResponse => {
                            console.log(reviewResponse.data);
                            setReviews(reviewResponse.data);
                        })
                        .catch(reviewError => {
                            console.error('Error fetching reviews:', reviewError);
                            navigate('/login');
                        });
                } else {
                    navigate('/login'); // Redirect to the login screen if not logged in
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
                navigate('/login'); // Redirect to the login screen in case of an error
            });
    }, [navigate]);

    return (
        <>
            <NavBar />
            <div className="AllReviews container">
                <h1 className="my-4">All Reviews</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Song Title</th>
                            <th>Artist Name</th>
                            <th>Rating</th>
                            <th>Posted By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td><Link to={`/reviews/${review._id}`}>{review.songTitle}</Link></td>
                                <td>{review.artistName}</td>
                                <td>{review.rating}</td>
                                <td>{review.userName}</td>
                                <td>
                                    <Link to={`/reviews/${review._id}/edit`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AllReviews;
