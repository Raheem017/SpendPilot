const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDB();

const auditRoutes = require("./routes/auditRoutes");

app.use("/api", auditRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
