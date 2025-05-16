import { useQuery, gql } from '@apollo/client';
import './App.css';
import PostList from './components/PostList';

const GET_POST = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`;




function App() {
  const { loading, error, data } = useQuery(GET_POST);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="app-container">
      <h1>Post Library</h1>
      <PostList posts={data.posts}/>
    </div>
  );
}

export default App;
