import Database from "../Database/index.js";
function AssignmentRoutes(app) {
  // Extra Credit: Retrieve Assignments for Course
  app.get("/api/courses/:id/assignments", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter((assignment) => assignment.course === id);
    res.json(assignments);
  });

  // Extra Credit: Create Assignments for Course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      assignment: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.unshift(newAssignment);
    res.json(newAssignment);
  });

  // Extra Credit: Delete Assignments for Course
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex((assignment) => assignment._id === id);
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments.splice(index, 1);
    res.json(204);
  });

  // Extra Credit: Update Assignments for Course
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex((assignment) => assignment._id === id);
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...req.body,
    };
    res.json(200);
  });

  // NOT SURE IF THESE WORK OR ARE USED - NO PREFIX OF COURSES
  // Get all Assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.json(assignments);
  });

  // Get Assignment by ID  - not sure if used or works?
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = Database.assignments.find((assignment) => assignment._id === id);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.json(assignment);
  });
}
export default AssignmentRoutes;