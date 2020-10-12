const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const usersRoute = require("./routes/api/users-route");
const postsRoute = require("./routes/api/posts-route");
const profilesRoute = require("./routes/api/profile-route");
const authRoute = require("./routes/api/auth-route");
const path = require("path");
const port = process.env.PORT || 5000;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    app.listen(port, () =>
      console.log(`Social app listening on port http://localhost/${port}`)
    )
  )
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profiles", profilesRoute);
app.use("/api/auth", authRoute);

//Serve static assets
if (process.env.NODE_ENV === "production") {
  //Set static file
  app.use(express.static("3e-client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "3e-client", "build", "index.html"));
  });
}
