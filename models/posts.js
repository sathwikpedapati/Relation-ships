const mongoose= require("mongoose");
async function main(){
    await mongoose.connect("mongodb://localhost:27017/ola");
}
main()
.then(()=>{
    console.log("connection successfully");
})
.catch((err)=>{
    console.log(err);
});
const userschema= new mongoose.Schema({
    username:String,
    email:String
});
const postschema=new mongoose.Schema({
    content:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});
const user=mongoose.model("user",userschema);
const post=mongoose.model("post",postschema);
// const data= async()=>{
//     let user2=await user.findOne({username:"sathwik"})
//     let post2= new post({
//         content:"something",
//         likes:65
//     });
//     post2.user=user2;
//     await post2.save();
// };
// data();
const getdata= async()=>{
    let res = await post.find({}).populate("user");
    console.log(res[0]);
};
getdata();