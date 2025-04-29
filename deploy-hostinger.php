<?php
/**
 * Simple deployment script for Hostinger
 */

// Configuration
$publicHtmlPath = __DIR__ . '/public_html';
$buildPath = __DIR__ . '/build';

// Ensure directories exist
if (!file_exists($publicHtmlPath)) {
    mkdir($publicHtmlPath, 0755, true);
}

// Function to recursively copy files
function copyDirectory($source, $destination) {
    if (!is_dir($source)) {
        return false;
    }

    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    $dir = dir($source);
    while (false !== ($entry = $dir->read())) {
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        $sourcePath = $source . '/' . $entry;
        $destPath = $destination . '/' . $entry;

        if (is_dir($sourcePath)) {
            copyDirectory($sourcePath, $destPath);
        } else {
            copy($sourcePath, $destPath);
        }
    }

    $dir->close();
    return true;
}

// Clear existing files in public_html
$files = glob($publicHtmlPath . '/*');
foreach ($files as $file) {
    if (is_file($file)) {
        unlink($file);
    } elseif (is_dir($file)) {
        system('rm -rf ' . escapeshellarg($file));
    }
}

// Copy build files to public_html
if (file_exists($buildPath)) {
    copyDirectory($buildPath, $publicHtmlPath);
    echo "Deployment completed successfully\n";
} else {
    echo "Error: Build directory not found\n";
    exit(1);
}

// Remove any source map files
array_map('unlink', glob($publicHtmlPath . '/static/**/*.map', GLOB_BRACE));

echo "Deployment script completed\n"; 