import { GraphQLNonNull, GraphQLString } from "graphql";

/**
	* For Get Greeting message
	*
	* param name
	* 
	* return message
	*/
export const GREETING = {
  type: GraphQLString,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_: any, args: any) {
    return `Hello ${args.name}`;
  },
};
