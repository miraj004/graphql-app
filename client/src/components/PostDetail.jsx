export default function PostDetail({ id, title, comments }) {
    return (
        <div className="post-card" key={id}>
          <h2 className="post-title">{title}</h2>
          <div className="comments">
            <h4>Comments:</h4>
                {comments.map(({ id, content }) => (
                <p className="comment-line" key={id}>{content}</p>
                ))}
          </div>
        </div>
    )
}