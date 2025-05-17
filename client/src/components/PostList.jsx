import { Link, useLoaderData } from "react-router";

export default function PostList() {
  const { posts } = useLoaderData();
  return (
    <div className="post-list">
      <h1>Posts</h1>
      <div>
        <Link to="/posts/create">
          <button className="create-post">Create Post</button>
        </Link>
      </div>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div className="post-card">
            <h2>{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}