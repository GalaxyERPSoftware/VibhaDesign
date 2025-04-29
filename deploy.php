<?php

function recursiveCopy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($src . '/' . $file)) {
                recursiveCopy($src . '/' . $file, $dst . '/' . $file);
            }
            else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

// Create public_html directory if it doesn't exist
@mkdir('public_html');

// Copy build directory contents
if (is_dir('build')) {
    recursiveCopy('build', 'public_html');
}

// Copy .htaccess specifically
if (file_exists('build/.htaccess')) {
    copy('build/.htaccess', 'public_html/.htaccess');
}

echo "Deployment completed successfully\n"; 