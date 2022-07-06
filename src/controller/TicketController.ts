import { Request, Response } from "express";
import { TicketBusiness } from "../business/Ticket/TicketBusiness";
import { BuyTicketInputDTO, TicketInputDTO } from "../model/Ticket";

export class TicketController{
	async createTicket(req:Request,res:Response){
		try {
			const auth=req.headers.authorization!
			const {name,price,eventId,qtdTickets}=req.body
			const ticket:TicketInputDTO={
				name,
				price,
				eventId,
				qtdTickets
			}
			const ticketBusiness=new TicketBusiness()
			await ticketBusiness.createTicket(ticket,auth)
			res.status(200).send("Ingresso criado!")
		} catch (error:any) {
			res.status(400).send({ error: error.message });
		    }
	}	
	async buyTicket(req:Request,res:Response){
		try {
			const auth=req.headers.authorization!
			const {qtdTickets,name}=req.body
			const input:BuyTicketInputDTO={
				qtdTickets,
				name
			}
			const ticketBusiness=new TicketBusiness()
			await ticketBusiness.buyTicket(input,auth)
			res.status(200).send("Ingressos comprados!");
		} catch (error:any) {
			res.status(400).send({ error: error.message });
		    }
	}
}