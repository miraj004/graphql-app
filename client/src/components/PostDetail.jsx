import { Link, useLoaderData } from "react-router";

export default function PostDetail() {
  let { post, loading, error } = useLoaderData();

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <div className="comments">
        <h4>Comments:</h4>
        {post.comments.map(({ id, content }) => (
          <p className="comment-line" key={id}>
            {content}
          </p>
        ))}
      </div>
    </div>
  );
}
