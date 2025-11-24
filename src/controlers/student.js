import con from "../controlers/dbconnection.js"; // Promise pool

// Get all students
export const getStudents = async (req, res) => {
    try {
        const [result] = await con.query('SELECT * FROM students');
        res.json(result);
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).send("Error fetching data");
    }
};

// Get students by filter
export const getStudentByfilter = async (req, res) => {
    const searchValue = req.params.search;
    console.log("SEARCH VALUE =", searchValue);

    const sql = `
        SELECT * FROM students
        WHERE Sno LIKE ?
        OR Enroll_no LIKE ?
        OR Name LIKE ?
        OR Email_Id LIKE ?
    `;

    const search = `%${searchValue}%`;

    try {
        const [result] = await con.query(sql, [search, search, search, search]);
        res.json(result);
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};
