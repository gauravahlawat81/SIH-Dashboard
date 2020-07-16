import {DbRecordModel} from './db-record.model'
export class DbModel{
    SchoolAddress:string;
    SchoolGPS:{
        lat:number;
        long:number;
    }
    SchoolName:string;
    SchoolID:number;
    Records : DbRecordModel[];
}