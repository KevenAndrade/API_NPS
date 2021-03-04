import {  Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { UsersurveyRepository } from '../repositories/Usersurvey';



class NPSController {

    async execute(req: Request, res: Response){
        const { survey_id } = req.params;

        const usersurveyRepository = getCustomRepository(UsersurveyRepository);

        const surveyUsers = await usersurveyRepository.find({ survey_id, value: Not(IsNull()) });

        const detractors = surveyUsers.filter(survey => 
                (survey.value >=0 && survey.value<= 6)
        ).length;
        const promotor = surveyUsers.filter(survey => 
            (survey.value >=9 && survey.value<= 10)
        ).length;
        const passivo = surveyUsers.filter(survey => 
            (survey.value >=7 && survey.value<= 8)
        ).length;

        const totalawnsers = surveyUsers.length;

        const calculate = Number(((promotor - detractors)/totalawnsers *100).toFixed(2));

        return res.json({ 
            detractors,
            promotor,
            passivo,
            totalawnsers,
            nps:calculate,
        });
    }
}

export { NPSController};