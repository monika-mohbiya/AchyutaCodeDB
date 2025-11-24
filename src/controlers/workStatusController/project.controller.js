import db from './../dbconnection';

export const getPrjName = async (req, res) => {
    const query = 'select * from projectNames';
    db.query(query, (error, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching data");
        } else {
            res.send(result);
        }
    })
}

export const postPrjName = async (req, res) => {
    const { Project_Name } = req.body;
    if (!projectName) {
        return res.status(400).json({ message: "projectName is required" });
    }
    db.query(query, [Project_Name], (error, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error", error: err });
        }

        res.json({
            message: "Project inserted successfully",
            id: result.insertId,
            projectName,
        });

    })
}

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

    db.query(
        sql,
        [project, projectName, startDate, startTime, startAMPM, endDate, endTime, endAMPM],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Database error", details: err });
            return res.json({ message: "Task added successfully", id: result.insertId });
        }
    );
};

export const getCrtTask = async (req, res) => {
    const query = "SELECT * from tasks";

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.status(200).json(results);
    });
};