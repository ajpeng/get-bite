// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Test message");
});


app.get("/trigger-sync", () => {
  triggerSync("1");
});

app.get("/trigger-sync/:id", (req: Request, res: Response) => {
  const menuID = req.params.id;
  triggerSync(menuID)
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function triggerSync(menuId: string) {
  getMenu(menuId);
}

function getMenu(menuId: string) {
  const MENU_URL = `https://bite-test-pos-production.herokuapp.com/locations/${menuId}/menu`;
  fetch(MENU_URL)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.error(err);
    });
}