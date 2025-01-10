<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\Contracts\Http\Kernel;
use App\Http\Middleware\Authorization;
use App\Http\Middleware\Cors;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Router $router, Kernel $kernel): void
    {
        // Alias the Authorization middleware
        $router->aliasMiddleware('role', Authorization::class);

        // Register the CORS middleware globally
        $kernel->pushMiddleware(Cors::class);
    }
}
