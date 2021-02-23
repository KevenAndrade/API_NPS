import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Survey } from '../models/Survey';

class SurveyControler{
    async create(req: Request, res: Response){
        const {title, description} = req.body;

        const surveyRepository = getRepository(Survey);

        const surveyExists = await surveyRepository.findOne({ title });

        if (surveyExists){
            return res.status(400).json({error:'Choose a different title'});
        }

        const survey = surveyRepository.create({
            title,
            description,
        });

        await surveyRepository.save(survey);

        /* console.log(body); */
        return res.json(survey);
    }
}

export { SurveyControler };