import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // const { token } = useAuth();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.BACKEND_URL}/posts/api/v1/posts?page=${currentPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setPosts(data.result.docs);
                setTotalPages(data.result.totalPages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };


        fetchPosts();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
            <div className='flex justify-between'>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Posts;
