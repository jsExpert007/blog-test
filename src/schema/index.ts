import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GREETING } from "./Queries/Greeting";
import { GET_ALL_USERS, GET_USER, GET_AUTH_USER } from "./Queries/User";
import { LOGIN_API, CREATE_USER, DELETE_USER, UPDATE_USER } from "./Mutations/User";
import { GET_ALL_BLOGS, GET_BLOG } from "./Queries/Blog";
import { CREATE_BLOG, DELETE_BLOG, UPDATE_BLOG } from "./Mutations/Blog";
import { GET_ALL_BLOG_COMMENTS, GET_BLOG_COMMENT } from "./Queries/BlogComment";
import { CREATE_BLOG_COMMENT, DELETE_BLOG_COMMENT, UPDATE_BLOG_COMMENT } from "./Mutations/BlogComment";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    greeting: GREETING,
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USER,
    getAuthUser: GET_AUTH_USER,
    getAllBlogs: GET_ALL_BLOGS,
    getBlog: GET_BLOG,
    getAllBlogComments: GET_ALL_BLOG_COMMENTS,
    getBlogComment: GET_BLOG_COMMENT,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: LOGIN_API,
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
    createBlog: CREATE_BLOG,
    deleteBlog: DELETE_BLOG,
    updateBlog: UPDATE_BLOG,
    createBlogComment: CREATE_BLOG_COMMENT,
    deleteBlogComment: DELETE_BLOG_COMMENT,
    updateBlogComment: UPDATE_BLOG_COMMENT,
  },
});

const resolver  = {
  query: RootQuery,
  mutation: Mutation,
};

export const schema = new GraphQLSchema(resolver);
