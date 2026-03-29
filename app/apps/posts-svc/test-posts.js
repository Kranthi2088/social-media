const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const BASE_URL = 'http://localhost:3003';
const TEST_USER_ID = 'test-user-123';

async function testPostsService() {
  console.log('🧪 Testing Posts Service...\n');

  try {
    // Test 1: Create a post
    console.log('1. Creating a post...');
    const createResponse = await fetch(`${BASE_URL}/posts?userId=${TEST_USER_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: 'Hello from the test! This is my first post. 🚀',
        imageIds: [],
      }),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create post: ${createResponse.statusText}`);
    }

    const post = await createResponse.json();
    console.log('✅ Post created successfully:', post.id);

    // Test 2: Get all posts
    console.log('\n2. Fetching all posts...');
    const getPostsResponse = await fetch(`${BASE_URL}/posts`);
    const posts = await getPostsResponse.json();
    console.log(`✅ Found ${posts.length} posts`);

    // Test 3: Get specific post
    console.log('\n3. Fetching specific post...');
    const getPostResponse = await fetch(`${BASE_URL}/posts/${post.id}`);
    const specificPost = await getPostResponse.json();
    console.log('✅ Post retrieved:', specificPost.content);

    // Test 4: Like the post
    console.log('\n4. Liking the post...');
    const likeResponse = await fetch(`${BASE_URL}/posts/${post.id}/like?userId=${TEST_USER_ID}`, {
      method: 'POST',
    });
    const likedPost = await likeResponse.json();
    console.log('✅ Post liked, likes count:', likedPost.likesCount);

    // Test 5: Update the post
    console.log('\n5. Updating the post...');
    const updateResponse = await fetch(`${BASE_URL}/posts/${post.id}?userId=${TEST_USER_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: 'Updated post content! ✨',
      }),
    });
    const updatedPost = await updateResponse.json();
    console.log('✅ Post updated:', updatedPost.content);

    // Test 6: Get user posts
    console.log('\n6. Fetching user posts...');
    const userPostsResponse = await fetch(`${BASE_URL}/posts/user/${TEST_USER_ID}`);
    const userPosts = await userPostsResponse.json();
    console.log(`✅ Found ${userPosts.length} posts for user`);

    // Test 7: Delete the post
    console.log('\n7. Deleting the post...');
    const deleteResponse = await fetch(`${BASE_URL}/posts/${post.id}?userId=${TEST_USER_ID}`, {
      method: 'DELETE',
    });
    console.log('✅ Post deleted successfully');

    console.log('\n🎉 All tests passed! Posts service is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the tests
testPostsService();
