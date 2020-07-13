import {DbRecordModel} from './db-record.model'
export class DbModel{
    school_id:number;
    school_name:string;
    school_gps_range:number;
    school_address:string;
    records : [DbRecordModel];
}