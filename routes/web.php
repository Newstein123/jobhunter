<?php

use Carbon\Carbon;
use Inertia\Inertia;
use App\Jobs\SendMail;
use App\Models\Resume;
use App\Models\Employer;
use App\Models\CustomMail;
use App\Models\JobRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\TransportManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Config;
use App\Http\Controllers\ResumeController;
use App\Mail\JobRequest as JobRequestMail;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\CustomMailController;
use App\Http\Controllers\JobRequestController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->to('/login');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', function () {
    $jobCount = Jobrequest::count();
    $resumeCount = Resume::count();
    $mailCount = CustomMail::count();
    $employerCount = Employer::count();
    $jobError = JobRequest::where('status', 0)->count();
    $jobProcessed = JobRequest::where('status', 1)->count();
    $jobInterviewed = JobRequest::where('status', 3)->count();
    $jobReplied = JobRequest::where('status', 2)->count();
    $jobRejected = JobRequest::where('status', 4)->count();
    $todayJobCount = JobRequest::whereDate('created_at', Carbon::today())->count();

    return Inertia::render('Dashboard', [
        'jobCount' => $jobCount,
        'resumeCount' => $resumeCount,
        'mailCount' => $mailCount,
        'employerCount' => $employerCount,
        'jobProcessed' => $jobProcessed,
        'jobInterviewed' => $jobInterviewed,
        'jobReplied' => $jobReplied,
        'jobRejected' => $jobRejected,
        'todayJobCount' => $todayJobCount,
        'jobError' => $jobError,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // mail 
    Route::controller(CustomMailController::class)->prefix('mail')->group(function () {
        Route::get('/', 'index')->name('mail.index');
        Route::post('/store', 'store')->name('mail.store');
        Route::get('/edit/{id}', 'edit')->name('mail.edit');
        Route::put('/update/{id}', 'update')->name('mail.update');
        Route::delete('/delete/{id}', 'destroy')->name('mail.delete');
    });

    // employer 
    Route::controller(EmployerController::class)->prefix('employer')->group(function () {
        Route::get('/', 'index')->name('employer.index');
        Route::post('/store', 'store')->name('employer.store');
        Route::get('/edit/{id}', 'edit')->name('employer.edit');
        Route::put('/update/{id}', 'update')->name('employer.update');
        Route::delete('/delete/{id}', 'destroy')->name('employer.delete');
        Route::put('/change-status/{id}', 'changeStatus')->name('employer.change-status');
        Route::post('/bulk-upload', 'bulkUpload')->name('employer.bulk-upload');
    });

    // resume 
    Route::controller(ResumeController::class)->prefix('resume-cc')->group(function () {
        Route::get('/', 'index')->name('resume.index');
        Route::post('/store', 'store')->name('resume.store');
        Route::get('/edit/{id}', 'edit')->name('resume.edit');
        Route::post('/update/{id}', 'update')->name('resume.update');
        Route::delete('/delete/{id}', 'destroy')->name('resume.delete');
    });

    // job request 
    Route::controller(JobRequestController::class)->prefix('job-request')->group(function () {
        Route::get('/', 'index')->name('job-request.index');
        Route::post('/store', 'store')->name('job-request.store');
        Route::get('/edit/{id}', 'edit')->name('job-request.edit');
        Route::put('/update/{id}', 'update')->name('job-request.update');
        Route::delete('/delete/{id}', 'destroy')->name('job-request.delete');
        Route::put('/save-draft', 'saveAsDraft')->name('job-request.save-draft');
    });
});

Route::get('send-mail', function() {
    $mailConfig = CustomMail::find(4);
    $job = JobRequest::find(1);
    $config = [
        'transport' => 'smtp',
        'host' => env('MAIL_HOST'),
        'port' => env('MAIL_PORT'),
        'from' => ['address' => $mailConfig->username, 'name' => 'Min Thet Paing'],
        'encryption' => env('MAIL_ENCRYPTION'),
        'username' => $mailConfig->username,
        'password' => $mailConfig->password,
    ];
    SendMail::dispatch($config, $job);
});

require __DIR__.'/auth.php';
