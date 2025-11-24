import con from "../controlers/dbconnection.js";

// API Logger middleware
export const apiLogger = async (req, res, next) => {
    const endpoint = req.originalUrl;
    const method = req.method;

    const sql = "INSERT INTO api_logs (endpoint, method, hit_time) VALUES (?, ?, NOW())";

    try {
        await con.query(sql, [endpoint, method]);
    } catch (err) {
        console.error("Log Error:", err.message);
    }

    next();
};

export default apiLogger;
