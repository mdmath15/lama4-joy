import { Show, show, WEEK_DAY } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{
	private static TABLE_NAME = "Shows";
	
	public async createShow(show:show):Promise<void> {
		try {
			await this.getConnection()
			.insert({
				id:show.id,
				week_day:show.weekDay,
				start_time:show.startTime,
				end_time:show.endTime,
				band_id:show.bandId
			}).into(ShowDatabase.TABLE_NAME)	
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
	
	public async getShowByHour(show:show):Promise<show> {
		try {
			const foundShow=await this.getConnection().
			select('*')
			.from(ShowDatabase.TABLE_NAME)
			.where({"week_day":show.weekDay,"start_time":show.startTime})
			return foundShow[0]
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
	async getShowByDate(date:WEEK_DAY):Promise<any>{
		try {
		const show=await this.getConnection()
		.join("Bandas", "Shows.band_id", "Bandas.id")
        .select("Bandas.name", "Bandas.music_genre")
	.from(ShowDatabase.TABLE_NAME)
        .where("Shows.week_day", date)
        .orderBy("Shows.start_time", "asc");
		return show
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
	async getShowById(id:string):Promise<Show>{
		try {
			const show=await this.getConnection()
			.select("*")
			.from(ShowDatabase.TABLE_NAME)
			.where({id})
			return Show.toShowModel(show[0])
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
}