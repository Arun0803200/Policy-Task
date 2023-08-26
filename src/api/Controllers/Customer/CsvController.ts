import 'reflect-metadata';
import { JsonController, Post, UploadedFile, Res, Get, QueryParam, Put, Param, Delete, BodyParam } from "routing-controllers";
import { BulkImportService } from '../../Services/BulkImportService';
import path = require('path');
import * as fs from 'fs';
import { csv } from '../../Models/CsvModel';

@JsonController('/csv')
export class CsvController {
    constructor(private bulkImportService: BulkImportService) {}

    // create csv
    @Post()
    public async uploadFiles(@UploadedFile('file') files: any, @Res() response: any): Promise<any> {
        const random = Math.floor(1000+ Math.random() * 9000);
        const orginalFile = files.originalname.split('.')[1];
        if (orginalFile === 'xlsx' || 'csv') {
            const filePath = path.join(process.cwd(), 'uploads', 'agent', 'agent_' + random + '.csv');
            await fs.writeFileSync(filePath, files.buffer);
            const xlToJson = await this.bulkImportService.csvToJson(filePath);
            for(const data of xlToJson) {
                const newCsv = new csv;
                newCsv.agent = data.agent;
                newCsv.userType = data.userType;
                newCsv.policyMode = data.policy_mode;
                newCsv.producer = data.producer;
                newCsv.policyNumber = data.policy_number;
                newCsv.premiumAmountWritten = data.premium_amount_written;
                newCsv.premiumAmount = data.premium_amount;
                newCsv.policyType = data.policy_type;
                newCsv.companyName = data.company_name;
                newCsv.categoryName = data.category_name;
                newCsv.policyStartDate = data.policy_start_date;
                newCsv.policyEndDate = data.policy_end_date;
                newCsv.csr = data.csr;
                newCsv.accountName = data.account_name;
                newCsv.email = data.email;
                newCsv.gender = data.gender;
                newCsv.firstName = data.firstname;
                newCsv.city = data.city;
                newCsv.accountType = data.account_type;
                newCsv.phone = data.phone;
                newCsv.address = data.address;
                newCsv.state = data.state;
                newCsv.zip = data.zip;
                newCsv.dob = data.dob;
                newCsv.primary = data.primary;
                newCsv.ApplicationId = data["Applicant ID"];
                newCsv.agencyId = data.agency_id;
                newCsv.hasActiveClientPolicy = data["hasActive ClientPolicy"];
                await newCsv.save();
            }
            fs.unlink(filePath, (err) => {
                if (err) throw err;
            });
            return response.status(200).send({status: 1, message: 'Successfully upload the data...!!!'});
        }
        return response.status(400).send({status: 0, message: 'Just give zip file extension !!'});
    }

    // Delete and Find All all data
    @Delete()
    public async deleteBulkData(@BodyParam('deletedStatus') deletedStatus: number, @Res() response: any): Promise<any> {
        const findAll = await csv.find();
        if (deletedStatus === 1) {
            for(const data of findAll) {
                const deleteData = await csv.deleteOne({_id: data._id});
                if (!deleteData) {
                    return response.status(400).send({status: 0, message: 'Unable to delete the data !!'})
                }
            }
            return response.status(200).send({status: 1, message: 'Successfully deleted all the data !!'});
        }
        else {
            return response.status(200).send({Status: 1, message: 'Succeddfully get all the data', data: findAll});
        }
    }
}
