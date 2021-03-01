import {  Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersurveyRepository } from '../repositories/Usersurvey';



class NPSController {

    async execute(req: Request, res: Response){
        const { survey_id} = req.params;

        const usersurveyRepository = getCustomRepository(UsersurveyRepository);

        const surveyUsers = await usersurveyRepository.find({ survey_id });

        const detractors = surveyUsers.filter(survey => 
                (survey.value >=0 )
            )

    }

}

export { NPSController};