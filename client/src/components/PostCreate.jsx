import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GET_POSTS, POST_CREATE } from '../constants/quries';



const PostCreate = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [createPost, { loading, error }] = useMutation(POST_CREATE, {
         refetchQueries: [
            GET_POSTS, 
            'GetPosts'
    ],
        onCompleted: () => {
            reset();
            navigate('/');
        }
    });

    const onSubmit = (data) => {
        console.log("Form data:", data);
        createPost({
            variables: {
                title: data.title,
            }
        });
    };

    return (
        <div className="post-create">
            <h2 className="create-title">Create a New Post</h2>
            <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="form-input"
                        {...register('title', { required: true })}
                    />
                </div>

                {error && <p className="error-message">Error: {error.message}</p>}
                
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default PostCreate;