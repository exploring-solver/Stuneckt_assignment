import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface PostItemProps {
  post: {
    _id: string;
    user: string;
    textContent: string;
    media: string[];
    timestamp: string;
    likes: number;
    retweets: number;
    comments: any[]; // Define the type for comments as needed
  };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <div className="flex items-center mb-2">
        {/* User avatar */}
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
        {/* User info */}
        <div>
          <Link href={`/${post.user}`}>
            <span className="font-bold cursor-pointer">{post.user}</span>
          </Link>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      {/* Post content */}
      <p>{post.textContent}</p>
      {/* Media */}
      <div className="flex">
        {post.media.map((media, index) => (
          <div key={index} className="w-5 h-5  ">
            {media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') ? (
              <FontAwesomeIcon icon={faImage} />
            ) : media.endsWith('.mp4') ? (
              <FontAwesomeIcon icon={faVideo} />
            ) : null}
          </div>
        ))}
      </div>
      {/* Interaction buttons */}
      <div className="flex mt-2">
        <button className="mr-2">Like ({post.likes})</button>
        <button>Retweet ({post.retweets})</button>
      </div>
    </div>
  );
};

export default PostItem;
