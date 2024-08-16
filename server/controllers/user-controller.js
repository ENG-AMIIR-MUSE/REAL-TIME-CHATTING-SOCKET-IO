import User from "../models/user-model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    console.log("hellow");
    const loggedInUserId = req.user._id;
    console.log("Logged Users", loggedInUserId);

    const filteredUsers = await User.find({}).select("-password");
    console.log("filtered", filteredUsers);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUser = async (req, res, id) => {
  try {
    // console.log("hellow");
    const loggedInUserId = req.user._id;
    // console.log("Logged Users", loggedInUserId);

    const filteredUsers = await User.find({ _id: id }).select("-password");
    // console.log("filtered", filteredUsers);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
