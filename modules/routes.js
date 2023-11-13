import Database from "../Database/index.js";
function ModuleRoutes(app) {

  // A5: 4.3.1 Retrieving Modules for Course  --- ASSIGNMENT VERSION HAD ERROR
  app.get("/api/courses/:id/modules", (req, res) => {
    const { id } = req.params;
    const modules = Database.modules.filter((module) => module.course === id);
    res.json(modules);
  });
  // VERSION IN ASSIGNMENT - +++++++++++++++++++++++++++++++++++  NOTE: calling db rather than Database +++++++++++++
  // app.get("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const modules = db.modules
  //       .filter((m) => m.course === cid);
  //   res.send(modules);
  // });


  // A5: 4.3.2 Create Modules for a Course --- KEEP PROFESSOR GIT VERSION RATHER THAN ASSIGNMENT VERSION
  app.post("/api/courses/:cid/modules", (req, res) => {
    const newModule = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    Database.modules.unshift(newModule);
    res.json(newModule);
  });
  // VERSION IN ASSIGNMENT - +++++++++++++++++++++++++++++++++++  NOTE: calling db rather than Database +++++++++++++
  // app.post("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const newModule = {
  //     ...req.body,
  //     course: cid,
  //     _id: new Date().getTime().toString(),
  //   };
  //   db.modules.push(newModule);
  //   res.send(newModule);
  // });


  // A5: 4.3.3 Delete Modules for a Course --- KEEP PROFESSOR GIT VERSION RATHER THAN ASSIGNMENT VERSION
  app.delete("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.modules.findIndex((module) => module._id === id);
    if (index === -1) {
      res.status(404).send("Module not found");
      return;
    }
    Database.modules.splice(index, 1);
    res.json(204);
  });
  // VERSION IN ASSIGNMENT +++++++++++++++++++++++++++++++++++  NOTE: calling db rather than Database +++++++++++++
  // app.delete("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   db.modules = db.modules.filter((m) => m._id !== mid);
  //   res.sendStatus(200);
  // });


  // A5: 4.3.4 Update Modules --- KEEP PROFESSOR GIT VERSION RATHER THAN ASSIGNMENT VERSION
  app.put("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.modules.findIndex((module) => module._id === id);
    if (index === -1) {
      res.status(404).send("Module not found");
      return;
    }
    Database.modules[index] = {
      ...Database.modules[index],
      ...req.body,
    };
    res.json(200);
  });
  // VERSION IN ASSIGNMENT +++++++++++++++++++++++++++++++++++  NOTE: calling db rather than Database +++++++++++++
  // app.put("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   const moduleIndex = db.modules.findIndex(
  //       (m) => m._id === mid);
  //   db.modules[moduleIndex] = {
  //     ...db.modules[moduleIndex],
  //     ...req.body
  //   };
  //   res.sendStatus(204);
  // });


  app.get("/api/modules", (req, res) => {
    const modules = Database.modules;
    res.json(modules);
  });

  app.get("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    const module = Database.modules.find((module) => module._id === id);
    if (!module) {
      res.status(404).send("Module not found");
      return;
    }
    res.json(module);
  });
}
export default ModuleRoutes;