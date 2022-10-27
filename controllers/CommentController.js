import Comment from '../models/Comment.js';
export const createComment = async (req, res) => {
  try {
    const com = new Comment({
      itemId: req.params.id,
      text: req.body.text,

      user: req.userId,
    });
    const comment = await com.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Comment is not created',
    });
  }
};
export const getComments = async (req, res) => {
  try {
    const productId = req.params.id;
    const comments = await Comment.find({ itemId: productId });

    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Comments are not found',
    });
  }
};
