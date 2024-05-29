#!/bin/bash

docker stop travel-gen-ai-webapp-container

docker rm travel-gen-ai-webapp-container

docker rmi travel-gen-ai-webapp

docker build -t travel-gen-ai-webapp .

docker run -p 3001:3000 --name travel-gen-ai-webapp-container travel-gen-ai-webapp