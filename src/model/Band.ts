export class Band{
	constructor(
		private id:string,
		private name:string,
		private  music_genre:string,
		private responsible:string
	){}
	
	getId(){
		return this.id;
	    }
	
	    getName(){
		return this.name
	    }
	    getMusic(){
		return this.music_genre
	    }
	    getResponsible(){
		return this.responsible
	    }
	    setId(id: string){
		this.id = id;
	    }
	
	    setName(name: string){
		this.name = name;
	    }
	    setMusic(music_genre:string){
		this.music_genre=music_genre
	    }
	    setResponsible(responsible:string){
		this.responsible=responsible
	    }
	    static toBandModel(band: band):Band {
		return new Band(band.id, band.name, band.music_genre, band.responsible);
	      }
}
export type band={
	id:string,
	name:string,
	music_genre:string,
	responsible:string
}
export interface BandInputDTO{
	name:string,
	music_genre:string,
	responsible:string
}
export interface GetBandInputDTO{
	name:string,
	id:string
}