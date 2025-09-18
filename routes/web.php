<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\InventoryLogController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\LeaderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\WebPageController;
use App\Infrastructure\Models\Instructor;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PostTagController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HeroSliderController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\RouteVisitLogController;
use App\Http\Controllers\ContactMessageController;


Route::get('/', [WebPageController::class, 'home'])->name('site.home');
Route::get('/about-us', [WebPageController::class, 'about'])->name('site.about');
Route::get('/contact-us', [WebPageController::class, 'contact'])->name('site.contact');
Route::get('/teams', [WebPageController::class, 'teams'])->name('site.teams');
Route::get('/services', [WebPageController::class, 'services'])->name('site.services');
Route::get('/finance-options', [WebPageController::class, 'financeOptions'])->name('site.finance-options');
Route::get('/projects', [WebPageController::class, 'projects'])->name('site.projects');
Route::get('/articles', [WebPageController::class, 'articles'])->name('site.articles');
Route::get('/events', [WebPageController::class, 'events'])->name('site.events');
Route::get('/awards', [WebPageController::class, 'awards'])->name('site.awards');
Route::get('/careers', [WebPageController::class, 'careers'])->name('site.careers');
Route::get('/notices', [WebPageController::class, 'notices'])->name('site.notices');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('awards', AwardController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('contacts', ContactController::class);
        Route::resource('contact-messages', ContactMessageController::class);
        Route::resource('events', EventController::class);
        Route::resource('galleries', GalleryController::class);
        Route::resource('hero-sliders', HeroSliderController::class);
        Route::resource('likes', LikeController::class);
        Route::resource('media', MediaController::class);
        Route::resource('notices', NoticeController::class);
        Route::resource('pages', PageController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('products', ProductController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('route-visit-logs', RouteVisitLogController::class);
        Route::resource('services', ServiceController::class);
        Route::resource('settings', SettingController::class);
        Route::resource('tags', TagController::class);
        Route::resource('teams', TeamController::class);
        Route::resource('instructors', InstructorController::class);
        Route::resource('leaders', LeaderController::class);
        Route::resource('students', StudentController::class);
        Route::resource('partners', PartnerController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('visitors', VisitorController::class);
        Route::resource('careers', CareerController::class);
        Route::resource('job-applications', JobApplicationController::class);
        // Users
        // Route::resource('users', UserController::class);
    });
