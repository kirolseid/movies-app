const AppError = require("../utils/AppError");
const { catchAsyncError } = require("../utils/catchAsync");
const fetch = require('node-fetch');

// create
exports.createOne = (model) => {
  return catchAsyncError(async (req, res) => {
    let document = new model(req.body);
    await document.save();
    res.status(201).json({ success: true, message: "Success Added", document });  
  });
};

// get all

exports.getAll = (model) => {
  return catchAsyncError(async (req, res) => {
    const document = await model.find({});
    res.status(200).json({ success: true, document });
  });
};

// get specific
exports.getOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await model.findById(id);
    if (!document) return next(new AppError("document not found", 400));
    res.status(200).json(document);
  });
};



// update
exports.updateOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (!document) {
      return next(new AppError("document not found", 400));
    }
    res.status(200).json({ success: true, message: "Success Updated", result: document });
  });
};


// delete
exports.deleteOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError("Document not found", 400));
    }
    res
      .status(200)
      .json({ success: true, message: "Success Deleted", result: document });
  });
};


// fetch api
exports.getFromAPi = async(title)=>{
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.imdb_api_key
    }
  };
  const response = await fetch(url, options);
  const json = await response.json();
  let movie =json.results[0]


return movie
}