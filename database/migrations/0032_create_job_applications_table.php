<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();

            // Link to career
            $table->foreignId('career_id')->constrained('careers')->onDelete('cascade');

            // Applicant Personal Info
            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('portfolio_url')->nullable();

            // Resume & Documents
            $table->string('resume_path')->nullable(); // CV / Resume
            $table->string('cover_letter_path')->nullable(); // optional separate file
            $table->longText('why_choose')->nullable(); // text input version

            // Additional applicant data
            $table->string('highest_qualification')->nullable(); // e.g. Bachelor, Master
            $table->string('experience_level')->nullable(); // e.g. Junior, Mid, Senior
            $table->decimal('expected_salary', 12, 2)->nullable();
            $table->date('available_from')->nullable();

            // Application workflow
            $table->enum('status', [
                'pending',        // just applied
                'reviewed',       // HR viewed
                'shortlisted',    // moved to next stage
                'interviewing',   // interview scheduled
                'offered',        // job offered
                'hired',          // applicant hired
                'rejected',       // not selected
            ])->default('pending');

            // Meta
            $table->string('applied_via')->nullable(); // e.g. LinkedIn, Referral, Website
            $table->ipAddress('ip_address')->nullable();
            $table->text('notes')->nullable(); // HR/admin internal notes

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
