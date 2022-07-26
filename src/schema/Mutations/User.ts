import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  graphqlSync,
} from "graphql";
import { Users } from "../../Entities/Users";
import { hashPassword, comparePassword } from "../../libs/bcrypt";
import { createJsonToken, verifyJsonToken } from "../../libs/helper";
import { UserType, AuthType } from "../TypeDefs/User";
import { CreateUserType } from "../TypeDefs/Message";


/**
* For Login user
*
* param email, password
* 
* return authToken
*/
export const LOGIN_API = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, req:any) {
    const { email, password } = args;

    const userFound = await Users.findOneBy({ 'email':email });

    if (!userFound) throw new Error("User not found");

    // Compare old password with the new password
    const isMatch = await comparePassword(
      userFound?.password as string,
      password
    );

    const token   = await createJsonToken(userFound);

    let apiResponse;
    if(isMatch){
      return {'success':true, 'token':token, 'message':'You have successfully logged in.' };
    }else{
      return {
        success: false,
        token: '',
        message: "Email or password is incorrect.",
      };
    }
  },
};

/**
* For Create User
*
* param first_name,last_name,email,password
* 
* return create user
*/
export const CREATE_USER = {
  type: CreateUserType,
  args: {
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, req:any) {
    const { first_name, last_name, email, password } = args;

    const encryptPassword = await hashPassword(password);

    const result = await Users.insert({
      first_name,
      last_name,
      email,
      password: encryptPassword,
    });

    const id = result.identifiers[0].id;
    const user = await Users.findOneBy({ id });
    return {
      success: true,
      message: "Created User successfully",
      data: user
    };

  },
};

/**
* For Delete User
*
* param id
* 
* return boolean
*/
export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, { id }: any) {
    const result = await Users.delete({ id });
    if (result.affected! > 0) return true;
    return false;
  },
};


/**
* For Update User
*
* param id, input(first_name, last_name, email, password, old_password, new_password, status)
* 
* return update user data.
*/
export const UPDATE_USER = {
  type: CreateUserType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          first_name: { type: GraphQLString },
          last_name: { type: GraphQLString },
          email: { type: GraphQLString },
          old_password: { type: GraphQLString },
          new_password: { type: GraphQLString },
          status: { type: GraphQLBoolean }
        }),
      }),
    },
  },
  async resolve(_: any, args: any) {
    const { id, input } = args;
    const userFound = await Users.findOneBy({ id });
    if (!userFound) throw new Error("User not found");

    if(input.old_password){
      // Compare old password with the new password
      const isMatch = await comparePassword(
        userFound?.password as string,
        input.old_password
      );
      if (!isMatch) throw new Error("Passwords does not match");

      // Hasing the password and deleteting old_password and new Password
      const newPassword = await hashPassword(input.new_password);
      delete input.old_password;
      delete input.new_password;

      // Adding passsword to the input for update
      input.password = newPassword;
    }

    const response = await Users.update({ id }, input);

    if (response.affected === 0) return { message: "User not found" };

    const user = await Users.findOneBy({ id });
    return {
      success: true,
      message: "Update User successfully",
      data: user
    };
  },
};
