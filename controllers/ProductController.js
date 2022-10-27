import Comment from '../models/Comment.js';
import Product from '../models/Product.js';
import { getComments } from './CommentController.js';

export const getAll = async (req, res) => {
  try {
    var sortObject = {};
    var field = {};

    const sortWith = req.query.sortBy;
    const categoryId = req.query.category;
    const { size, fabric, brand, highPrice, lowPrice, search, page, limit } = req.query;
    const brandArr = brand.split(',');
    const fabricArr = fabric.split(',');
    const sizeArr = size.split(',');

    sortObject[sortWith] = 1;
    if (search) {
      field.title = { $regex: `${search}`, $options: 'i' };
    }
    if (categoryId) {
      field.category = categoryId;
    }
    field.price = { $gt: lowPrice, $lte: highPrice };
    field.fabric = { $in: fabricArr };
    field.brand = { $in: brandArr };
    field.sizes = { $all: sizeArr };

    const products = await Product.find(field)
      .sort(sortObject)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can not get products',
    });
  }
};
export const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ order_number: -1 }).limit(3).exec();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can not get popular products',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne(
      {
        _id: productId,
      },
      // (err, doc) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).json({
      //       message: 'Product is not returned',
      //     });
      //   }
      //   if (!doc) {
      //     return res.status(404).json({
      //       message: 'Product does not exist',
      //     });
      //   }
      // },
    );
    const comments = await Comment.find({ itemId: productId }).populate('user').exec();
    res.json({ comments, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Product is not found',
    });
  }
};
