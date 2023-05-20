const UserModel = require("../model/UserModel");

// get users

const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.status(201).json({ users, success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", success: false });
  }
};


// post users
const postAllUser = async (req, res) => {
  try {
    await UserModel.insertMany([
        {
          name: "Akshat Bharadwaj",
          email: "bharadwaj_akshat@kub-pouros.test",
          gender: "male",
          status: "active",
        },
        {
          name: "Achalesvara Panicker",
          email: "achalesvara_panicker@weber.example",
          gender: "male",
          status: "active",
        },
        {
          name: "Lai Deshpande DVM",
          email: "lai_deshpande_dvm@wisoky-rowe.example",
          gender: "female",
          status: "inactive",
        },
        {
          name: "Dr. Daevika Johar",
          email: "daevika_dr_johar@jacobson-runolfsdottir.test",
          gender: "female",
          status: "inactive",
        },
        {
          name: "Gandharva Gill JD",
          email: "gandharva_jd_gill@hand-mclaughlin.example",
          gender: "female",
          status: "active",
        },
        {
          name: "Anwesha Mukhopadhyay",
          email: "anwesha_mukhopadhyay@beatty-nienow.example",
          gender: "male",
          status: "inactive",
        },
        {
          name: "Bhadra Banerjee",
          email: "bhadra_banerjee@hirthe-miller.example",
          gender: "male",
          status: "inactive",
        },
        {
          name: "Puneet Joshi",
          email: "joshi_puneet@lubowitz-runolfsson.example",
          gender: "female",
          status: "active",
        },
        {
          name: "Kanak Prajapat",
          email: "prajapat_kanak@morissette.example",
          gender: "male",
          status: "inactive",
        },
        {
          name: "Shreya Rana",
          email: "shreya_rana@kemmer-prohaska.example",
          gender: "male",
          status: "active",
        },
      ]);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", success: false });
  }
};

module.exports = { getAllUser,postAllUser };


