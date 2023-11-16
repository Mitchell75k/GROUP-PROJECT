import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
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
            axios.get('http://localhost:8000/api/reviews', { withCredentials: true })
                .then(response => {
                    console.log(response.data); // Log the review data to the console
                    setReviews(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className="AllReviews container">
            <h1 className="my-4">All Reviews</h1>
            <button className="btn btn-primary mb-4" onClick={() => navigate('/reviews/new')}>Add Review</button>
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
            <td>{review.userName }</td>
            <td>
                <Link to={`/reviews/${review._id}/edit`}>Edit</Link> 
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
}

export default AllReviews;