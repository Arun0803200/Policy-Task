import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { lob } from '../../Models/LobModel';
@JsonController('/lob')
export class lobController {
    constructor() {}

    // create lob
    @Post()
    public async createLob(@Body({validate: true}) lobRequest: any, @Res() response: any): Promise<any> {
        const newLob = new lob();

        newLob.name = lobRequest.name;
        newLob.description = lobRequest.description;
        newLob.annualRevenue = lobRequest.annualRevenue;
        const saveLob: any = await newLob.save();
        if (saveLob) {
            const successResponse = {
                status: 1,
                message: 'Created a new lob !!',
                data: saveLob
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new lob !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get lob list
    @Get()
    public async getLob(@Res() response: any): Promise<any> {
        const lobData = await lob.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the lob list !!',
                data: lobData
            };
            return response.status(200).send(successResponse);
    }

    // update lob API
    @Put('/:id')
    public async updateLob(@Param('id') id: string, @Body({validate: true}) lobRequest: any, @Res() response: any): Promise<any> {
        const ifLob = await lob.findOne({_id: id});
        if (!ifLob) {
            return response.status(400).send({status: 0, message: 'Invalid Lob Id !!'});
        }
        ifLob.name = lobRequest.name;
        ifLob.description = lobRequest.description;
        ifLob.annualRevenue = lobRequest.annualRevenue;
        const updateLob = await ifLob.save();
        if (updateLob) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Lob !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the lob !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deleteLob(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifLob = await lob.findOne({_id: id});
        if (!ifLob) {
            return response.status(400).send({status: 0, message: 'Invalid Lob id !!'});
        }
        const deleteLob = await lob.deleteOne({_id: id});
        if (deleteLob) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Lob !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Lob !!'});
    }
}
