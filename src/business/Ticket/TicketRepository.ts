import { BuyTicketInputDTO, TicketInputDTO } from "../../model/Ticket";

export interface TicketRepository{
	createTicket(input:TicketInputDTO,token:string):Promise<void>
	buyTicket(input:BuyTicketInputDTO,token:string):Promise<void>
}