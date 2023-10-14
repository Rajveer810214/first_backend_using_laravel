<?php
// app/Http/Controllers/PostsController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\posts;

class PostsController extends Controller
{
    public function getPostByPostId($id)
    {
        try {
            $post = posts::findOrFail($id);
            return response()->json($post);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Post not found.'], 404);
        }
    }
    public function getPosts() {
        return posts::all();
    }
    public function addposts(Request $request)
    {
        // Validate the request data
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
            // Create a new post
            $post = posts::create($data);

            // Log a success message
            Log::info('Post created successfully. Post ID: ' . $post->id);

            // Return a JSON response with success message and post details
            return response()->json([
                'message' => 'Post created successfully',
                'post' => $post,
            ], 201);
        } catch (\Exception $e) {
            // Log an error message
            Log::error('Failed to create post. Error: ' . $e->getMessage());

            // Return a JSON response with error message
            return response()->json([
                'message' => 'Failed to create post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function deletePost(Request $request, $id)
    {
        try {
            // Find the post by its ID
            $post = posts::findOrFail($id);
            if(!$post) {
                return response()->json([
                    'success'=>false,
                    'message' => 'Failed to delete post',
                    // 'error' => $e->getMessage(),
                ], 500);
            }
            // Delete the post
            $post->delete();
    
            // Log a success message
            Log::info('Post deleted successfully. Post ID: ' . $id);
    
            // Return a JSON response with success message
            return response()->json([
                'message' => 'Post deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            // Log an error message
            \Log::error('Failed to delete post. Error: ' . $e->getMessage());
    
            // Return a JSON response with error message
            return response()->json([
                'message' => 'Failed to delete post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
            // Find the post by ID
            $post = posts::findOrFail($id);

            // Update the post with the new data
            $post->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
            ]);

            // Return a JSON response with success message and updated post details
            return response()->json([
                'message' => 'Post updated successfully',
                'post' => $post,
            ], 200);
        } catch (\Exception $e) {
            // Return a JSON response with error message
            return response()->json([
                'message' => 'Failed to update post',
                print(error),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

}
