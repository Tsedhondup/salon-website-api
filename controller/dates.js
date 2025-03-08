const fs = require("fs");

// SAVE DATE
const saveDate = (newDate) => {
  try {
    const dates = fs.readFileSync("../data/date.json", "utf8");

    // Check JSON file contain any special dates
    if (JSON.parse(dates).length > 0) {
      // Parse JSON date data
      const parsedDate = JSON.parse(dates);
      // Create new Date Array
      const newDateArray = [...parsedDate, newDate];
      // Update JSON file containing special dates
      fs.writeFileSync("../data/date.json", JSON.stringify(newDateArray));
      return;
    } else {
      const newDateArray = [newDate];
      fs.writeFileSync("../data/date.json", JSON.stringify(newDateArray));
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
};
// UPDATE DATE JSON FILE
const upDateDates = (dateToBeChanged) => {
  try {
    const dates = fs.readFileSync("../data/date.json", "utf8");

    // Parse JSON date data
    const parsedDate = JSON.parse(dates);
    // Find matched date, update and saved new lists of date in new Array
    const updatedDates = parsedDate.map((dateObject) => {
      if (dateObject.readableDate === dateToBeChanged.requestedDate) {
        dateObject.status = dateToBeChanged.status;
        dateObject.message = dateToBeChanged.message;
      }
      return dateObject;
    });
    // Update JSON file containing special dates by overiding with new dates
    fs.writeFileSync("../data/date.json", JSON.stringify(updatedDates));
  } catch (err) {
    console.error("Error reading file:", err);
  }
};
// PROCESS DATE

const processDate = (res, req) => {
  const currentDate = new Date(); // Get current date
  const unixTime = Math.floor(currentDate.getTime() / 1000); // Convert to Unix time
  const milliseconds = currentDate.getTime(); // Convert to milliseconds
  const readableDate = currentDate.toLocaleString(); // Human-readable format
  const day = currentDate.toLocaleString("en-US", { weekday: "long" }); // Get day

  // Create date object
  const dateObject = {
    unixTime,
    milliseconds,
    readableDate,
    day,
  };

  // Write to JSON file
  saveDate(dateObject);
};

// processDate();

const sampleDate = {
  requestedDate: "2025-03-08, 10:33:25 a.m.",
  status: "closed",
  message: "Losar",
};
upDateDates(sampleDate);
