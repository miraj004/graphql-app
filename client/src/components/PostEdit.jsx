import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { POST_UPDATE } from '../constants/quries';



const PostUpdate = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { post } = useLoaderData();
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || ''
        }
    });
    
    const [updatePost, { loading: updateLoading, error: updateError }] = useMutation(POST_UPDATE, {
        onCompleted: () => {
            navigate(`/posts/${postId}`);
        }
    });

    const onSubmit = (formData) => {
        updatePost({
            variables: {
                id: postId,
                title: formData.title
            }
        });
    };

    if (!post) return <div>Loading post data...</div>;

    return (
        <div className="post-create">
            <h2 className="create-title">Update Post</h2>
            <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="form-input"
                        {...register('title', { 
                            required: 'Title is required',
                            minLength: {
                                value: 3,
                                message: 'Title must be at least 3 characters'
                            }
                        })}
                    />
                    {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                    )}
                </div>

        
                {updateError && (
                    <p className="error-message">Error: {updateError.message}</p>
                )}
                
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={updateLoading}
                >
                    {updateLoading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
};

export default PostUpdate;