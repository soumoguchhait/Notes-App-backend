const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
require("dotenv").config();
const app=express();
const notesRouter=require("./Routes/notesRouter")
const userRoutes=require(`./Routes/userRoutes`)
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ extended: true, limit: "5mb" }));
app.use(cors());
app.use('/notes',notesRouter);
app.use('/user',userRoutes);
const Port=process.env.PORT;

const DB_URL=process.env.DB_Url;


mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(Port, () => {
      console.log(`connected to database in ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log(Port)
  });