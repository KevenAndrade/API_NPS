import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyControler } from './controllers/SurveyControler';

const router = Router();

const userController = new UserController();
const surveyControler = new SurveyControler();

router.post("/users", userController.create);
router.post("/surveys", surveyControler.create);

export { router };