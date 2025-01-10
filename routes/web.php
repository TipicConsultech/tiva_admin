<?php

use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');

Route::post('/reset-password-link', [MailController::class, 'sendEmail']);
Route::post('/resetPassword',[MailController::class, 'resetPassword']);
});
