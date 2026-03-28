import sendemail from "../services/emailsend.services.js";
import isValidEmail from "../services/emailTest.services.js";

export const handleSendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) return res.status(400).json({ message: "All three fields are required" });

    if (!isValidEmail(email)) return res.status(400).json({ message: "Please enter a Valid email" });

    await sendemail(name, email, message);

    return res.status(200).json({ message: "Thanks for messaging!" });
  } catch (error) {
    console.error("Error saving email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
