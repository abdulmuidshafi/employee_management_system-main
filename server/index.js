import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import userRoute from "./routes/UserRoute.js";
import employeeRoutes from './routes/emloyeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js'
import PayrollRoutes from './routes/PayrollRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import { errorMiddleWare } from "./middleWare/errorMiddleWare.js";
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
//console.log("hi");
app.use("/api/user", userRoute ); 
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves',leaveRoutes)
app.use('/api/attendances', attendanceRoutes);
app.use('/api/payrolles', PayrollRoutes);
app.use('/api/performances', performanceRoutes);
app.use(errorMiddleWare);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log(`Server Running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
