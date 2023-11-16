const ReviewController = require("../controllers/review.controller");
const isAuthenticated = require("../middlewares/authMiddleware");


module.exports = (app) => {
    app.get("/api/reviews", isAuthenticated, ReviewController.getAllReviews);
    app.get("/api/reviews/:id", isAuthenticated, ReviewController.getReview);
    app.post("/api/reviews", isAuthenticated, ReviewController.createReview);
    app.put("/api/reviews/:id", isAuthenticated, ReviewController.updateReview);
    app.delete("/api/reviews/:id", isAuthenticated, ReviewController.deleteReview);
}