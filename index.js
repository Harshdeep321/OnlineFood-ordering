import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"

const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }))

//dealing with frontend for deployment
app.use(express.static(path.join(__dirname,"./frontend/build")));
app.get('*',function(_,res){
  res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
    res.status(500).send(err);
  })
})

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database")
  })
  .catch((err) => {
    console.log(err)
  })

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
})

//model
const userModel = mongoose.model("user", userSchema)


//api
app.get("/", (req, res) => {
  res.send("server is running")
})

//signup api
app.post("/signup", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email }).exec();
    console.log("result :" + result);

    if (result) {
      res.send({ message: "Email id is already register", alert: false })
    }
    else {
      const data = userModel(req.body)
      const save = data.save()
      res.send({ message: "Successfully sign up", alert: true })
    }
  } catch (error) {
    console.error("Error during findOne:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//login api
app.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  //find by email
  const result = await userModel.findOne({ email: email }).exec();

  if (result) {

    if(password === result.password){

      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };

      console.log(dataSend);

      res.send({
        message: "Login Successfully",
        alert: true,
        data: dataSend,
      });
    }
    else{
      // Password does not match
      res.send({
        message: "Incorrect password",
        alert: false,
      });
    }

  }
  else {
    // User not found
    res.send({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
})



//product section

const schemaProduct = mongoose.Schema({
  name : String,
  category : String,
  image : String,
  price : String,
  description : String,
});

const productModel = mongoose.model("product",schemaProduct)

//save product in database
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const dataSave = await data.save()
  res.send({message : "Upload Successfully"})
})

//get products
app.get("/product",async(req,res)=>{
  const data =await productModel.find({})
  res.send(JSON.stringify(data));
})

app.listen(PORT, () => {
  console.log("server is running at port:" + PORT)
})