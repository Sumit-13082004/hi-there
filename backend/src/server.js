import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env"});

import express from "express";

const app = express();
const port = process.env.PORT;

app.listen(port, () => {

    console.log(`Server is runnig on port ${port}`);

});