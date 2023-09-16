const { Comment } = require('../model/comment');

module.exports.create = async (req, res) => {
    try {

        const data = {
            productId: req.params.id,
            userId: req.user.userId,
            comment: req.body.comment
        }

        const comment = new Comment(data);
        const result = await comment.save();

        if (result) {
            return res.status(200).send({ message: "created comment successfully", data: result });
        } else {
            return res.status(400).send({ message: "error creating comment" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error',error:error.message });
    }
}