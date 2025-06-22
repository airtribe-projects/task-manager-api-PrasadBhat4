const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const VALID_PRIORITIES = ["low", "medium", "high"];

let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "medium",
    createdAt: new Date(),
  },
];

let nextId;
if (tasks.length === 0) {
  nextId = 1;
} else {
  nextId = Math.max(...tasks.map((t) => t.id)) + 1;
}

// Input Validation Middleware
function validateTaskInput(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Title is required and must be a non-empty string." });
  }

  if (typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({
      message: "Description is required and must be a non-empty string.",
    });
  }

  if ("completed" in req.body && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Completed must be a boolean value." });
  }

  if ("priority" in req.body && !VALID_PRIORITIES.includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be one of: low, medium, high." });
  }

  next();
}

// ✅ GET /tasks?completed=true&sort=asc|desc
app.get("/tasks", (req, res) => {
  const { completed, sort } = req.query;

  let result = [...tasks];

  if (completed !== undefined) {
    const boolVal = completed === "true";
    result = result.filter((task) => task.completed === boolVal);
  }

  if (sort === "asc") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "desc") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json(result);
});

// ✅ GET by task ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

// ✅ GET /tasks/priority/:level
app.get("/tasks/priority/:level", (req, res) => {
  const { level } = req.params;
  if (!VALID_PRIORITIES.includes(level)) {
    return res.status(400).json({ message: "Invalid priority level." });
  }

  const filtered = tasks.filter((t) => t.priority === level);
  res.json(filtered);
});

// ✅ POST /tasks
app.post("/tasks", validateTaskInput, (req, res) => {
  const { title, description, priority = "medium" } = req.body;

  const newTask = {
    id: nextId++,
    title,
    description,
    completed: false,
    priority,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ PUT /tasks/:id
app.put("/tasks/:id", validateTaskInput, (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, completed, priority = "medium" } = req.body;

  const updatedTask = {
    ...tasks[taskIndex],
    title,
    description,
    completed,
    priority,
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// ✅ DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

// ✅ Catch JSON parse errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("JSON Parse Error:", err.message);
    console.error("Request body:", req.body);
    console.error("Request URL:", req.originalUrl);
    console.error("Request method:", req.method);

    return res.status(400).json({ message: "Invalid JSON payload." });
  }
  next();
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
