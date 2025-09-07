<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Career;
use App\Infrastructure\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $careerId = $request->input('career_id'); // Selected career filter

        // Get all open careers
        $openCareers = Career::where('status', 'open')->get();

        // Get applications filtered by selected career or all open careers
        $applications = JobApplication::with('career')
            ->when($careerId, function ($query, $careerId) {
                $query->where('career_id', $careerId);
            })
            ->whereHas('career', function ($query) {
                $query->where('status', 'open');
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('job_applications/index', [
            'applications' => $applications,
            'careers' => $openCareers,
            'selectedCareer' => $careerId,
        ]);
    }


    public function show(JobApplication $jobApplication)
    {
        return Inertia::render('job_applications/show', [
            'application' => $jobApplication->load('career'),
        ]);
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return redirect()->route('job_applications.index')
            ->with('success', 'Application deleted.');
    }

    /**
     * Update the status of a job application.
     */
    public function updateStatus(Request $request, JobApplication $jobApplication)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,reviewed,shortlisted,interviewing,offered,hired,rejected',
        ]);

        $jobApplication->update([
            'status' => $data['status'],
        ]);

        return redirect()->back()->with('success', "Application status updated to {$data['status']}.");
    }
}
