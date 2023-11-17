
// 3.2 Working with Objects
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

// 3.3 Working with Arrays
const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {
  // Setup
  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5");
  });

  // 3.1.1 Path Parameters
  app.get("/a5/add/:a/:b", (req, res) => {
    const {a, b} = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  app.get("/a5/subtract/:a/:b", (req, res) => {
    const {a, b} = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });

  // 3.1.2 Query Parameters
  app.get("/a5/calculator", (req, res) => {
    const {a, b, operation} = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });

  // 3.2 Working with Objects
  // 3.2.1 Retrieving Objects from a Server
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  // 3.2.2. Retrieving Object Properties from a Server
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // 3.2.3 Modifying Objects in a Server
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const {newTitle} = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // 3.2.4 Extra Credit
  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const {newScore} = req.params;
    assignment.score = newScore;
    res.json(assignment);
  });

  app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
    const {newCompleted} = req.params;
    assignment.completed = newCompleted;
    res.json(assignment);
  });

  // 3.3 Working with Arrays
  // 3.3.1 Retrieving Arrays
  app.get("/a5/todos", (req, res) => {

    // 3.3.3 Filtering array items using a query string - Fixed with Professor - code in assignment not working
    const { completed } = req.query;
    if (completed !== undefined) {
      const c = completed === "true";
      const completedTodos = todos.filter(
          (t) => t.completed === c);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  // 3.5.1 Posting data in an HTTP Body
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // 3.3.4 Creating new Items in an Array
  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });


  // 3.3.2 Retrieving an Item from an Array by ID
  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // 3.5.2 Deleting data
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));

    // 3.5.4 Extra credit - Handling Errors
    if (!todo) {
      res.res
          .status(404)
          .json({ message:
                `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  // 3.3.5 Deleting an Item from an Array
  // app.get("/a5/todos/:id/delete", (req, res) => {
  //   const { id } = req.params;
  //   const todo = todos.find((t) => t.id === parseInt(id));
  //   todos.splice(todos.indexOf(todo), 1);
  //   res.json(todos);
  // });

  // 3.5.3 Updating Todo
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));

    // 3.5.4 Extra credit - Handling Errors
    if (!todo) {
      res.res
          .status(404)
          .json({ message:
                `Unable to update Todo with ID ${id}` });
      return;
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });



  // 3.3.6 Updating an Item in an Array
  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  // 3.3.7 Extra Credit
  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
  });

  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });


}
export default Lab5;