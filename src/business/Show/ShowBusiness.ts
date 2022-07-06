import { ShowDatabase } from "../../data/ShowDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BaseError } from "../../error/BaseError";
import { Show, show, ShowInputDTO, WEEK_DAY } from "../../model/Show";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import { ShowRepository } from "./ShowRepository";

export class ShowBusiness implements ShowRepository{
	showDatabase=new ShowDatabase()
	async createShow(input: ShowInputDTO, token: string): Promise<void> {
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
			const {weekDay,startTime,endTime,bandId}=input
			if(!weekDay || !startTime || !endTime || !bandId){
				throw new BaseError(400,"Por favor, passe todos os parâmetros weekDay, startTime, endTime e bandId para a criação do Show");	
			}
			if(startTime<8 || endTime > 23 || endTime < 8 || startTime >23){
				throw new BaseError(400,"Horário inválido. Os horários apenas podem ser registrados entre 8h e 23h");
			}
			if (typeof startTime !== 'number' || typeof endTime !== 'number') {
				throw new BaseError(400,"Horários devem ser no formato numérico");
				
			}
			if(Number.isInteger(startTime) && Number.isInteger(endTime) === false){
				throw new BaseError(400,"Horário inválido. Apenas horários rendondos permitidos");
			}
			if (weekDay !== WEEK_DAY.SEXTA && weekDay !== WEEK_DAY.SABADO && weekDay !== WEEK_DAY.DOMINGO) {
				throw new BaseError(400,"Dia da semana inválido. Só são permitidos os dias SEXTA, SÁBADO ou DOMINGO para o registro de Show");
			}
			const idGenerator = new IdGenerator();
			const id = idGenerator.generate();
			const show:show={
				id,
				weekDay,
				startTime,
				endTime,
				bandId
			}
			const showAlreadyExists= await this.showDatabase.getShowByHour(show)
			if (showAlreadyExists) {
			throw new BaseError(400,"Horário inválido. Já existe um show cadastrado para o dia e horário passados");
			}
			 this.showDatabase.createShow(show)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	
	}
	async getShowByDate(date:WEEK_DAY,token:string):Promise<any> {
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
			const show = await this.showDatabase.getShowByDate(date)
			if (!show) {
				throw new BaseError(404,"Show não encontrado");
				
			}
			return show
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
	
}