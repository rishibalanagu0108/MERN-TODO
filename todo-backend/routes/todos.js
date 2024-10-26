const express = require("express");
const app = express();
app.use(express.json());

const { initializeDbAndServer, getDb } = require("../db");

// Initialize the DB

initializeDbAndServer()
  .then(() => {
    const db = getDb();
    // Now you can start using `db`
    app.get("/todos", async (request, response) => {
      const getTodoQuery = `SELECT * FROM todos;`;
      const queryResult = await db.all(getTodoQuery);

      if (queryResult.length === 0) {
        response.send("No rows in the table");
      } else {
        response.json({ todos: queryResult });
      }
    });

    //ADD TODO API
    app.post("/todos", async (request, response) => {
      const { id, title } = request.body;
      const insertTodoQuery = `INSERT INTO todos(id, message) VALUES('${id}', '${title}');`;
      await db.run(insertTodoQuery);
      response.send("Item Added Successfully");
    });

    //UPDATE TODO API
    app.put("/todos/:id", async (request, response) => {
      const { id } = request.params;
      const { message } = request.body;
      try {
        const updateQuery = `UPDATE todos SET message='${message}' WHERE id='${id}';`;
        await db.run(updateQuery);
        response.send("Item Updated Successfully");
      } catch (error) {
        response.status("500");
        response.send("Failed to update the value");
      }
    });

    //DELETE TODO API

    app.delete("/todos/:id", async (request, response) => {
      const { id } = request.params;
      try {
        const deleteTodoQuery = `DELETE FROM todos WHERE id=${id};`;
        await db.run(deleteTodoQuery);
        response.json({ message: "Item Deleted Successfully" });
      } catch (error) {
        response.status(500).json({ message: `${error.message}` });
      }
    });
  })
  .catch((error) => {
    console.error(`Failed to initialize DB: ${error.message}`);
  });

module.exports = app;
