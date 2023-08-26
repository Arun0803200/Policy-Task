import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { agent } from '../../Models/AgentModel';
@JsonController('/agent')
export class agentController {
    constructor() {}

    // create agent
    @Post()
    public async createAgent(@Body({validate: true}) agentRequest: any, @Res() response: any): Promise<any> {
        const newAgent = new agent();

        newAgent.firstName = agentRequest.firstName;
        newAgent.lastName = agentRequest.lastName;
        newAgent.email = agentRequest.email;
        newAgent.phoneNumber = agentRequest.phoneNumber;
        newAgent.address = agentRequest.address;
        newAgent.dob = agentRequest.dob;
        newAgent.department = agentRequest.department;
        newAgent.position = agentRequest.position;
        newAgent.salary = agentRequest.salary;
        const saveAgent: any = await newAgent.save();
        if (saveAgent) {
            const successResponse = {
                status: 1,
                message: 'Created a new agent !!',
                data: saveAgent
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new agent !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get agent list
    @Get()
    public async getAgent(@Res() response: any): Promise<any> {
        const agentData = await agent.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the agent list !!',
                data: agentData
            };
            return response.status(200).send(successResponse);
    }

    // update agent API
    @Put('/:id')
    public async updateAgent(@Param('id') id: string, @Body({validate: true}) agentRequest: any, @Res() response: any): Promise<any> {
        const ifAgent = await agent.findOne({_id: id});
        if (!ifAgent) {
            return response.status(400).send({status: 0, message: 'Invalid Agent Id !!'});
        }
        ifAgent.firstName = agentRequest.firstName;
        ifAgent.lastName = agentRequest.lastName;
        ifAgent.email = agentRequest.email;
        ifAgent.phoneNumber = agentRequest.phoneNumber;
        ifAgent.address = agentRequest.address;
        ifAgent.dob = agentRequest.dob;
        ifAgent.department = agentRequest.department;
        ifAgent.position = agentRequest.position;
        ifAgent.salary = agentRequest.salary;
        const updateAgent = await ifAgent.save();
        if (updateAgent) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Agent !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the agent !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deleteAgent(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifAgent = await agent.findOne({_id: id});
        if (!ifAgent) {
            return response.status(400).send({status: 0, message: 'Invalid Agent id !!'});
        }
        const deleteAgent = await agent.deleteOne({_id: id});
        if (deleteAgent) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Agent !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Agent !!'});
    }
}
