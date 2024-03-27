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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->mediumText('mail_address');
            $table->string('name');
            $table->mediumText('reputation');
            $table->string('job_portal');
            $table->enum('country', ['Thai', 'Singapore', 'Honkong', 'Dubai']);
            $table->string('position')->default('Mid-Senior PHP Developer');
            $table->integer('status')->comment('0=notsend, 1=send')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
