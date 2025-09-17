<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebPageController extends Controller
{
    public function home()
    {
        return Inertia::render('site/welcome');
    }

    public function about()
    {
        return Inertia::render('site/about');
    }

    public function contact()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('site/contact', [
            'contacts' => $contacts
        ]);
    }

    public function teams()
    {
        return Inertia::render('site/teams');
    }

    public function services()
    {
        return Inertia::render('site/services');
    }

    public function products()
    {
        return Inertia::render('site/products');
    }

    public function projects()
    {
        return Inertia::render('site/projects');
    }

    public function articles()
    {
        return Inertia::render('site/articles');
    }

    public function events()
    {
        return Inertia::render('site/events');
    }

    public function awards()
    {
        return Inertia::render('site/awards');
    }

    public function careers()
    {
        return Inertia::render('site/careers');
    }

    public function notices()
    {
        return Inertia::render('site/notices');
    }
}
