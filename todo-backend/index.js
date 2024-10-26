const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todos");

const app = express();

const PORT = process.env.PORT || 5000;
console.log(PORT);
//MiddleWare

app.use(cors());
app.use(express.json());

//Routes
app.use("/api", todosRouter);

//Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
