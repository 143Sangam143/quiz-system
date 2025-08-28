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
        Schema::table('roles', function (Blueprint $table) {
            $table->unsignedBigInteger('admin_id')->nullable()->after('id'); 
            $table->integer('hierarchy')->nullable()->after('guard_name');
            $table->string('display_name')->nullable()->after('name');
            $table->unique(['admin_id', 'hierarchy']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropUnique(['admin_id', 'hierarchy']);
            $table->dropColumn('hierarchy');
            $table->dropColumn('admin_id');
            $table->dropColumn('display_name');
        });
    }
};
