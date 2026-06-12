const mongoose= require("mongoose");
async function main(){
    await mongoose.connect("mongodb://localhost:27017/relation");
}
main()
.then(()=>{
    console.log("connection successfully");
})
.catch((err)=>{
    console.log(err);
});
const newschema= new mongoose.Schema({
    username:String,
    address:[{
        _id:false,
        location:String,
        city:String
}]
});
const user=mongoose.model("user",newschema);
const adduser=async()=>{
  let user1 = new user({
    username:"sathwik",
    address:[{
        location:"chodavaram",
        city:"Anakapalli"
    }]
  })
  user1.address.push({location:"govada",city:"anakapalli"});
  let result= await user1.save();
  console.log(result);
}
adduser();