import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);// this option will be useful when working with search functionality

    mongoose.connect(url)// connect to DB
    .then(() => console.log('MongoDB is connected voila'))
    .catch((err) => console.log(err))
}

export default connectDB;