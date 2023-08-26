import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { carrier } from '../../Models/CarrierModel';
@JsonController('/carrier')
export class carrierController {
    constructor() {}

    // create carrier
    @Post()
    public async createCarrier(@Body({validate: true}) carrierRequest: any, @Res() response: any): Promise<any> {
        const newCarrier = new carrier();

        newCarrier.name = carrierRequest.name;
        newCarrier.country = carrierRequest.country;
        newCarrier.rating = carrierRequest.rating;
        const saveCarrier: any = await newCarrier.save();
        if (saveCarrier) {
            const successResponse = {
                status: 1,
                message: 'Created a new carrier !!',
                data: saveCarrier
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new carrier !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get carrier list
    @Get()
    public async getCarrier(@Res() response: any): Promise<any> {
        const carrierData = await carrier.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the carrier list !!',
                data: carrierData
            };
            return response.status(200).send(successResponse);
    }

    // update carrier API
    @Put('/:id')
    public async updateCarrier(@Param('id') id: string, @Body({validate: true}) carrierRequest: any, @Res() response: any): Promise<any> {
        const ifCarrier = await carrier.findOne({_id: id});
        if (!ifCarrier) {
            return response.status(400).send({status: 0, message: 'Invalid Carrier Id !!'});
        }
        ifCarrier.name = carrierRequest.name;
        ifCarrier.country = carrierRequest.country;
        ifCarrier.rating = carrierRequest.rating;
        const updateCarrier = await ifCarrier.save();
        if (updateCarrier) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Carrier !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the carrier !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deleteCarrier(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifCarrier = await carrier.findOne({_id: id});
        if (!ifCarrier) {
            return response.status(400).send({status: 0, message: 'Invalid Carrier id !!'});
        }
        const deleteCarrier = await carrier.deleteOne({_id: id});
        if (deleteCarrier) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Carrier !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Carrier !!'});
    }
}
