<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryLogController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\WebPageController;
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
Route::get('/about', [WebPageController::class, 'about'])->name('site.about');
Route::get('/contact', [WebPageController::class, 'contact'])->name('site.contact');
Route::get('/team', [WebPageController::class, 'team'])->name('site.team');
Route::get('/services', [WebPageController::class, 'services'])->name('site.services');
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


Route::get('/awards', [AwardController::class, 'publicIndex'])->name('awards.publicIndex');
Route::get('/awards/{award}', [AwardController::class, 'publicShow'])->name('awards.publicShow');

Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        // Awards
        Route::resource('awards', AwardController::class);

        // Careers
        Route::resource('jobs', JobController::class);

        // Categories
        Route::resource('categories', CategoryController::class);

        // Contacts
        Route::resource('contacts', ContactController::class);

        // Contact Messages
        Route::resource('contact-messages', ContactMessageController::class);

        // Events
        Route::resource('events', EventController::class);

        // Galleries
        Route::resource('galleries', GalleryController::class);

        // Hero Sliders
        Route::resource('hero-sliders', HeroSliderController::class);

        // Likes
        Route::resource('likes', LikeController::class);

        // Media
        Route::resource('media', MediaController::class);

        // Notices
        Route::resource('notices', NoticeController::class);

        // Pages
        Route::resource('pages', PageController::class);

        // Posts
        Route::resource('articles', ArticleController::class);

        // Post Tags
        Route::resource('post-tags', PostTagController::class);

        // Products
        Route::resource('products', ProductController::class);

        // Projects
        Route::resource('projects', ProjectController::class);

        // Route Visit Logs
        Route::resource('route-visit-logs', RouteVisitLogController::class);

        // Services
        Route::resource('services', ServiceController::class);

        // Settings
        Route::resource('settings', SettingController::class);

        // Tags
        Route::resource('tags', TagController::class);

        // Teams
        Route::resource('teams', TeamController::class);

        Route::prefix('partners')->name('partners.')->group(function () {
            Route::get('/', [PartnerController::class, 'index'])->name('index');
            Route::get('/create', [PartnerController::class, 'create'])->name('create');
            Route::post('/', [PartnerController::class, 'store'])->name('store');
            Route::get('/{partner}', [PartnerController::class, 'show'])->name('show');
            Route::get('/{partner}/edit', [PartnerController::class, 'edit'])->name('edit');
            Route::put('/{partner}', [PartnerController::class, 'update'])->name('update');
            Route::delete('/{partner}', [PartnerController::class, 'destroy'])->name('destroy');
        });

        // Testimonials
        Route::resource('testimonials', TestimonialController::class);

        // Visitors
        Route::resource('visitors', VisitorController::class);

        // Appointments
        // Route::resource('appointments', AppointmentController::class);
    
        // Job Circulars
        Route::resource('careers', CareerController::class);

        // Job Applications
        Route::resource('job_applications', JobApplicationController::class);

        // Classes
        // Route::resource('classes', ClassController::class);
    
        // Students
        Route::resource('students', StudentController::class);

        // Inventory Logs
        Route::resource('inventory_logs', InventoryLogController::class);

        // Orders
        Route::resource('orders', OrderController::class);

        // Cupons
        Route::resource('cupons', CuponController::class);

        // Payments
        Route::resource('payments', PaymentController::class);

        // Users
        // Route::resource('users', UserController::class);
    });
