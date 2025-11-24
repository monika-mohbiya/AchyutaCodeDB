import con from "../controlers/dbconnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// dotenv.config();

export const postRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";

        con.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error registering user" });
            }
            return res.status(201).json({ message: "✅ User registered successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const postLogin = async (req, res) => {

    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";

    con.query(query, [username], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "✅ Login successful",
            token,
        });
    });
};


export const getProfile = async (req, res) => {
    res.json({
        message: "Protected route accessed!",
        user: req.user
    });
};
