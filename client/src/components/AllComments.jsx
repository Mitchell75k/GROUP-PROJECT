// AllComments.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AllComments = ({ reviewId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments specific to the reviewId
        axios.get(`http://localhost:8000/api/comments/${reviewId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments for the review:', error);
            });
    }, [reviewId]);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center h-100">
            <div className="container mt-4">
            <h2 className="mb-4"><span style={{ borderBottom: '2px solid #007bff' }}>Comments for this Review</span></h2>
                <div className="list-group">
                    {comments.map(comment => (
                        <div key={comment._id} className="list-group-item">
                            <p className="mb-0">{comment.commentBody}</p>
                            <small className="text-muted">By: {comment.userName}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
    
}

export default AllComments;
