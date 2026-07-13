import "dotenv/config";
// dotenv.config({ path: ".env"});

import { app } from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {

    console.log(`Server is runnig on port ${port}`);

});