import Product from '../models/Product.js';

export const getAll = async (req, res) => {
  try {
    var sortObject = {};
    var field = {};

    const sortWith = req.query.sortBy;
    const categoryId = req.query.category;
    if (categoryId) {
      field.category = categoryId;
    }
    const { page, limit } = req.query;
    const search = req.query.search;
    sortObject[sortWith] = 1;

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
// export const getPopularPosts = async (req, res) => {
//   try {
//     const sort = req.params.sort;
//     const category = req.params.category;
//     const search = req.params.search;
//     const pro = await Product.find({}).sort({ viewsCount: -1 });
//     res.json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Can not get popular posts',
//     });
//   }
// };

// export const getOne = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     Product.findOneAndUpdate(
//       {
//         _id: id,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: 'after',
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: 'Product is not returned',
//           });
//         }
//         if (!doc) {
//           return res.status(404).json({
//             message: 'Product is not found',
//           });
//         }
//         res.json(doc);
//       },
//     ).populate('user');
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Post is nit created',
//     });
//   }
// };

// export const getNewPosts = async (req, res) => {
//   try {
//     const posts = await Product.find({}).sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Can not get new posts',
//     });
//   }
// };
