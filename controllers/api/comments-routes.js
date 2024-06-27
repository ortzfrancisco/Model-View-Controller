const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get("/:postId", async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            where: { post_id: req.params.postId },
            include: [
                {
                    model: User,
                    attributes: ["username", "id"],
                },
                {
                    model: Post,
                    attributes: ["title", "description", "id"],
                }
            ],
        });
        const comments = dbCommentData.map((post) => post.get({ plain: true }));
        res.status(200).send(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        console.log("New Comment", newComment)
        res.json(newComment);
    } catch (err) {
        res.json(err);
    }
});

router.delete("/", async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({ where: { id: req.body.id } });
        res.json(deleteComment);
    } catch (err) {
        res.json(err);
    }
})


module.exports = router;