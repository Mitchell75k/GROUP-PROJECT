const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

const getAllComments = async (req, res) => {
    try {
        console.log("Getting all comments...");
        let comments = await Comment.find(); //finds all comments in the database

        // Convert comments to plain JavaScript objects
        comments = comments.map(comment => comment.toObject());

        // Fetch the user for each comment
        for (let comment of comments) {
            const user = await User.findById(comment.userId);
            if (user) {
                comment.userName = user.userName; // Add the userName to the comment
            }
    }

        if (comments.length === 0) { //checking if there are any comments in the database
            console.log("No comments found");
            return res.status(404).json({ error: 'No comments found' });
        }
        res.json(comments); //sends the comments to the client
        console.log("Comments:", comments);
    } catch (err) { //catching any errors
        res.status(500).json({ message: err.message });
    }
}

const getComment= async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id); //finds the comment in the database
        if (!comment) {
            console.log("Comment not found");
            return res.status(404).json({ message: 'Comment not found' });
        }

        const user = await User.findById(comment.userId);
        if (user) {
            comment = comment.toObject(); // Convert the Mongoose document to a plain JavaScript object
            comment.userName = user.userName; // Add the userName to the comment
        }

        res.json(comment); //sends the comment to the client
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}


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
    getComment,
    createNewComment,
    deleteComment
};
