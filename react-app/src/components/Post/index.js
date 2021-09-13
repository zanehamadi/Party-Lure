import { useParams } from 'react-router';

export default function Post({ posts }) {
    const { id } = useParams();
    const post = posts?.find(post => post.id === +id)

    return (
        <>
            <div>
                {post.content}
            </div>
        </>
    )
}
