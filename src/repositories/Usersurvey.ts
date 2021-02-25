import { EntityRepository, Repository } from "typeorm";
import { Usersurvey } from "../models/UserSurvey";

@EntityRepository(Usersurvey)
class UsersurveyRepository extends Repository<Usersurvey> {

}

export {UsersurveyRepository};