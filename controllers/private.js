const User = require("../models/User");

exports.getPrivateData = async (req, res, next) => {
  const user = req.user;
  res.status(200).send(user);
};

exports.editDetails = async (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (!err) {
      res.status(200).json({ success: true, message: "Edited the item" });
    } else {
      console.log(err);
      res.status(500).json({ success: false, message: "Can't edit the item" });
    }
  });
};
