import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Usuarios";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

public async getUserById(id:string):Promise<User> {
  try {
    const result = await this.getConnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where({id });

  return User.toUserModel(result[0]);
  } catch (error:any) {
    throw new Error(error.sqlMessage || error.message);
  }
}
}
