<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\StatusController; 

use App\Http\Controllers\ProductController; 
use App\Http\Controllers\CategoryController; 
use App\Http\Controllers\SubCategoryController; 
use App\Http\Controllers\SubSubCategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ExpenseTypeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Middleware\Authorization;
use App\Http\Controllers\FileUpload;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\InquiryController;
use App\Models\Inquiry;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\AdminController; 
use App\Http\Controllers\CsvUploadController;




// Public APIs
Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/mobileLogin', [AuthController::class, 'mobileLogin']);
Route::post('/scrapVehicle', [ContactUsController::class, 'store']);
// Route::post('/contactUs', [InquiryController::class, 'saveContact']);
Route::post('/saveMultiEnquiry', [InquiryController::class, 'saveMultiEnquiry']);
Route::get('/allCatalogs', [CatalogController::class, 'allCatalog']);
Route::post('/upload-csv', [CsvUploadController::class, 'uploadCsv']);


// Secured APIs
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::post('/changePassword', [AuthController::class, 'changePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/registerUser', [AuthController::class, 'registerUser']);
    Route::put('/appUsers', [AuthController::class, 'update']);
    Route::get('/appUsers', [AuthController::class, 'allUsers']);

    Route::get('/contactUs', [InquiryController::class, 'ContactUS']);
    Route::get('/buySparePart', [InquiryController::class, 'BuySparePart']);
    Route::get('/sellSparePart', [InquiryController::class, 'SellSparePart']);
    Route::get('/enquiry/{id}', [InquiryController::class, 'getEnquiryById']);
    Route::get('/scrapEnquiry/{id}', [ContactUsController::class, 'getEnquiryById']);
    Route::post('/scrapEnquiry', [ContactUsController::class, 'store']);
    Route::post('/updateMultiEnquiry', [InquiryController::class, 'updateSparePart']);

    Route::get('/spareMultiEnquiry', [InquiryController::class, 'SparPartEnquiry']);
    Route::post('/fileUpload', [FileUpload::class, 'fileUpload']);
    Route::post('/createCatalog', [CatalogController::class, 'store']);
    Route::get('/scrapEnquiry', [ContactUsController::class, 'ScrapVehicleData']);
    
    Route::post('/newRemark', [StatusController::class, 'newRemark']);
    Route::get('/getStatusBy/{id}', [StatusController::class, 'statusByID']);

    Route::put('/scrapStausUpdate/{id}', [ContactUsController::class, 'updateStatus']);
    Route::put('/multiEnquiryStausUpdate/{id}', [InquiryController::class, 'updateStatus']);


    Route::get('/enquiries/{type}/{status}', [InquiryController::class, 'findByTypeAndStatus']);
    Route::get('/allEnquiries/{month}', [InquiryController::class, 'allEnquriesInMonth']);
    Route::get('/allScrapEnquriesInMonth/{month}', [ContactUsController::class, 'allScrapEnquriesInMonth']);
    Route::get('/allScrapEnquriesByStatus/{status}/{month}', [ContactUsController::class, 'allScrapEnquriesByStatus']);



    
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']); // Correctly specify the controller method
    Route::get('/monthlyReport', [OrderController::class, 'getMonthlyReport']);
    
});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    // User-specific routes can be added here
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
   