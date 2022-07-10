import { UserInputDTO, LoginInputDTO, User } from "../../model/User";
import { UserDatabase } from "../../data/UserDatabase";
import { IdGenerator } from "../../services/IdGenerator";
import { HashManager } from "../../services/HashManager";
import { Authenticator } from "../../services/Authenticator";
import { BaseError, InvalidEmail, InvalidName, InvalidPassword, UserNotFound } from "../../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO):Promise<string> {

        try {
            if (!user.name || !user.email || !user.password || !user.role) {
				throw new BaseError(
				  400,
				  'Preencha os campos "name", "email" e "password"'
				);
			      }
                  if (user.name.length < 4) {
                    throw new InvalidName();
                      }
                      if (!user.email.includes("@")) {
                        throw new InvalidEmail();
                          }
                          if(user.password.length<6){
                              throw new InvalidPassword();
                          }
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
    
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);
    
            const userDatabase = new UserDatabase();
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);
    
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });
    
            return accessToken;
        }  catch (error:any) {
			throw new Error(error.message);
		}	

       
    }

    async getUserByEmail(user: LoginInputDTO):Promise<string> {

       try {
        if (!user.email || !user.password) {
            throw new BaseError(400,'Preencha todos os campos da requisição')
        }
        if (!user.email.includes("@")) {
            throw new InvalidEmail();
              }
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new UserNotFound();
        } 

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());
        if(!hashCompare){
            throw new InvalidPassword();
        }
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        return accessToken;
       } catch (error:any) {
        throw new Error(error.message);
    }	
       
    }
}