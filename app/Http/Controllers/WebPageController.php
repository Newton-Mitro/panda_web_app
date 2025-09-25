<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Article;
use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Career;
use App\Infrastructure\Models\Contact;
use App\Infrastructure\Models\Event;
use App\Infrastructure\Models\Gallery;
use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Notice;
use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\PageSection;
use App\Infrastructure\Models\Project;
use App\Infrastructure\Models\Service;
use App\Infrastructure\Models\Team;
use App\Infrastructure\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebPageController extends Controller
{
    public function home()
    {
        $homePage = Page::where('slug', 'home')->with(['sections.media', 'media'])->first();
        $heroSlides = HeroSlider::where('status', 'Active')
            ->orderBy('sort_order')
            ->get();
        $teams = Team::where('status', 'Active')->with('media')->orderBy('sort_order')->take(5)->get();
        $services = Service::where('status', 'Active')->with(['media'])->orderBy('sort_order')->take(3)->get();
        $testimonials = Testimonial::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $awards = Award::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $notices = Notice::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $events = Event::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $articles = Article::where('status', 'Published')->orderBy('sort_order')->take(5)->get();
        $projects = Project::where('status', 'Active')->orderBy('sort_order')->take(5)->get();


        return Inertia::render('site/home-page', [
            'page' => $homePage,
            'heroSlides' => $heroSlides,
            'teams' => $teams,
            'services' => $services,
            'testimonials' => $testimonials,
            'awards' => $awards,
            'notices' => $notices,
            'events' => $events,
            'articles' => $articles,
            'projects' => $projects
        ]);
    }

    public function about()
    {
        $page = Page::with(['sections.media'])
            ->where('slug', 'about-us')
            ->first();

        return Inertia::render('site/about-page', [
            'page' => $page
        ]);
    }

    public function ourStory()
    {
        $page = Page::with(['sections.media'])
            ->where('slug', 'our-story')
            ->first();

        return Inertia::render('site/our-story-page', [
            'page' => $page
        ]);
    }

    public function missionVision()
    {
        $page = Page::with(['sections.media'])
            ->where('slug', 'mission-vision')
            ->first();

        return Inertia::render('site/mission-vision-page', [
            'page' => $page
        ]);
    }

    public function faq()
    {
        $aboutPage = Page::with(['sections.media'])
            ->where('slug', 'faq')
            ->first();

        return Inertia::render('site/faq-page', [
            'page' => $aboutPage
        ]);
    }

    public function termsOfService()
    {
        $aboutPage = Page::with(['sections.media'])
            ->where('slug', 'terms-of-service')
            ->first();

        return Inertia::render('site/terms-of-service-page', [
            'page' => $aboutPage
        ]);
    }

    public function privacyPolicy()
    {
        $aboutPage = Page::with(['sections.media'])
            ->where('slug', 'privacy-policy')
            ->first();

        return Inertia::render('site/privacy-policy-page', [
            'page' => $aboutPage
        ]);
    }

    public function disclaimer()
    {
        $aboutPage = Page::with(['sections.media'])
            ->where('slug', 'disclaimer')
            ->first();

        return Inertia::render('site/disclaimer-page', [
            'page' => $aboutPage
        ]);
    }

    public function contact()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('site/contact-page', [
            'contacts' => $contacts
        ]);
    }

    public function teams(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $teams = Team::with('media', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/our-team-page', [
            'teams' => $teams,
        ]);
    }

    public function services(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $services = Service::with('media', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/services-page', [
            'services' => $services,
        ]);
    }

    public function financeOptions()
    {
        $page = Page::with(['sections.media'])
            ->where('slug', 'finance-options')
            ->first();
        return Inertia::render('site/finance-options-page', [
            'page' => $page
        ]);
    }

    public function projects(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $projects = Project::with('media', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/projects-page', [
            'projects' => $projects,
        ]);
    }

    public function articles(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $articles = Article::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('site/articles-page', [
            'articles' => $articles,
        ]);
    }

    public function awards(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $awards = Award::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('site/awards-page', [
            'awards' => $awards,
        ]);
    }

    public function careers(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $jobCirculars = Career::latest()
            ->get();
        return Inertia::render('site/careers-page', [
            'jobCirculars' => $jobCirculars,
        ]);
    }

    public function notices(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $notices = Notice::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('site/notices-page', [
            'notices' => $notices,
        ]);
    }

    public function galleries(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $galleries = Gallery::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('site/galleries-page', [
            'galleries' => $galleries,
        ]);
    }
}
