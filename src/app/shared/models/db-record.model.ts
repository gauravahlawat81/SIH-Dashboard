import { DbQuestionsModel } from './db-questions.model';
export class DbRecordModel{
    CreationDate:string;
    GPSLocation:{
        lat:number;
        long:number;
    }
    OfficerID:number;
    OverallReview:string;
    questions:DbQuestionsModel[];

}