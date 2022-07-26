import { GraphQLBoolean, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { BlogType } from "../TypeDefs/Blog";
import { BlogCommentType } from "../TypeDefs/BlogComment";

export const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

export const CreateUserType = new GraphQLObjectType({
  name: "user_message",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: UserType },
  }),
});

export const CreateBlogType = new GraphQLObjectType({
  name: "blog_message",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: BlogType },
  }),
});

export const CreateBlogCommentType = new GraphQLObjectType({
  name: "blog_comment_message",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: BlogCommentType },
  }),
});

