import { band, Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{
	private static TABLE_NAME = "Bandas";

	public async createBand(band:band) {
	try {
		await this.getConnection()
		.insert({
			id:band.id,
			name:band.name,
			music_genre:band.music_genre,
			responsible:band.responsible
		}).into(BandDatabase.TABLE_NAME)
	} catch (error:any) {
		throw new Error(error.sqlMessage || error.message);
	      }	
	}
	
	public async getBandByName(name:string) {
		try {
		const result=await this.getConnection()
		.select("*")
      		.from(BandDatabase.TABLE_NAME)
     		 .where({ name });
			return Band.toBandModel(result[0])
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
	public async getBandById(id:string) {
		try {
		const result=await this.getConnection()
		.select("*")
      		.from(BandDatabase.TABLE_NAME)
     		 .where({ id });
			return Band.toBandModel(result[0])
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
}