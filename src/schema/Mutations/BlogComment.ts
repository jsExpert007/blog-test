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
  import { BlogComments } from "../../Entities/BlogComments";
  import { CreateBlogCommentType } from "../TypeDefs/Message";
  
  /**
  * For Create Blog Comment
  *
  * param comment,blog_id,user_id,name,email,phone
  * 
  * return created blog comment.
  */
  export const CREATE_BLOG_COMMENT= {
    type: CreateBlogCommentType,
    args: {
      comment: { type: new GraphQLNonNull(GraphQLString) },
      blog_id: { type: new GraphQLNonNull(GraphQLID) },
      user_id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { comment, blog_id, user_id, name, email, phone } = args;

      const result = await BlogComments.insert({
        comment,
        blog_id,
        user_id,
        name,
        email,
        phone
      });

      const id = result.identifiers[0].id;
      const blogComment = await BlogComments.findOneBy({ id });
      return {
        success: true,
        message: "Created Blog comment successfully",
        data : blogComment
      };

    },
  };
  

  /**
  * For delete Blog Comment
  *
  * param id
  * 
  * return boolean.
  */
  export const DELETE_BLOG_COMMENT = {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, { id }: any) {
      const result = await BlogComments.delete({ id });
      if (result.affected! > 0) return true;
      return false;
    },
  };
  

  /**
  * For update Blog Comment
  *
  * param id, input (comment, blog_id, user_id, name, email, phone, status)
  * 
  * return boolean.
  */
  export const UPDATE_BLOG_COMMENT = {
    type: CreateBlogCommentType,
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "BlogCommentInput",
          fields: () => ({
            comment: { type: GraphQLString },
            blog_id: { type: GraphQLID },
            user_id: { type: GraphQLID },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            status: { type: GraphQLBoolean }
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const blogCommentFound = await BlogComments.findOneBy({ id });
      if (!blogCommentFound) throw new Error("Blog comment not found");

      const response = await BlogComments.update({ id }, input);

      if (response.affected === 0) return { message: "Blog comment not found" };

      const blogComment = await BlogComments.findOneBy({ id });

      return {
        success: true,
        message: "Update Blog comment successfully",
        data : blogComment
      };
    },
  };
  