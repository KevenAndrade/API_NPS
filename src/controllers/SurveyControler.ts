import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyControler{
    async create(req: Request, res: Response){
        const {title, description} = req.body;

        const surveyRepository = getCustomRepository(SurveysRepository);

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
        return res.status(201).json(survey);
    }

    async show(req: Request, res: Response){
        const surveyRepository = getCustomRepository(SurveysRepository);

        const all = await surveyRepository.find();

        return res.status(201).json(all);
    }
}

export { SurveyControler };
