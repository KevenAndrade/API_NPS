import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyControler } from './controllers/SurveyControler';
import { SendmailController } from './controllers/SendmailController';
import { AnswerrController } from './controllers/AnswerrController';
import { NPSController } from './controllers/NPSController';

const router = Router();

const userController = new UserController();
const surveyControler = new SurveyControler();
const sendmailController = new SendmailController();
const answerrController = new AnswerrController();
const npsController = new NPSController();

router.post("/users", userController.create);

/* Routes for Surveys */
router.post("/surveys", surveyControler.create);
router.get("/surveys", surveyControler.show);

router.post("/sendmail", sendmailController.execute);

router.get("/answers/:nota", answerrController.execute);
router.get("/nps/:survey_id", npsController.execute);


export { router };