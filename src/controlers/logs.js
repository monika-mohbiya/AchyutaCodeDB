import con from "../controlers/dbconnection.js";
export const getEndpointHitDetails = (req, res) => {
    const sql = `
        SELECT 
            endpoint,
            COUNT(*) AS hits,
            MAX(hit_time) AS last_hit
        FROM api_logs
        GROUP BY endpoint
        ORDER BY hits DESC
    `;

    con.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
};
