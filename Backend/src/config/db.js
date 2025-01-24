import mongoose from "mongoose";


const connectDb= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected to ${conn.connection.host}`);
    } catch (error) {
        console.log("error in database connection", error);
    }
}

export default connectDb;