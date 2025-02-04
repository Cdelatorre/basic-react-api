const User = require("../models/User.model");

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .populate("posts")
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.edit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.status(200).json(user))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(next);
};
