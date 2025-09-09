<?php

namespace App\Http\Controllers;

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
        return Inertia::render('site/contact');
    }

    public function team()
    {
        return Inertia::render('site/team');
    }

    public function services()
    {
        return Inertia::render('site/services');
    }

    public function projects()
    {
        return Inertia::render('srojects');
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
