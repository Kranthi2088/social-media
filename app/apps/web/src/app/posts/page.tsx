'use client';

import { useState, useEffect } from 'react';
import { Image, Heart, MessageCircle, Share2, Trash2, Edit, X } from 'lucide-react';

interface Post {
  id: string;
  userId: string;
  content?: string;
  imageIds?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentUserId] = useState('user-123'); // In a real app, this would come from auth context

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3003/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const createPost = async () => {
    if (!newPost.trim() && selectedImages.length === 0) return;

    setIsCreating(true);
    try {
      // Create the post first
      const postResponse = await fetch(`http://localhost:3003/posts?userId=${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newPost.trim() || undefined,
          imageIds: [],
        }),
      });

      const post = await postResponse.json();

      // Upload images if any
      const imageIds = [];
      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append('image', image);

        const imageResponse = await fetch(`http://localhost:3003/posts/${post.id}/images?userId=${currentUserId}`, {
          method: 'POST',
          body: formData,
        });

        const imageData = await imageResponse.json();
        imageIds.push(imageData.imageId);
      }

      // Update post with image IDs if images were uploaded
      if (imageIds.length > 0) {
        await fetch(`http://localhost:3003/posts/${post.id}?userId=${currentUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageIds,
          }),
        });
      }

      // Reset form and refresh posts
      setNewPost('');
      setSelectedImages([]);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:3003/posts/${postId}/like?userId=${currentUserId}`, {
        method: 'POST',
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:3003/posts/${postId}?userId=${currentUserId}`, {
        method: 'DELETE',
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Home</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className="w-full border-none resize-none focus:ring-0 text-lg placeholder-gray-500"
                rows={3}
                maxLength={280}
              />
              
              {/* Image Preview */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Image className="w-5 h-5 text-blue-500 hover:text-blue-600" />
                  </label>
                </div>
                <button
                  onClick={createPost}
                  disabled={isCreating || (!newPost.trim() && selectedImages.length === 0)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">User</span>
                      <span className="text-gray-500 ml-2">@{post.userId}</span>
                      <span className="text-gray-500 ml-2">·</span>
                      <span className="text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    {post.userId === currentUserId && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  
                  {post.content && (
                    <p className="text-gray-900 mt-2 text-lg">{post.content}</p>
                  )}
                  
                  {post.imageIds && post.imageIds.length > 0 && (
                    <div className="mt-3">
                      <img
                        src={`http://localhost:3003/posts/images/${post.imageIds[0]}`}
                        alt="Post"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => likePost(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
                      >
                        <Heart size={20} />
                        <span>{post.likesCount}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                        <MessageCircle size={20} />
                        <span>{post.commentsCount}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                        <Share2 size={20} />
                        <span>{post.sharesCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
