export class Show{
	constructor(
		private id:string,
		private weekDay:WEEK_DAY,
		private  startTime:number,
		private endTime:number,
		private bandId: string
	){}
	
	getId(){
		return this.id;
	    }
	
	    getWeekDay(){
		return this.weekDay
	    }
	    getStartTime(){
		return this.startTime
	    }
	    getEndTime(){
		return this.endTime
	    }
	    getBandId(){
		return this.bandId
	    }
	    setId(id: string){
		this.id = id;
	    }
	
	    setWeekDay(weekDay: WEEK_DAY){
		this.weekDay = weekDay;
	    }
	    setStartTime(startTime:number){
		this.startTime=startTime
	    }
	    setEndTime(endTime:number){
		this.endTime=endTime
	    }
	    setBandId(bandId:string){
		this.bandId=bandId
	    }
	    static toShowModel(show: show):Show{
		return new Show(show.id, show.weekDay, show.startTime, show.endTime,show.bandId);
	      }
}
export enum WEEK_DAY{
	SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO"
}
export type show={
	id:string,
	weekDay:WEEK_DAY,
	startTime:number,
	endTime:number,
	bandId:string
}
export interface ShowInputDTO{
	weekDay:WEEK_DAY,
	startTime:number,
	endTime:number,
	bandId:string
}
