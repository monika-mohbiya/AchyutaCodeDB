// import con from "../controlers/dbconnection.js";

// export const apiLogger = (req, res, next) => {
//     const endpoint = req.originalUrl;
//     const sql = "INSERT INTO api_logs (endpoint, hit_time) VALUES (?, NOW())";

//     con.query(sql, [endpoint], (err) => {
//         if (err) console.log("Log Error:", err);
//     });

//     next();
// };
// export default apiLogger;

import con from "../controlers/dbconnection.js";

export const apiLogger = (req, res, next) => {
    const endpoint = req.originalUrl;
    const method = req.method;

    const sql = "INSERT INTO api_logs (endpoint, method) VALUES (?, ?)";

    con.query(sql, [endpoint, method], (err) => {
        if (err) console.log("Log Error:", err);
    });

    next();
};

export default apiLogger;
