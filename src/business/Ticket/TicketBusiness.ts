import { BuyTicketInputDTO, ticket } from '../../model/Ticket';
import { TicketDatabase } from "../../data/TicketDatabase";
import { BaseError } from "../../error/BaseError";
import { TicketInputDTO } from "../../model/Ticket";
import { IdGenerator } from "../../services/IdGenerator";
import { TicketRepository } from "./TicketRepository";
import { UserDatabase } from '../../data/UserDatabase';
import { Authenticator } from '../../services/Authenticator';

export class TicketBusiness implements TicketRepository{
	ticketDatabase=new TicketDatabase()
	async createTicket(input:TicketInputDTO,token:string):Promise<void>{
		try {
			if (!token) {
				throw new BaseError(400,"Por favor, passe o token no header da requisição");
			}
			const {name,price,eventId,qtdTickets}=input
			if (!name || !price || !eventId || !qtdTickets) {
				throw new BaseError(400,"Passe todos os argumentos na requisição para a criação de ingresso, por favor");
			}
			const userDatabase=new UserDatabase()
			const authenticator = new Authenticator();
			const authData=authenticator.getData(token)
			const user= await userDatabase.getUserById(authData.id)
			if 
			(authData.role !== 'ADMIN') {
				throw new BaseError(401,"Usuário não autorizado");
			}
			if(!authData){
				throw new Error("Token inválido ou não passado")
			     }
			if (!user) {
				throw new BaseError(404,"Usuário não encontrado");
				
			}
			const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
	 const soldTickets=0   
	    const ticket:ticket={
		id,
		name,
		price,
		eventId,
		qtdTickets,
		soldTickets
	    }
	    await this.ticketDatabase.createTicket(ticket)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
	async buyTicket(input: BuyTicketInputDTO, token: string): Promise<void> {
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
			const {qtdTickets,name}=input
			if (typeof qtdTickets !== 'number') {
				throw new BaseError(400,"A quantidade dos ingresso deve ser um número");
			}
			if (typeof name !== 'string') {
				throw new BaseError(400,"O nome do ingresso deve ser uma palavra");
			}
			const ticketByName=await this.ticketDatabase.getTicketByName(name)
			if (!ticketByName) {
				throw new BaseError(404,"O nome do ingresso passado está inválido ou o ingresso não existe");
			}
			const qtd=await this.ticketDatabase.getQtdByTicket(name)
			if (qtdTickets > qtd) {
				throw new BaseError(400,"A quantidade de ingresso que deseja comprar é maior que a quantidade de ingressos disponível");
			}
			const sold=await this.ticketDatabase.getSoldByTicket(name)
			
			const newTotal=qtd-qtdTickets
			const newSold=sold+qtdTickets

			await this.ticketDatabase.buyTicket(newTotal,newSold,name)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		}
	}
}