export class Ticket{
	constructor(
		private id:string,
		private name:string,
		private price:number,
		private eventId:string,
		private qtdTickets:number,
		private soldTickets:number
	){}
	getId(){
		return this.id
	}
	    getName(){
		return this.name
	    } 
	    getPrice(){
		return this.price
	    }
	getEventId(){
		return this.eventId
	}
	getQtdTickets(){
		return this.qtdTickets
	}
	getSoldTickets(){
		return this.soldTickets
	}
	setId(id:string){
		this.id=id
	}
	setName(name:string){
		this.name=name
	}
	setPrice(price:number){
		this.price=price
	}
	setEventId(eventId:string){
		this.eventId=eventId
	}
	setQtdTickets(qtdTickets:number){
		this.qtdTickets=qtdTickets
	}
	setSoldTickets(soldTickets:number){
		this.soldTickets=soldTickets
	}
	static toTicketModel(ticket: ticket):Ticket {
		return new Ticket(ticket.id, ticket.name, ticket.price,ticket.eventId, ticket.qtdTickets,ticket.soldTickets);
	      }
}
export type ticket={
	id:string,
	name:string,
	price:number,
	eventId:string,
	qtdTickets:number,
	soldTickets:number
}
export interface TicketInputDTO{
	name:string,
	price:number,
	eventId:string,
	qtdTickets:number
}
export interface BuyTicketInputDTO{
	qtdTickets:number,
	name:string
}