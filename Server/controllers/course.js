const AWS = require("aws-sdk");
const nanoid = require("nanoid");
const Buffer = require("buffer").Buffer;
const  slugify = require('slugify')
const Course = require('../models/course')

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);
const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("no image");

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];
    const params = {
      Bucket: "descdmy-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        return res.sendStatus(400);
      }

      return res.send(data);
    });
  } catch (err) {
    console.log("UPLOAD IMAGE ERR=>", err);
    return res.status(400).send("upload image fill try agin");
  }
};

const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("no image");
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.status(200).send(data);
    });
  } catch (err) {
    console.log("REMOVE IMAGE ERR=>", err);
    return res.status(400).send("remove image fill try agin");
  }
};

const createCourse = async (req, res)=>{
  try{
    const {name} = req.body
     const alreadyExist = await Course.findOne({slug:slugify(name.toLowerCase())})
     if(alreadyExist) return res.status(400).send('title is taken')

     const course = await new Course({
      slug: slugify(name),
      instructor: req.auth.id,
      ...req.body
     }).save()
     return res.status(200).json(course)
  }catch(err){
    console.log('CREATE COURSE =>',err);
  }
}

const getCourse = async (req, res)=>{
  try{
    const course = await Course.findOne({slug: req.params.slug}).populate('instructor', '_id name').exec()
    res.status(200).json(course)
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  uploadImage,
  removeImage,
  createCourse,
  getCourse,
};
