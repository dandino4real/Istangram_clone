import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URL, PORT} from './config';
import userRoute from './routes/userRoute';


// Create a new express application instance
const app = express();

//middleware
app.use(express.json());


//router middleware
app.use('/users', userRoute)


mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
  .then(() => { console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  