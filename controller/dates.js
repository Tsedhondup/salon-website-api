const fs = require("fs");

// Saving date
const saveDate = (date) => {
  try {
    const data = fs.readFileSync("../data/date.json", "utf8");
    console.log("day:", JSON.parse(data).day);
  } catch (err) {
    console.error("Error reading file:", err);
  }
};
// Arrow function to get the current date in Unix format and store in JSON file
const saveDateToJSON = (res, req) => {
  const currentDate = new Date(); // Get current date
  const unixTime = Math.floor(currentDate.getTime() / 1000); // Convert to Unix time
  const milliseconds = currentDate.getTime(); // Convert to milliseconds
  const readableDate = currentDate.toISOString(); // Human-readable format
  const day = currentDate.toLocaleString("en-US", { weekday: "long" }); // Get day

  // Create date object
  const dateObject = {
    unixTime,
    milliseconds,
    readableDate,
    day,
  };

  // Write to JSON file
  fs.writeFileSync("../data/date.json", JSON.stringify(dateObject, null, 2));

  console.log("Date saved successfully:", dateObject);
};

// Call function
// saveDateToJSON();
saveDate();
