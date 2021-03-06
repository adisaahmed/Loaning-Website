<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
        ],

        // Database settings
        'db' => [
            'host' => 'localhost',
            'user' => 'effluxco_general',
            'pass' => '8erd+g%k*Cv%',
            'dbname' => 'effluxco_ecogeneral'
        ],
        'default_address' => [
            'email' => 'admin@tm30.net',
            'name' => 'Hello',
            'password' => 'ademola123?'
        ],
        'admin_address' => [
            'email' => 'styccs@gmail.com',
            'name' => 'Admin',
        ]
    ]
];
