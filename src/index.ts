// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { MenuResponse } from "./types";
import { validateMenuRequest } from "./validators";
import { Logger } from "./logger";
import { initDB } from "./db";
import { MenuResponseModel } from "../db/models";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const STRICT_MODE = process.env.STRICT_MODE === "true" || false;

initDB(mongoose);
const log = new Logger(app, morgan);

app.get("/", (_req: Request, res: Response) => {
  res.send("Test message");
});

app.get("/trigger-sync", () => {
  triggerSync("1");
});

app.get("/trigger-sync/:id", (req: Request, _res: Response) => {
  const menuID = req.params.id;
  triggerSync(menuID);
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
      if (!STRICT_MODE)  {
        saveMenu(json);
      } else {
        if (validateMenuRequest(json)) {
          saveMenu(json);
        } else {
          log.write("Invalid menu request");
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function saveMenu(menu: MenuResponse) {

  const newSections = menu.sections.map((section) => {
    return {
      id: section.id,
      name: section.name,
      itemIds: section.itemIds,
      magicCopyKey: section.magicCopyKey,
      imageUrl: section.imageUrl,
    };
  });

  const newItems = menu.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      modGroupIds: item.modGroupIds,
      magicCopyKey: item.magicCopyKey,
      imageUrl: item.imageUrl,
    };
  });

  const newModGroups = menu.modGroups.map((modGroup) => {
    return {
      id: modGroup.id,
      name: modGroup.name,
      modIds: modGroup.modIds,
      maxMods: modGroup.maxMods,
      minMods: modGroup.minMods,
    };
  });

  const newMods = menu.mods.map((mod) => {
    return {
      id: mod.id,
      name: mod.name,
      modGroupIds: mod.modGroupIds,
      price: mod.price,
    };
  });

  const newDiscounts = menu.discounts.map((discount) => {
    return {
      id: discount.id,
      name: discount.name,
      amount: discount.amount,
      rate: discount.rate,
      couponCode: discount.couponCode,
    };
  });

  const newOrderTypes = menu.orderTypes.map((orderType) => {
    return {
      id: orderType.id,
      name: orderType.name,
    };
  });

  const newMenu = new MenuResponseModel({
    sections: newSections,
    items: newItems,
    modGroups: newModGroups,
    mods: newMods,
    discounts: newDiscounts,
    orderTypes: newOrderTypes,
  });

  newMenu.save().then(() => {
    log.write("Menu saved to database");
  }).catch((err) => {
    log.write("Error saving menu to database");
    console.error(err);
  });
}