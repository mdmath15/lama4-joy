import { Request, Response } from "express";
import { GalleryBusiness } from "../business/Gallery/GalleryBusiness";
import { GalleryInputDTO } from "../model/Gallery";

export class GalleryController{
	async addImage(req:Request,res:Response){
		try {
			const auth=req.headers.authorization!
			const {imgUrl,eventId}=req.body
			const input:GalleryInputDTO={
				imgUrl,
				eventId
			}
			const galleryBusiness=new GalleryBusiness()
			await galleryBusiness.addImage(input,auth)
			res.status(200).send("Foto adicionada!")
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);	
		}
	}
	async getAllImagesByEvent(req:Request,res:Response){
		try {
			const auth=req.headers.authorization!
			const {id}=req.params
			const galleryBusiness=new GalleryBusiness()
			const images=await galleryBusiness.getImagesByEvent(id,auth)
			res.status(200).send(images)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);	
		}
	}
}