require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes=require("./routes/stripepayment");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    //env is file we create
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => console.log("opps failed to connect database"));

//this is my middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
//Stripe route
app.use("/api", stripeRoutes);


//PORT
const port = process.env.PORT || 8000;
//Starting my server
const server = app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

//Socket programming
const io = require("socket.io")(server);

const admin=io.of("/admin")
const order=io.of("/order")

admin.on("connection", (socket) => {
  console.log("admin connected");
  socket.on("statusUpdated",({orderId})=>{
    order.to(orderId).emit("currentStatus",{
      value:"hiiiiiii"
    })
  })
});  


order.on("connection",(socket)=>{
  console.log("order");
  socket.on("joinroom",({orderId})=>{
    socket.join(orderId);
  })
  admin.emit("OrderReceived",{
    value:"hii order placed"
  }); 
})
