import express from "express";
import cors from "cors";
import meetingRoutes from "./routes/meetingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Meeting Slot Finder API is running...",
  });
});

app.use("/api/meetings", meetingRoutes);

export default app;