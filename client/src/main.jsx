import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { GET_POSTS_DETAIL, GET_POSTS } from "./constants/quries.js";

import { ErrorBoundary } from "./components/ErrorBoundery.jsx";
import PostDetail from "./components/PostDetail.jsx";
import PostList from "./components/PostList.jsx";

import "./index.css";
import PostCreate from "./components/PostCreate.jsx";
import PostEdit from "./components/PostEdit.jsx";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const { data } = await client.query({ query: GET_POSTS });
      return { posts: data.posts };
    },
    Component: PostList,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/posts/:postId",
    loader: async ({ params }) => {
      const { data } = await client.query({
        query: GET_POSTS_DETAIL,
        variables: { id: params.postId }
      });
      console.log("Comments;", data)
      return { post: data.post };
    },
    Component: PostDetail, 
    errorElement: <ErrorBoundary />
  },
  {
    path: "/posts/create",
    Component: PostCreate, 
    errorElement: <ErrorBoundary />
  },
  {
    path: "/posts/:postId/edit",
    loader: async ({ params }) => {
      const { data } = await client.query({
        query: GET_POSTS_DETAIL,  
        variables: { id: params.postId }
      });
      return { post: data.post };
    },
    Component: PostEdit, 
    errorElement: <ErrorBoundary />
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
