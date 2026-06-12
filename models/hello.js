const mongoose= require("mongoose");
async function main(){
    await mongoose.connect("mongodb://localhost:27017/joe");
}
main()
.then(()=>{
    console.log("connection successfully");
})
.catch((err)=>{
    console.log(err);
});
const orderschema= new mongoose.Schema({
    item:String,
    price:Number
});
const customerschema=new mongoose.Schema({
    name:String,
    orders:[{
        type :mongoose.Schema.Types.ObjectId, 
        ref:"order",
   }],
});
// customerschema.pre("findOneAndDelete",async()=>{
//     console.log("pre middleware");
// });
const order=mongoose.model("order",orderschema);
const customer=mongoose.model("customer",customerschema);
customerschema.post("findOneAndDelete",async(customer)=>{
    if(customer.orders.length){
        let res=await order.deleteMany({_id:{$in:customer.orders}});
        console.log(res);
    }
});
const addorder=async()=>{
    let res= await order.insertMany([
        {item:"somosa",price:12},
        {item:"bajji",price:15},
        {item:"chips",price:20}
        ]);
    // console.log(res);
};
// addorder();
// const findcustomers = async()=>{
//     // let customer1= new customer({
//     //     name:"sathwik"});
//     // let order1=await order.findOne({item:"bajji"});
//     // let order2=await order.findOne({item:"chips"});
//     //  customer1.orders.push(order1);
//     //  customer1.orders.push(order2);
//     let res= await customer.find({}).populate("orders");
//     console.log(res[0]);
// };
const addcustomer=async()=>{
    let newcust=new customer({
        name:"siddhu"
    });
    let neworder=new order({
        item:"pizza",
        price:90
    });
    newcust.orders.push(neworder);
    await newcust.save();
    await neworder.save();
    console.log(newcust);
}
addcustomer();
// findcustomers();
const delcustomers=async()=>{
    await customer.deleteMany({name:"siddhu"});
    console.log(customer);
}
delcustomers();