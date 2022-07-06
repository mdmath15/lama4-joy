import { Band, BandInputDTO, GetBandInputDTO } from "../../model/Band";

export interface BandRepository{
	createBand(input:BandInputDTO,token:string):Promise<void>
	getBand(input:GetBandInputDTO,token:string):Promise<Band>
}