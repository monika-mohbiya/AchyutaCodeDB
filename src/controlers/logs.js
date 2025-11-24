import con from "../controlers/dbconnection.js"; // Promise pool

export const getEndpointHitDetails = async (req, res) => {
    const sql = `
        SELECT 
            endpoint,
            COUNT(*) AS hits,
            MAX(hit_time) AS last_hit
        FROM api_logs
        GROUP BY endpoint
        ORDER BY hits DESC
    `;

    try {
        const [rows] = await con.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};
