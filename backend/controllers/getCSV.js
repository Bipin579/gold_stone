const UserModel = require("../model/UserModel");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

const getCSV = async (req, res) => {
  try {
    // Find all users from the database
    const users = await UserModel.find();

    // Define the CSV writer and the file path
    const csvWriter = createCsvWriter({
      path: "user_master.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "gender", title: "Gender" },
        { id: "status", title: "Status" },
        { id: "createdAt", title: "Created At" },
        { id: "updatedAt", title: "Updated At" },
      ],
    });

    // Map the user data to match the CSV header fields
    const records = users.map((user) => ({
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    // Write the records to the CSV file
    await csvWriter.writeRecords(records);

     // Read the CSV file data
     const filePath = __dirname + '/../user_master.csv';
     const csvData = fs.readFileSync(filePath, 'utf8');
 
     // Set the appropriate headers for the CSV response
     res.setHeader('Content-Type', 'text/csv');
     res.setHeader('Content-Disposition', 'attachment; filename=user_master.csv');
 
     // Send the CSV data as a response to the frontend
     res.send(csvData);
  } catch (error) {
    console.error("Error exporting User Master data:", error);
    res.status(500).send("Error exporting User Master data");
  }
};

module.exports = getCSV;
