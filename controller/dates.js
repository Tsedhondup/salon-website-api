const fs = require("fs");

// Saving date
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

// Process date
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

processDate();
