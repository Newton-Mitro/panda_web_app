<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('instructor_id', 20)->unique();
            $table->string('name', 100);
            $table->string('bio', 100)->nullable();
            $table->string('email')->unique();
            $table->string('phone', 15)->unique()->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['MALE', 'FEMALE', 'OTHER'])->nullable();
            $table->string('designation', 100)->nullable(); // e.g., "Assistant Professor"
            $table->string('department', 100)->nullable();  // e.g., "Mathematics"
            $table->string('national_id_no', 20)->nullable();
            $table->enum('religion', ['ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER'])->nullable();
            $table->text('address')->nullable();
            $table->integer('sort_order')->default(0);
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};
