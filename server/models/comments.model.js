const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SpotifyAPI', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [3, "Comment must be at least 3 characters long"],
    },
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
