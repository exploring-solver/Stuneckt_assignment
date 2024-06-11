"use client";

import React, { useState } from 'react';
import axios from 'axios';

const PostModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [textContent, setTextContent] = useState('');
    const [media, setMedia] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = { textContent, media };

        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/posts/api/v1/posts`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 201) {
                console.log('Post created successfully:', response.data);
                alert('Posted Successfully.')
                onClose(); // Close the modal on successful post creation
            } else {
                console.error('Failed to create post:', response.data);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to post please try again.')
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl mb-4">Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Text Content</label>
                        <textarea
                            className="w-full mt-2 p-2 border rounded bg-gray-700 text-white"
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Supported Media Files (e.g., xyz.jpg, abc.mp4, uvw.jpeg):</label>

                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded bg-gray-700 text-white"
                            value={media.join(', ')}
                            onChange={(e) => setMedia(e.target.value.split(',').map(item => item.trim()))}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;
