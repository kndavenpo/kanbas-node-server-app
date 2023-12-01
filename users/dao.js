//Assignment A6 (3.4)

import model from "./model.js";
//3.5.1
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

//3.5.3
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

// 3.5.4
export const findAllUsers = () => model.find();

// 3.5.5 and 3.5.9
export const createUser = (user) => model.create(user);

// 3.5.6
export const findUserById = (userId) => model.findById(userId);

// 3.5.7
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// 3.5.9
export const findUserByUsername = (username) => model.findOne({ username: username });

