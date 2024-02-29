import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { loginSchema, registerSchema } from "../utils/Validator/authValidator";
import ResponsError from "../error/responsError";
import { validate } from "../utils/Validator/validete";

export default new (class AuthService {
  private readonly authrepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(data) {
    const isValid = validate(registerSchema, data);

    const chkUser = await this.authrepository.countBy({
      username: isValid.username,
    });
    if (chkUser !== 0) throw new ResponsError(400, "username alredy exist!");

    const hash = await bcrypt.hash(isValid.password, 10);
    const user = await this.authrepository.save({
      username: isValid.username,
      password: hash,
      name: isValid.name,
    });
    const get = await this.authrepository.findOne({
      where: {
        username: isValid.username,
      },
    });
    const token = jwt.sign(
      { id: get.id, username: get.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    return {
      massage: "Account created success",
      user: {
        id: get.id,
        name: get.name,
        username: get.username,
      },
      token: token,
    };
  }

  async login(data) {
    const isValid = validate(loginSchema, data);
    const chkUser = await this.authrepository.findOne({
      where: {
        username: isValid.username,
      },
    });
    if (!chkUser) throw new ResponsError(400, "username not registed!");
    

    const isMatch = await bcrypt.compare(isValid.password, chkUser.password);
    if (!isMatch) throw new ResponsError(400, "password wrong!");
console.log(process.env.SECRET_KEY)    
    const token = jwt.sign(

      { id: chkUser.id, username: chkUser.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    return {
      massage: "Login success",
      user: {
        id: chkUser.id,
        username: chkUser.username,
      },
      token: token,
    };
  }
})();
