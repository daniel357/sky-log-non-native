import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("jumps.db");

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS jumps (id INTEGER PRIMARY KEY NOT NULL, title TEXT, canopy TEXT, plane TEXT, dropzone TEXT, datetime TEXT, altitude INTEGER, description TEXT);",
      [],
      () => console.log("Table created successfully"),
      (tx, error) => console.log("Failed to create table", error)
    );
  });
};

const initializeJumps = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM jumps;",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (tx, error) => reject(error)
      );
    });
  });
};

const fetchJumps = async (setJumps) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM jumps;",
      [],
      (_, { rows: { _array } }) => setJumps(_array),
      (tx, error) => console.log("Error fetching jumps: ", error)
    );
  });
};

const addJump = (newJump, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO jumps (title, canopy, plane, dropzone, datetime, altitude, description) values (?, ?, ?, ?, ?, ?, ?);",
      [
        newJump.title,
        newJump.canopy,
        newJump.plane,
        newJump.dropzone,
        newJump.datetime,
        newJump.altitude,
        newJump.description,
      ],
      () => successCallback(),
      (tx, error) => console.log("Error adding jump: ", error)
    );
  });
};

const updateJump = (jumpId, updatedJump, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE jumps SET title = ?, canopy = ?, plane = ?, dropzone = ?, datetime = ?, altitude = ?, description = ? WHERE id = ?;",
      [
        updatedJump.title,
        updatedJump.canopy,
        updatedJump.plane,
        updatedJump.dropzone,
        updatedJump.datetime,
        updatedJump.altitude,
        updatedJump.description,
        jumpId,
      ],
      () => successCallback(),
      (tx, error) => console.log("Error updating jump: ", error)
    );
  });
};

const deleteJump = (jumpId, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM jumps WHERE id = ?;",
      [jumpId],
      () => successCallback(),
      (tx, error) => console.log("Error deleting jump: ", error)
    );
  });
};

export { initDB, fetchJumps, addJump, updateJump, deleteJump, initializeJumps };
