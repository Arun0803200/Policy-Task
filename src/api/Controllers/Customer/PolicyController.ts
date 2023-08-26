import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { policy } from '../../Models/PolicyModel';
@JsonController('/policy')
export class policyController {
    constructor() {}

    // create policy
    @Post()
    public async createPolicy(@Body({validate: true}) policyRequest: any, @Res() response: any): Promise<any> {
        const newPolicy = new policy();

        newPolicy.userId = policyRequest.userId;
        newPolicy.carrierId = policyRequest.carrierId;
        newPolicy.lobId = policyRequest.lobId;
        newPolicy.policyNumber = policyRequest.policyNumber;
        newPolicy.startDate = policyRequest.startDate;
        newPolicy.endDate = policyRequest.endDate;
        const savePolicy: any = await newPolicy.save();
        if (savePolicy) {
            const successResponse = {
                status: 1,
                message: 'Created a new policy !!',
                data: savePolicy
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new policy !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get policy list
    @Get()
    public async getPolicy(@Res() response: any): Promise<any> {
        const policyData = await policy.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the policy list !!',
                data: policyData
            };
            return response.status(200).send(successResponse);
    }

    // update policy API
    @Put('/:id')
    public async updatePolicy(@Param('id') id: string, @Body({validate: true}) policyRequest: any, @Res() response: any): Promise<any> {
        const ifPolicy = await policy.findOne({_id: id});
        if (!ifPolicy) {
            return response.status(400).send({status: 0, message: 'Invalid Policy Id !!'});
        }
        ifPolicy.userId = policyRequest.userId;
        ifPolicy.carrierId = policyRequest.carrierId;
        ifPolicy.lobId = policyRequest.lobId;
        ifPolicy.policyNumber = policyRequest.policyNumber;
        ifPolicy.startDate = policyRequest.startDate;
        ifPolicy.endDate = policyRequest.endDate;
        const updatePolicy = await ifPolicy.save();
        if (updatePolicy) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Policy !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the policy !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deletePolicy(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifPolicy = await policy.findOne({_id: id});
        if (!ifPolicy) {
            return response.status(400).send({status: 0, message: 'Invalid Policy id !!'});
        }
        const deletePolicy = await policy.deleteOne({_id: id});
        if (deletePolicy) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Policy !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Policy !!'});
    }
}
