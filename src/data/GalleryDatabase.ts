import { gallery } from "../model/Gallery";
import { BaseDatabase } from "./BaseDatabase";

export class GalleryDatabase extends BaseDatabase{
	private static TABLE_NAME = "Galeria_LAMA";
	async addImage(gallery:gallery):Promise<void>{

		try {
			await this.getConnection().insert({
				id:gallery.id,
				img_url:gallery.imgUrl,
				event_id:gallery.eventId
			}).into(GalleryDatabase.TABLE_NAME)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
	async getAllImagesByEvent(eventId:string):Promise<string[]>{
		try {
		const img= await this.getConnection()
		.select("img_url")
		.from(GalleryDatabase.TABLE_NAME)
		.where("event_id",eventId)
		return img	
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
}