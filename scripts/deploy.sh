#!/bin/bash

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git add --all
git add --force build
git commit -m "Build $TRAVIS_COMMIT"
git push -f "https://$GH_TOKEN@github.com/odota/odota.github.io.git" master
