import db from './../dbconnection.js'; // Promise pool

// Get all project names
export const getPrjName = async (req, res) => {
    const query = 'SELECT * FROM projectNames';
    try {
        const [result] = await db.query(query);
        res.json(result);
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).send("Error fetching data");
    }
};

// Add a new project name
export const postPrjName = async (req, res) => {
    const { Project_Name } = req.body;
    if (!Project_Name) {
        return res.status(400).json({ message: "Project_Name is required" });
    }

    const query = 'INSERT INTO projectNames (Project_Name) VALUES (?)';

    try {
        const [result] = await db.query(query, [Project_Name]);
        res.json({
            message: "Project inserted successfully",
            id: result.insertId,
            projectName: Project_Name,
        });
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ message: "Database Error", error: err.message });
    }
};

// Create a task
export const postCrtTask = async (req, res) => {
    const {
        project,
        projectName,
        startDate,
        startTime,
        startAMPM,
        endDate,
        endTime,
        endAMPM
    } = req.body;

    const sql = `
        INSERT INTO tasks 
        (project_id, project_name, start_date, start_time, start_ampm, end_date, end_time, end_ampm)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(sql, [
            project, projectName, startDate, startTime, startAMPM,
            endDate, endTime, endAMPM
        ]);
        res.json({ message: "Task added successfully", id: result.insertId });
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ error: "Database error", details: err.message });
    }
};

// Get all tasks
export const getCrtTask = async (req, res) => {
    const query = "SELECT * FROM tasks";
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ message: "Database error" });
    }
};
