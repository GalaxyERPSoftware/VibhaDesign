#!/bin/bash

echo "Starting deployment process..."

# Pull the latest changes from the repository
git pull origin main

# Install/update Composer dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader

# Clear any caches if needed
if [ -d "cache" ]; then
    rm -rf cache/*
    echo "Cache cleared"
fi

# Set proper permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# If there are any database migrations, you can uncomment and modify these lines
# echo "Running database migrations..."
# php artisan migrate --force

echo "Deployment completed successfully!" 