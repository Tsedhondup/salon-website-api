require("dotenv").config();

// CREDENTIALS
const accSid = process.env.ACCOUNT_SID;
const authToken = process.AUTH_TOKEN;
const adminNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken); // Initialize twillio client

// Call backs
const sendtoCLient = (res, req) => {
  client.messages
    .create({
      body: req.body.messageToClient,
      from: adminNumber,
      to: req.body.clientNumber,
    })
    .then((message) => {
      res.status(200).json({ messageBody });
      console.log(message);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
      console.error(error);
    });
};
const sendtoMerchant = (res, req) => {
  client.messages
    .create({
      body: req.body.messageToMerchant, // this body to subject to change, custom message in back-end recommended
      from: adminNumber,
      to: req.body.clientNumber,
    })
    .then((message) => {
      res.status(200).json({ messageBody });
      console.log(message);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
      console.error(error);
    });
};

const sendText = (res, req) => {
  //(a) Send greeting and confirmation messation client
  sendtoCLient(res, req);
  //(b) Send appointment notification to admin/salon
  sendtoMerchant(res, req);
};
module.exports = {
  sendText,
};
