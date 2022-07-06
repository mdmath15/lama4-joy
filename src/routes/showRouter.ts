import express from "express";
import { ShowController } from "../controller/ShowController";



export const showRouter = express.Router();

const showController = new ShowController();
showRouter.get("/:date",showController.getShowByDate)
showRouter.post("/create",showController.createShow)
