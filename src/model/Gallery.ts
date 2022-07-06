export class Gallery{
	constructor(
		private id:string,
		private imgUrl:string,
		private eventId:string
	){}
	getId(){
		return this.id
	}
	getImgUrl(){
		return this.imgUrl
	}
	getEventId(){
		return this.eventId
	}
	setId(id:string){
		this.id=id
	}
	setImgUrl(imgUrl:string){
		this.imgUrl=imgUrl
	}
	setEventId(eventId:string){
		this.eventId=eventId
	}
	static toGalleryModel(gallery: gallery):Gallery {
		return new Gallery(gallery.id, gallery.imgUrl, gallery.eventId);
	      }
}
export type gallery={
	id:string,
	imgUrl:string,
	eventId:string
}
export interface GalleryInputDTO{
	imgUrl:string,
	eventId:string
}