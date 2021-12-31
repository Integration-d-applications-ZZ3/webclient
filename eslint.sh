#!/bin/bash

# Run linter on all TypeScript files
yarn run eslint $(find src/ -type f -regex ".*\.ts.*")
