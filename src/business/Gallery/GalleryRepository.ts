import { gallery, GalleryInputDTO } from "../../model/Gallery";

export interface GalleryRepository{
	 addImage(input:GalleryInputDTO,token:string):Promise<void>
	 getImagesByEvent(id:string,token:string):Promise<string[]>
}