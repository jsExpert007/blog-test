import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";
import { verifyJsonToken, getToken } from "../../libs/helper";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: any) {
    const result = await Users.findOneBy({ id: args.id });
    return result;
  },
};


export const GET_AUTH_USER = {
  type: UserType,
  async resolve(_: any, args: any, context) {
    const token   = await getToken(context.headers.authorization);
    const user    = await verifyJsonToken(token);
    const result  = await Users.findOneBy({ id:user['id'] });
    return result;
  },
};
