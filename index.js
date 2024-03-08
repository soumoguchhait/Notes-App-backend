const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
const notesRouter=require("./Routes/notesRouter")
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ extended: true, limit: "5mb" }));
app.use(cors());
app.use('/notes',notesRouter);
const Port=5000;
const DB_URL="mongodb+srv://soumya:Guchhait8587@soumyadb.wdru3eu.mongodb.net/?retryWrites=true&w=majority&appName=soumyadb";
mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(Port, () => {
      console.log(`connected to database in ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });