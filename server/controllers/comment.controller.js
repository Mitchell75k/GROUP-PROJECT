const mongoose = require("mongoose");
const Comment = require("../models/comment.model");

const getAllComments = (req, res) => {
    console.log('GET /api/comments request received');
    Comment.find()
        .then(allComments => {
            console.log('Comments retrieved:', allComments);
            res.json({ comments: allComments });
        })
        .catch(err => {
            console.error('Error fetching comments:', err);
            res.status(500).json({ message: "Error fetching comments", error: err });
        });
};

const getCommentById = (req, res) => {
    console.log(`GET /api/comments/${req.params.id} request received`);
    Comment.findOne({ _id: req.params.id })
        .then(thisComment => {
            console.log('Comment retrieved:', thisComment);
            res.json({ comment: thisComment });
        })
        .catch(err => {
            console.error('Error fetching comment by ID:', err);
            res.status(500).json({ message: "Error fetching comment by ID", error: err });
        });
};

const createNewComment = (req, res) => {
    console.log('POST /api/comments request received');

    console.log('Request Body:', req.body);

    Comment.create(req.body)
        .then(newComment => {
            console.log('New comment created:', newComment);
            res.status(201).json({ comment: newComment });
        })
        .catch(err => {
            console.error('Error creating new comment:', err);
            res.status(500).json({ message: "Error creating new comment", error: err });
        });
};


const updateComment = (req, res) => {
    console.log(`PUT /api/comments/${req.params.id} request received`);
    Comment.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })
        .then(updatedComment => {
            console.log('Comment updated:', updatedComment);
            res.json({ comment: updatedComment });
        })
        .catch(err => {
            console.error('Error updating comment:', err);
            res.status(500).json({ message: "Error updating comment", error: err });
        });
};

const deleteComment = (req, res) => {
    console.log(`DELETE /api/comments/${req.params.id} request received`);
    Comment.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log('Comment deleted:', result);
            res.json({ result: result });
        })
        .catch(err => {
            console.error('Error deleting comment:', err);
            res.status(500).json({ message: "Error deleting comment", error: err });
        });
};

module.exports = {
    getAllComments,
    getCommentById,
    createNewComment,
    updateComment,
    deleteComment
};
