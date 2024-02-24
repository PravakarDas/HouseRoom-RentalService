const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

// config multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// User Registration
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        // Extract user information from the registration form
        const { firstName, lastName, email, password } = req.body;

        // Check if a profile image was uploaded
        const profileImage = req.file;
        if (!profileImage) {
            return res.status(400).send("No File Uploaded");
        }

        // Path to the uploaded profile photo
        const profileImagePath = profileImage.path;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: "User Registration Successful!!", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Registration Failed!", error: err.message });
    }
});

module.exports = router;
