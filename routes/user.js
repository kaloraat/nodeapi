const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
// photo
router.get("/user/photo/:userId", userPhoto);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
