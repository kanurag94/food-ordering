exports.allAccess = (req, res) => {
  res.status(200).json("Shop Board.");
};

exports.userBoard = (req, res) => {
  res.status(200).json("User Board.");
};

exports.adminBoard = (req, res) => {
  res.status(200).json("Admin Board.");
};

exports.staffBoard = (req, res) => {
  res.status(200).json("Staff Board.");
};
