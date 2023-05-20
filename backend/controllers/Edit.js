const UserModel = require("../model/UserModel");

const editUser = async (req, res) => {
  try {
    const { name, email, gender, status } = req.body;
    const id = req.params.id;
    let updatedData = {};
    if (email) {
      updatedData.email = email;
    }
    if (name) {
      updatedData.name = name;
    }
    if (gender) {
      updatedData.gender = gender;
    }
    if (status) {
      updatedData.status = status;
    }
    let user = await UserModel.findByIdAndUpdate(id , updatedData);
    res.status(201).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", success: false });
  }
};

module.exports = editUser;
