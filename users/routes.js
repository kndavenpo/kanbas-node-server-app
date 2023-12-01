import * as dao from "./dao.js";
// let currentUser = null;                          // A6 4.1 - comment out
function UserRoutes(app) {
  // A6 - 3.5.1
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;       // A6 4.1
    res.json(currentUser);
  };

  // A6 - 3.5.2
  const account = async (req, res) => {
    res.json(req.session['currentUser']);           // A6 4.1
  };

  // A6 - 3.5.3
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;       // A6 4.1
    res.json(status);
  };


  // A6 - 3.5.4
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  // A6 - 3.5.5
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  // A6 - 3.5.6
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  // A6 - 3.5.7
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  // A6 - 3.5.9
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
        req.body.username);
    if (user) {
      res.status(400).json(
          { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;       // A6 4.1
    res.json(currentUser);
  };


  // A6 - 3.5.10
  const signout = (req, res) => {
    req.session.destroy();                          // A6 4.1
    res.json(200);
  };


  app.post("/api/users/signin", signin);        // A6 - 3.5.1
  app.post("/api/users/account", account);      // A6 - 3.5.2
  app.put("/api/users/:userId", updateUser);    // A6 - 3.5.3
  app.get("/api/users", findAllUsers);          // A6 - 3.5.4
  app.post("/api/users", createUser);           // A6 - 3.5.5
  app.get("/api/users/:userId", findUserById);  // A6 - 3.5.6
  app.delete("/api/users/:userId", deleteUser); // A6 - 3.5.7
  app.post("/api/users/signup", signup);        // A6 - 3.5.9
  app.post("/api/users/signout", signout);      // A6 - 3.5.10
}
export default UserRoutes;


