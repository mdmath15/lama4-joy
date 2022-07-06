import { GalleryDatabase } from "../../data/GalleryDatabase";
import { ShowDatabase } from "../../data/ShowDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BaseError } from "../../error/BaseError";
import { gallery, GalleryInputDTO } from "../../model/Gallery";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import { GalleryRepository } from "./GalleryRepository";

export class GalleryBusiness implements GalleryRepository{
	galleryDatabase=new GalleryDatabase()
	async addImage(input: GalleryInputDTO, token: string): Promise<void> {
		try {
			if (!token) {
				throw new BaseError(400,"Por favor, passe o token no header da requisição");
			}
			const userDatabase=new UserDatabase()
			const authenticator = new Authenticator();
			const authData=authenticator.getData(token)
			const user=  userDatabase.getUserById(authData.id)
			if(!authData){
				throw new Error("Token inválido ou não passado")
			     }
			if (!user) {
				throw new BaseError(404,"Usuário não encontrado");
				
			}
			const {imgUrl,eventId}=input
			if (!imgUrl || !eventId) {
				throw new BaseError(400,"Por favor, passe os parâmetros necessários para a adição de uma imagem a um evento");	
			}
			const idGenerator = new IdGenerator();
			const id = idGenerator.generate();
			const gallery:gallery={
				id,
				imgUrl,
				eventId
			}
			const showDatabase = new ShowDatabase()
			const show= await showDatabase.getShowById(eventId)
			if (!show) {
				throw new BaseError(404,"O id do show passado é inválido ou o show não existe");
				
			}
			await this.galleryDatabase.addImage(gallery)
		}catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
	async getImagesByEvent(id:string,token:string):Promise<string[]>{
		try {
			if (!token) {
				throw new BaseError(400,"Por favor, passe o token no header da requisição");
			}
			const userDatabase=new UserDatabase()
			const authenticator = new Authenticator();
			const authData=authenticator.getData(token)
			const user=  userDatabase.getUserById(authData.id)
			if(!authData){
				throw new Error("Token inválido ou não passado")
			     }
			if (!user) {
				throw new BaseError(404,"Usuário não encontrado");
				
			}
			const showDatabase = new ShowDatabase()
			const show= await showDatabase.getShowById(id)
			if (!show) {
				throw new BaseError(404,"O id do show passado é inválido ou o show não existe");
				
			}
			const images= await this.galleryDatabase.getAllImagesByEvent(id)

			return images
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
}