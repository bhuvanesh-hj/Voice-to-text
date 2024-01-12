import express from "express";
import { config } from "dotenv";
import path from "path";

import sequelize from "./db/dbConnection.mjs";

import UserRoutes from "./routes/userRoutes.mjs";

config();

// creating express application
const app = express();

const port = process.env.PORT || 4000;

// use express.json() middleware for parsing JSON bodies.
app.use(express.json());

// user routes
app.use("/api/users", UserRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// error handling for 404 Not Found.
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route does not exist.");
});

// Synchronizing the Sequelize models with the database.
sequelize
  .sync({ force: false })
  // 'force: false' ensures we don't drop tables on startup.
  .then((res) => {
    // starting the server on the port 4000 after database synchronizing.
    app.listen(4000, () =>
      console.log(`Server started running at PORT: ${port}`)
    );
  })
  .catch((err) => console.log("error"));
