import { BandDatabase } from "../../data/BandDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BaseError } from "../../error/BaseError";
import { Band, band, BandInputDTO, GetBandInputDTO } from "../../model/Band";
import { IdGenerator } from "../../services/IdGenerator";
import { BandRepository } from "./BandRepository";
import { Authenticator } from "../../services/Authenticator";

export class BandBusiness implements BandRepository{
	 bandDatabase=new BandDatabase()
	async createBand(input:BandInputDTO,token:string){
		try {
			if (!token) {
				throw new BaseError(400,"Por favor, passe o token no header da requisição");
			}
			const {name,music_genre,responsible}=input
			if (!name || !music_genre || !responsible) {
				throw new BaseError(400,"Por favor, passe os parâmetros name, music_genre e responsible na requisição");
			}
			const userDatabase=new UserDatabase()
			const authenticator = new Authenticator();
			const authData=authenticator.getData(token)
			const user= await userDatabase.getUserById(authData.id)
			if(!authData){
				throw new Error("Token inválido ou não passado")
			     }
			     if(authData.role!=="ADMIN"){
				throw new Error("Usuário não autorizado")
			     }
			if (!user) {
				throw new BaseError(404,"Usuário não encontrado");
				
			}
			
			const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
			const band:band={
				id,
				name,
				music_genre,
				responsible
			}
			await this.bandDatabase.createBand(band)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
	async getBand(input: GetBandInputDTO, token: string):Promise<Band> {
	    try {
		if (!token) {
			throw new BaseError(400,"Por favor, passe o token no header da requisição");
		}
		const { name, id } = input;
		if (!input) {
			throw new BaseError(400,"Por favor, passe o id ou o nome da banda na requisição");
			
		}
		const userDatabase=new UserDatabase()
		const authenticator = new Authenticator();
			const authData=authenticator.getData(token)
			const user= await userDatabase.getUserById(authData.id)

			if (!user) {
				throw new BaseError(404,"Usuário não encontrado");	
			}
		if (name && !id) {
			const band = await this.bandDatabase.getBandByName(name);
		  
			if (!band) {
			  throw new Error(
			    "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
			  );
			}
		  
			return band;
		      }
		  
		      if (!name && id) {
			const band = await this.bandDatabase.getBandById(id);
		  
			if (!band) {
			  throw new Error(
			    "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
			  );
			}
		  
			return band;
		      }
		  
		      const band = await this.bandDatabase.getBandById(id);
		  
		      if (!band) {
			throw new Error(
			  "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
			);
		      }
		  
		      return band;
			
	    } catch (error:any) {
		throw new Error(error.sqlMessage || error.message);
	}
	}
}