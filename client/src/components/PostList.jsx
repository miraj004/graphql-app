export default function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map(({ id, title }) => (
        <div className="post-card" key={id}>
          <h2 className="post-title">{title}</h2>
        </div>
      ))}
    </div>
  );
}