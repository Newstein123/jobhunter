<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('custom_mails');
            $table->foreignId('receipt_id')->constrained('employers');
            $table->foreignId('resume_id')->constrained('resumes');
            $table->integer('mail_type')->comment('0=traditional, 1=modern')->default(0);
            $table->integer('status')->comment('0=default', '1=processing', '2=reply', '3=interview', '4=reject')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_requests');
    }
};
