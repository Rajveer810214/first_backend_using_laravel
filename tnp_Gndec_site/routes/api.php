<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostsController;

Route::get('/fetchallposts',[PostsController::class,'getPosts']); 
Route::post('/addpost', [PostsController::class, 'addposts']);
Route::delete('/posts/{id}', [PostsController::class, 'deletePost']);
Route::put('/posts/{id}', [PostsController::class, 'update']);
Route::get('/posts/{id}', [PostsController::class, 'getPostByPostId']);




