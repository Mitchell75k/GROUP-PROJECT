const SpotifyAPIController = require("../controllers/comment.controller");

module.exports = app => {
    app.get("/api/comments", SpotifyAPIController.getAllComments);
    app.get("/api/comments/:id", SpotifyAPIController.getCommentById);
    app.post("/api/comments", SpotifyAPIController.createNewComment);
    app.put("/api/comments/:id", SpotifyAPIController.updateComment);
    app.delete("/api/comments/:id", SpotifyAPIController.deleteComment);    
};
