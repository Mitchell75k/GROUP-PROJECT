const Review = require('../models/review.model');

module.exports.getAllReviews = async (req, res) => {
    try {
        console.log("Getting all reviews...");
        const reviews = await Review.find(); //finds all reviews in the database

        if (reviews.length === 0) { //checking if there are any reviews in the database
            console.log("No reviews found");
            return res.status(404).json({ error: 'No reviews found' });
        }
        res.json(reviews); //sends the reviews to the client 
        console.log("Reviews:", reviews);
    } catch (err) { //catching any errors
        res.status(500).json({ message: err.message });
    }
}

module.exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id); //finds the review in the database
        if (!review) {
            console.log("Review not found");
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review); //sends the review to the client 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports.createReview = async (req, res) => {
    try {
        const { songTitle, artistName, review, rating, userId } = req.body; //gets the review data from the request body
        const newReview = await Review.create({
            songTitle,
            artistName,
            review,
            rating,
            userId
        });
        console.log("New review created by: ", userId, ": ", newReview);
        res.status(201).json(newReview); //sends the new review to the client 
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}

module.exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id); // find the review

        if (!review) {
            console.log("Review not found");
            return res.status(404).json({ message: 'Review not found' });
        }

        // checking if the userId in session matches the userId associated with the review
        if (req.session.userId !== review.userId.toString()) {
            return res.status(403).json({ message: 'You can only update your own reviews!' });
        }

        // if the user is authorized, update the review
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(updatedReview); // send updated review to the client 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id); // find the review

        if (!review) {
            console.log("Review not found");
            return res.status(404).json({ message: 'Review not found' });
        }

        // check if the userId in session matches the userId associated with the review
        if (req.session.userId !== review.userId.toString()) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }

        // if the user is authorized, delete the review
        await Review.findByIdAndDelete(req.params.id);

        res.json({ message: 'Review deleted' }); // send confirmation to the client 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
