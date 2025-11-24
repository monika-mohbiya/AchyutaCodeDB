import con from "../controlers/dbconnection.js";

export const getStudents = (req, res) => {
    const query = 'SELECT * FROM students';
    con.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching data");
        } else {
            res.send(result);
        }
    });
};

export const getStudentByfilter = (req, res) => {
    const searchValue = req.params.search;  // ✅ issi ko value milti hai
    console.log("SEARCH VALUE =", searchValue);

    const sql = `
        SELECT * FROM students
        WHERE Sno LIKE ?
        OR Enroll_no LIKE ?
        OR Name LIKE ?
        OR Email_Id LIKE ?
    `;

    const search = `%${searchValue}%`;

    con.query(sql, [search, search, search, search], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // ✅ Always return array (never 404)
        return res.json(result);
    });
};















