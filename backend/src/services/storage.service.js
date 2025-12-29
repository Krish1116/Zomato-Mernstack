const fs = require("fs");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (filePath, fileName) => {
  const response = await client.files.upload({
    file: fs.createReadStream(filePath),
    fileName,
  });
  return response;
};

module.exports = { uploadFile };
