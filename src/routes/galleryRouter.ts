import express from "express";
import { GalleryController } from "../controller/GalleryController";
import { TicketController } from "../controller/TicketController";



export const galleryRouter = express.Router();

const galleryController = new GalleryController();
galleryRouter.post("/addImage",galleryController.addImage)
galleryRouter.get("/:id",galleryController.getAllImagesByEvent)
