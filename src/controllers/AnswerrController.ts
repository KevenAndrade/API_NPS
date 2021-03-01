import {  Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersurveyRepository } from '../repositories/Usersurvey';

class AnswerrController {

    async execute(req: Request, res: Response){
        const { nota } = req.params;
        const { u } = req.query;

        const usersurveyRepository = getCustomRepository(UsersurveyRepository);
        const usersurveyExist = await usersurveyRepository.findOne({ id: String(u) });

        if(!usersurveyExist) {
            return res.status(400).json({ error: 'Entry not found' });
        }

        usersurveyExist.value = Number(nota);

        await usersurveyRepository.save(usersurveyExist);

        return res.status(200).json(usersurveyExist);

    }

}

export { AnswerrController };