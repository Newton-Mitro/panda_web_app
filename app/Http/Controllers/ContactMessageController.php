<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::latest()->paginate(10);

        return Inertia::render('contact_messages/index', [
            'contactMessages' => $messages,
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        return Inertia::render('contact_messages/show', [
            'message' => $contactMessage,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return redirect()->route('contact-messages.index')
            ->with('success', 'Message deleted successfully.');
    }
}
