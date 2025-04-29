#!/bin/bash

# Copy all build files to public_html
cp -r build/* public_html/

# Copy .htaccess specifically (since it's hidden)
cp build/.htaccess public_html/ 