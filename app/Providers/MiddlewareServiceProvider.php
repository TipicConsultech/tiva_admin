<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use App\Http\Middleware\Cors;

class MiddlewareServiceProvider extends ServiceProvider
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
    // public function boot(Router $router): void
    // {
    //     // Register route middleware alias
    //     $router->aliasMiddleware('cors', Cors::class);
    // }
}
