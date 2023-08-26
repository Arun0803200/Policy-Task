import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, Put, Param, Delete } from "routing-controllers";
import { userAccount } from '../../Models/UserAccountModel';
@JsonController('/user-account')
export class userAccountController {
    constructor() {}

    // create userAccount
    @Post()
    public async createUserAccount(@Body({validate: true}) userAccountRequest: any, @Res() response: any): Promise<any> {
        const newUserAccount = new userAccount();

        newUserAccount.userId = userAccountRequest.userId;
        newUserAccount.accountNumber = userAccountRequest.accountNumber;
        newUserAccount.balance = userAccountRequest.balance;
        const saveUserAccount: any = await newUserAccount.save();
        if (saveUserAccount) {
            const successResponse = {
                status: 1,
                message: 'Created a new user account !!',
                data: saveUserAccount
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new user account !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get userAccount list
    @Get()
    public async getUserAccount(@Res() response: any): Promise<any> {
        const userAccountData = await userAccount.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the user account list !!',
                data: userAccountData
            };
            return response.status(200).send(successResponse);
    }

    // update userAccount API
    @Put('/:id')
    public async updateUserAccount(@Param('id') id: string, @Body({validate: true}) userAccountRequest: any, @Res() response: any): Promise<any> {
        const ifUserAccount = await userAccount.findOne({_id: id});
        if (!ifUserAccount) {
            return response.status(400).send({status: 0, message: 'Invalid User account Id !!'});
        }
        ifUserAccount.userId = userAccountRequest.userId;
        ifUserAccount.accountNumber = userAccountRequest.accountNumber;
        ifUserAccount.balance = userAccountRequest.balance;
        const updateUserAccount = await ifUserAccount.save();
        if (updateUserAccount) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the UserAccount !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the user account !!'});
    }

    //Delete Api
    @Delete('/:id')
    public async deleteUserAccount(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifUserAccount = await userAccount.findOne({_id: id});
        if (!ifUserAccount) {
            return response.status(400).send({status: 0, message: 'Invalid User account id !!'});
        }
        const deleteUserAccount = await userAccount.deleteOne({_id: id});
        if (deleteUserAccount) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a User account !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a User account !!'});
    }
}
