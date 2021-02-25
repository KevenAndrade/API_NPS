import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyControler } from './controllers/SurveyControler';
import { SendmailController } from './controllers/SendmailController';

const router = Router();

const userController = new UserController();
const surveyControler = new SurveyControler();
const sendmailController = new SendmailController();

router.post("/users", userController.create);

/* Routes for Surveys */
router.post("/surveys", surveyControler.create);
router.get("/surveys", surveyControler.show);

router.post("/sendmail", sendmailController.execute);


export { router };