import { ShowInputDTO, WEEK_DAY } from "../../model/Show";

export interface ShowRepository{
	createShow(input:ShowInputDTO,token:string):Promise<void>
	getShowByDate(date:WEEK_DAY,token:string):Promise<any>
}