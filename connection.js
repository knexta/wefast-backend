import mongoose from "mongoose";

export const mongo = async() => {            //connection to mongodb from mongoose
    try {
      await  mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
    }
    catch (err) {
        process.exit()
    }
}