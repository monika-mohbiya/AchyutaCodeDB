import con from "../controlers/dbconnection.js"; // Promise pool
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const postRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";

        // Use async/await instead of callback
        await con.query(query, [username, hashedPassword]);
        res.status(201).json({ message: "✅ User registered successfully" });

    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login user
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";

    try {
        const [rows] = await con.query(query, [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "✅ Login successful",
            token,
        });

    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Protected route example
export const getProfile = async (req, res) => {
    res.json({
        message: "Protected route accessed!",
        user: req.user
    });
};
