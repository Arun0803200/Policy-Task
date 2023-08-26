import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { user } from '../../Models/UserModel';
@JsonController('/user')
export class userController {
    constructor() {}

    // create user
    @Post()
    public async createUser(@Body({validate: true}) userRequest: any, @Res() response: any): Promise<any> {
        const newUser = new user();

        newUser.name = userRequest.name;
        newUser.email = userRequest.email;
        newUser.dob = userRequest.dob;
        newUser.address = userRequest.address;
        newUser.phoneNumber = userRequest.phoneNumber;
        const saveUser: any = await newUser.save();
        if (saveUser) {
            const successResponse = {
                status: 1,
                message: 'Created a new user !!',
                data: saveUser
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new user !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get user list
    @Get()
    public async getUser(@Res() response: any): Promise<any> {
        const userData = await user.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the user list !!',
                data: userData
            };
            return response.status(200).send(successResponse);
    }

    // update user API
    @Put('/:id')
    public async updateUser(@Param('id') id: string, @Body({validate: true}) userRequest: any, @Res() response: any): Promise<any> {
        const ifUser = await user.findOne({_id: id});
        if (!ifUser) {
            return response.status(400).send({status: 0, message: 'Invalid User Id !!'});
        }
        ifUser.name = userRequest.name;
        ifUser.email = userRequest.email;
        ifUser.dob = userRequest.dob;
        ifUser.address = userRequest.address;
        ifUser.phoneNumber = userRequest.phoneNumber;
        const updateUser = await ifUser.save();
        if (updateUser) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the User !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the user !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deleteUser(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifUser = await user.findOne({_id: id});
        if (!ifUser) {
            return response.status(400).send({status: 0, message: 'Invalid User id !!'});
        }
        const deleteUser = await user.deleteOne({_id: id});
        if (deleteUser) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a User !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a User !!'});
    }
}
