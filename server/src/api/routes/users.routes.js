const express = require("express");
const router = express.Router()
const { addUser, login, getProfile, deleteUser, getUserbyId } = require("../controllers/users.controllers")
const upload = require("../../middleware/upload")
const { isAuth, isAdmin } = require("../../middleware/auth")

router.post("/add", addUser);
console.log(addUser)
router.post("/login", login);
router.get("/profile", [isAuth], getProfile);
router.delete("deleteUser/:id", [isAdmin], deleteUser);
router.get("/getById/:id", getUserbyId)


module.exports = router