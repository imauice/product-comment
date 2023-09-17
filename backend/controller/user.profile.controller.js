const Profile = require('../model/user.profile');
const fs = require('fs');

module.exports.createProfile = async (req, res) => {
    try {

        let data;

        if (req.file) {
            
            const fileName = req.file.filename;
            const path = '/images/avatar/'+req.file.filename;

            //check exist profile 
            const isExist = await Profile.findOne({ userId: req.user.userId });
            if (isExist) {

                fs.unlink(req.file.path, (err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('deleted');
                    }
                }));

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

        console.log(user);

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