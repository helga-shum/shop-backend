import Comment from '../models/Comment.js';
export const createComment = async (req, res) => {
  try {
    const com = new Comment({
      text: req.body.text,
      postId: req.body.postId,
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
