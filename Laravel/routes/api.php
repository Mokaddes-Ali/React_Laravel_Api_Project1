<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

use App\Http\Controllers\BackupController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SettingsController;




Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('clients', [ClientController::class, 'index']);
    Route::post('clients/store', [ClientController::class, 'store']);
    Route::get('clients/{id}', [ClientController::class, 'show']) ;
    Route::get('clients/edit/{id}', [ClientController::class, 'edit']);
    Route::post('clients/{id}', [ClientController::class, 'update']);
    Route::delete('clients/delete/{id}', [ClientController::class, 'destroy']);
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('project', [ProjectController::class, 'index'])->name('index');
    Route::post('project/submit', [ProjectController::class, 'store'])->name('store');
    Route::get('show/project', [ProjectController::class, 'projectshow'])->name('projectshow');
    Route::get('edit/project/{id}', [ProjectController::class, 'projectedit'])->name('projectedit');
    Route::post('project/update', [ProjectController::class, 'projectupdate'])->name('projectupdate');
    Route::post('delete/{id}', [ProjectController::class, 'projectdestroy'])->name('projectdestroy');
});



Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('income', [IncomeController::class, 'incomeindex'])->name('incomeindex');
    Route::post('income/submit', [IncomeController::class, 'incomestore'])->name('incomestore');
    Route::get('show/income', [IncomeController::class, 'incomeshow'])->name('incomeshow');
    Route::get('income/edit/{id}', [IncomeController::class, 'edit'])->name('incomeedit');
    Route::post('income/update', [IncomeController::class, 'update'])->name('incomeupdate');
    Route::get('invoice/filter', [IncomeController::class, 'filter'])->name('invoice.filter');
    Route::delete('income/delete/{id}', [IncomeController::class, 'destroy'])->name('income.delete');
    Route::get('invoice/search', [IncomeController::class, 'search'])->name('invoice.search');

});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('expense', [ExpenseController::class, 'index'])->name('expenseindex');
    Route::post('expense/submit', [ExpenseController::class, 'store'])->name('expensestore');
    Route::get('show/expense', [ExpenseController::class, 'show'])->name('expenseshow');
    Route::get('expense/edit/{id}', [ExpenseController::class, 'edit'])->name('expenseedit');
    Route::post('expense/update', [ExpenseController::class, 'update'])->name('expenseupdate');
    Route::get('delete/{id}', [ExpenseController::class, 'destroy'])->name('expensedestroy');
});



Route::group(['middleware' => ['auth:sanctum']], function () {
Route::get('settings', [SettingsController::class, 'edit'])->name('settings.edit');
Route::post('settings/update', [SettingsController::class, 'update'])->name('settings.update');
});


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('invoice/create/{id}', [InvoiceController::class, 'index'])->name('invoice.index');
    Route::get('invoice/pdf/{id}', [InvoiceController::class, 'pdf'])->name('invoice.pdf');

 });


 Route::group(['middleware' => ['auth:sanctum']], function () {
Route::get('backup', [BackupController::class, 'createBackup'])->name('backup.create');

});





Route::post('register', [AuthenticationController::class, 'authenticate']);
