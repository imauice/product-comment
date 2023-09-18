const Product = require('../model/product');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 150 * 1000 } });

const cpUpload = upload.single('productImage');

//get all

module.exports.getAll = async (req, res) => {
    try {
        const pipeline = [
            { $match: {} },
            { $addFields: { id: { $toString: "$_id" } } },
            {
                $lookup:
                {
                    from: "comments",
                    localField: "id",
                    foreignField: "productId",
                    as: "comments",

                }
            },

            {
                $unwind: {
                    path: "$comments",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $addFields: { commentUserId: "$comments.userId" }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "commentUserId",
                    foreignField: "userId",
                    as: "user",
                }
            },
            {
                $group: {
                    _id: ["$_id"],
                    productName: { $first: "$productName" },
                    imgUrl: { $first: "$imgUrl" },
                    productDescription: { $first: "$productDescription" },
                    date: { $first: "$createdAt" },
                    comments: {
                        $push: {
                            comment: "$comments.comment",
                            date: "$comments.createdAt",
                            userName: "$user.name",
                            userAvatar: "$user.avatar",

                        }
                    }
                }
            },
            {
                $sort: { "date": -1 }
            }


        ]
        const product = await Product.aggregate(pipeline);

        if (product.length > 0) {

            return res.status(200).send({ message: "Get product successfully", data: product });

        } else {
            return res.status(200).send({ message: "Product not found" });

        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message })
    }
}


//create
module.exports.createProduct = async (req, res) => {
    try {

        cpUpload(req, res, async (error) => {

            if (error instanceof multer.MulterError) {
                console.error(error.message);
                return res.status(400).send({ message: error.message });
            } else {

                const imgUrl = '/images/products/' + req.file.filename;

                const data = {
                    productName: req.body.productName,
                    productDescription: req.body.productDescription,
                    imgUrl: imgUrl,
                }
                const product = new Product(data);
                const result = await product.save();

                if (result) {
                    return res.status(200).send({ message: "create product successfully", data: result });
                } else {
                    return res.status(400).send({ message: "create product failed" });
                }

            }

        })


    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });

    }
}

module.exports.deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }



        const result = await Product.findByIdAndDelete(req.params.id, { includeResultMetadata: true });

        if (result && result.ok) {
            return res.status(200).send({ message: "Product deleted" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}