const express = require("express");
const app = express();
const port = 3000;
const rootRouter = require("./Routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter)

app.listen(port, () => `Server is running at ${port}`);
