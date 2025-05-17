import { gql } from '@apollo/client';

export const GET_POSTS_DETAIL = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      comments {
        id
        content
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`;

export const POST_CREATE = gql` 
  mutation CreatePost($title: String!) {
    addPost(title: $title) {
      id
      title
    }
  }
`;

export const POST_UPDATE = gql`
  mutation UpdatePost($id: ID!, $title: String!) {
    updatePost(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const POST_DELETE = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;