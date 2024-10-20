<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;



Route::post('register', [AuthenticationController::class, 'authenticate']);
