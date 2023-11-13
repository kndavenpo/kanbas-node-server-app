import Database from "../Database/index.js";

// NOTE - commented out version in professor's git - different than in assignment
function CourseRoutes(app) {
  // A5: 4.2.1 Retrieving Courses - this is version in professor git: res.json(courses) v. res.send(courses)
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.json(courses);
  });

  // A5: 4.2.2 Create New Course - VERSION IN ASSIGNMENT
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });
  // A5: 4.2.2 Create New Course (version on Professor git)
  // app.post("/api/courses", (req, res) => {
  //   const newCourse = {
  //     ...req.body,
  //     _id: new Date().getTime().toString(),
  //   };
  //   Database.courses.unshift(newCourse);
  //   res.json(newCourse);
  // });

  // A5: 4.2.3 Delete course
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
        .filter((c) => c._id !== id);
    res.sendStatus(204);
  });
  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const index = Database.courses.findIndex((course) => course._id === id);
  //   if (index === -1) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   Database.courses.splice(index, 1);
  //   res.json(204);
  // });

  // A5: 4.2.4 Update course
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
        c._id === id ? { c, ...course } : c
    );
    res.sendStatus(204);
  });

  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const index = Database.courses.findIndex((course) => course._id === id);
  //   if (index === -1) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   Database.courses[index] = {
  //     ...Database.courses[index],
  //     ...req.body,
  //   };
  //   res.json(200);
  // });

  // A5: 4.2.5. Retrieve a Course by their ID
  // app.get("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = Database.courses
  //       .find((c) => c._id === id);
  //   if (!course) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   res.send(course);
  // });

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((course) => course._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  });

}
export default CourseRoutes;