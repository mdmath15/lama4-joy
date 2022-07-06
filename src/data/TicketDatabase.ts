import { Ticket, ticket } from "../model/Ticket";
import { BaseDatabase } from "./BaseDatabase";

export class TicketDatabase extends BaseDatabase{
	private static TABLE_NAME = "Ticket";
	async createTicket(ticket:ticket):Promise<void>{
		try {
			await this.getConnection()
			.insert({
				id:ticket.id,
				name:ticket.name,
				price:ticket.price,
				event_id:ticket.eventId,
				qtd:ticket.qtdTickets,
				solds:ticket.soldTickets
			}).into(TicketDatabase.TABLE_NAME)
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }	
	}
	async buyTicket(newTotal:number,newSold:number,name:string):Promise<void>{
		try {			
		await this.getConnection()
		.where({name})
		.update({qtd:newTotal,solds:newSold})
		.into(TicketDatabase.TABLE_NAME)	
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
	async getTicketByName(name:string):Promise<Ticket>{
		try {
		const ticket=await this.getConnection()
		.select("*")
		.from(TicketDatabase.TABLE_NAME)
		.where({name})
		return Ticket.toTicketModel(ticket[0])
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
	async getQtdByTicket(name:string):Promise<any>{
		try {
		const qtd=await this.getConnection()
		.select("qtd")
		.from(TicketDatabase.TABLE_NAME)
		.where({name})	
		return qtd[0].qtd
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
	async getSoldByTicket(name:string):Promise<any>{
		try {
		const sold=await this.getConnection()
		.select("solds")
		.from(TicketDatabase.TABLE_NAME)
		.where({name})	
		return sold[0].solds
		} catch (error:any) {
			throw new Error(error.sqlMessage || error.message);
		      }
	}
}