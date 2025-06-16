const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post("/send-to-antares", async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(
      "https://platform.antares.id:8443/~/antares-cse/antares-id/sektor16/MONITORING_PLTS",
      data,
      {
        headers: {
          "X-M2M-Origin": "734bbec3d3ff38cc:8dc0845904c1c744",
          "Content-Type": "application/json;ty=4",
          "Accept": "application/json"
        }
      }
    );

    res.status(200).json({ status: "success", antares_response: response.data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Antares Middleware is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
