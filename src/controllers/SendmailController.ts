import { request, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UsersurveyRepository } from '../repositories/Usersurvey';


class SendmailController {
    async execute(request:Request, response:Response){
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const usersurveyRepository = getCustomRepository(UsersurveyRepository);

        const userExist = await userRepository.findOne({ email});
        const surveyExist = await surveyRepository.findOne({ id: survey_id });

        if (!userExist){
            return response.status(400).json({ error: "User not found. "});
        }
        if (!surveyExist){
            return response.status(400).json({ error: "Survey not found. "});
        }

        // save the info into survey_user table
        const usersurvey = usersurveyRepository.create({
            user_id: userExist.id,
            survey_id: survey_id
        });

        await usersurveyRepository.save(usersurvey);
        return response.status(201).json(usersurvey);
    }
}

export { SendmailController};