import express from "express";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import cartRouter from './routes/cartRoutes'

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.listen(PORT, () => { console.log(`Server Listening on port ${PORT}`) });
