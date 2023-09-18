const Profile = require('../model/user.profile');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatar');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.fieldname + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 50 * 1000 } });

const cpUpload = upload.single('avatar');

module.exports.createProfile = async (req, res) => {
    try {

        cpUpload(req, res, async (error) => {

            if (error instanceof multer.MulterError) {

                console.log(error.message);
                return res.status(400).send({message:error.message});

            } else {

                let data;

                if (req.file) {
                   
                    const fileName = req.file.filename;
                    const path = '/images/avatar/' + req.file.filename;

                    //check exist profile 
                    const isExist = await Profile.findOne({ userId: req.user.userId });
                    if (isExist) {
                        console.log('exist')
                        fs.unlink(req.file.path, (err => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('deleted');
                            }
                        }));
                        console.log('return');
                        return res.status(403).send({ message: 'Profile already exists' });

                    } else {

                        data = {
                            userId: req.user.userId,
                            name: req.body.name,
                            avatar: {

                                id: fileName,
                                url: path

                            }
                        }

                        console.log(data);
                    }

                } else {

                    data = {
                        userId: req.user.userId,
                        name: req.body.name,
                        avatar: {

                            id: "1694863336986-354375360-avatar-2e5cccedf66e4c1894f649192615f6cb-512x512.jpeg",
                            url: "/images/avatar/1694863336986-354375360-avatar-2e5cccedf66e4c1894f649192615f6cb-512x512.jpeg"

                        }
                    }
                }

                //create profile
                const profile = new Profile(data);
                const result = await profile.save();

                if (result) {
                    return res.status(200).send({ message: "created profile successfully", data: result })
                } else {
                    return res.status(400).send({ message: "create profile failed" });
                }
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}

//get profile
module.exports.getProfile = async (req, res) => {

    try {

        const pipeline = [
            {
                $match: { userId: req.user.userId }
            }
        ]

        const user = await Profile.aggregate(pipeline);


        if (user.length > 0) {

            return res.status(200).send({ message: "Get profile successfully", data: user });

        } else {

            return res.status(200).send({ message: "User not found" });

        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }

}