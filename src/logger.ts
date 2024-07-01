
import fs from "fs";
import { Express } from "express";

class Logger {
  private logFile: fs.WriteStream;

  constructor(app: Express, morgan: typeof import("morgan")) {
    this.logFile = fs.createWriteStream("server.log", { flags: "a" });
    app.use(morgan("common", { stream: this.logFile }));
    app.use(morgan("dev"));
  }

  public write(message: string) {
    console.log(message);
    this.logFile.write(message);
  }

}

export { Logger };