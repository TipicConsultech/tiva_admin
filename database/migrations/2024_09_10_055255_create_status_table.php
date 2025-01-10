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
        Schema::create('status', function (Blueprint $table) {
            $table->id(); // Auto-incremental ID
            $table->string('Enquiry_id'); // Email column
            $table->string('remark')->nullable(); // remarks for Enquiry status
            $table->string('updated_by')->nullable();
            $table->timestamps(); // Created at and updated at timestamps 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status');
    }
};
