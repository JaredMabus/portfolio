import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));
} else {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  try {
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    } else {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    }
  } catch (err) {
    res.status(500);
    throw new Error("could not send index.html");
  }
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ err: true, msg: err.message });
  } catch (err) {
    res.status(500);
    res.json({ err: true, msg: "Interal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening at -- http://localhost:${port} -- 🚀`);
});
