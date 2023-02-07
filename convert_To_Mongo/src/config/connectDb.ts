import mongoose, { type ConnectOptions } from "mongoose";
import { config } from "dotenv";

config();
const uri = String(process.env.URI);

const connectDb = async () => {
  try {
    const res = mongoose.connect(
      uri,
      {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
      (err: any) => {
        if (!err) {
          console.log("connected to database");
		  return;
        }

        console.log("error in connecting to db");
      })
	  return;

  } catch (err: unknown) {
	// console.log(err)
    return "error in connection";
  }
};

export default connectDb;
