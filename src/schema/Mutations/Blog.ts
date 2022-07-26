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
  import { Blogs } from "../../Entities/Blogs";
  import { CreateBlogType } from "../TypeDefs/Message";
  
  /**
	* For Create Blog
	*
	* param title,description,author,user_id
	* 
	* return created blog
	*/
  export const CREATE_BLOG= {
    type: CreateBlogType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: GraphQLString },
      user_id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
      const { title, description, author, user_id } = args;

      const result = await Blogs.insert({
        title,
        description,
        author,
        user_id
      });
      
      const id = result.identifiers[0].id;
      const blog = await Blogs.findOneBy({ id });
      return {
        success: true,
        message: "Created Blog successfully",
        data : blog
      };
      //return { ...args, id: result.identifiers[0].id };
    },
  };
  

  /**
	* For Delete Blog
	*
	* param id
	* 
	* return boolean value
	*/
  export const DELETE_BLOG = {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, { id }: any) {
      const result = await Blogs.delete({ id });
      if (result.affected! > 0) return true;
      return false;
    },
  };
  

  /**
	* For Update Blog
	*
	* param id, input Object (title,description,author,user_id,status)
	* 
	* return update data
	*/
  export const UPDATE_BLOG = {
    type: CreateBlogType,
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "BlogInput",
          fields: () => ({
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            author: { type: GraphQLString },
            user_id: { type: GraphQLID },
            status: { type: GraphQLBoolean }
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const blogFound = await Blogs.findOneBy({ id });
      if (!blogFound) throw new Error("Blog not found");

      const response = await Blogs.update({ id }, input);

      if (response.affected === 0) return { message: "Blog not found" };

      const blog = await Blogs.findOneBy({ id });
      return {
        success: true,
        message: "Update Blog successfully",
        data : blog
      };
    },
  };
  