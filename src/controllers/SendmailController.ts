import { request, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UsersurveyRepository } from '../repositories/Usersurvey';
import Sendmailservices from '../services/Sendmailservices';
import {resolve} from 'path';


class SendmailController {
    async execute(request:Request, response:Response){
        const { email, survey_id } = request.body;
        
        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const usersurveyRepository = getCustomRepository(UsersurveyRepository);

        const userExist = await userRepository.findOne({ email});
        const surveyExist = await surveyRepository.findOne({ id: survey_id });
        const user_didnt_anwser = await usersurveyRepository.findOne({
            where: [{user_id: userExist.id}, {value: null}],
            relations: ["user", "survey"]
        });

        const npsPath = resolve(__dirname, '..', 'views','emails','npsMail.hbs');
        const variables = {
            name: userExist.name,
            title:surveyExist.title,
            description:surveyExist.description,
            user_id:userExist.id,
            link: process.env.URL_MAIL,
        }

        if (!userExist){
            return response.status(400).json({ error: "User not found. "});
        }
        if (!surveyExist){
            return response.status(400).json({ error: "Survey not found. "});
        }
        if (user_didnt_anwser){
            await Sendmailservices.execute(email, surveyExist.title, variables, npsPath);
            return response.status(201).json(user_didnt_anwser);
        }

        // save the info into survey_user table
        const usersurvey = usersurveyRepository.create({
            user_id: userExist.id,
            survey_id: survey_id
        });

        await usersurveyRepository.save(usersurvey);

        //send email
        

        await Sendmailservices.execute(email, surveyExist.title, variables, npsPath);

        return response.status(201).json(usersurvey);

    }
}

export { SendmailController};