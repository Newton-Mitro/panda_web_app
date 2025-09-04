<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->string('title');                     // Job Title
            $table->string('slug')->unique();            // SEO-friendly URL
            $table->longText('description')->nullable(); // Job description
            $table->longText('requirements')->nullable();// Qualifications & requirements
            $table->longText('responsibilities')->nullable(); // Detailed job duties
            $table->string('location')->nullable();      // Job location
            $table->boolean('is_remote')->default(false);// Remote option?

            // Salary & Benefits
            $table->string('salary_range')->nullable();  // e.g. "50k-70k/year"
            $table->decimal('min_salary', 12, 2)->nullable();
            $table->decimal('max_salary', 12, 2)->nullable();
            $table->string('currency', 10)->default('USD');
            $table->json('benefits')->nullable();        // e.g. ["Health Insurance","401k","Paid Time Off"]

            // Job Details
            $table->enum('employment_type', [            // Type of employment
                'full-time',
                'part-time',
                'contract',
                'internship',
                'temporary'
            ])->default('full-time');
            $table->enum('experience_level', [           // Required seniority
                'entry',
                'junior',
                'mid',
                'senior',
                'lead'
            ])->default('entry');
            $table->string('department')->nullable();    // e.g. Engineering, HR
            $table->string('job_function')->nullable();  // e.g. Software Engineer, Accountant
            $table->string('education_level')->nullable();// e.g. Bachelor's, Master's, PhD

            // Application & Workflow
            $table->date('deadline')->nullable();        // Application deadline
            $table->enum('status', ['open', 'closed', 'draft'])->default('open');
            $table->integer('positions')->default(1);    // Number of hires for this role
            $table->integer('applications_count')->default(0); // Counter of applicants

            // Meta
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
