import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

export const BlogType = new GraphQLObjectType({
  name: "Blog",
  description: "Blog Type Definition",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user_id: { type: GraphQLID },
    author: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  }),
});
