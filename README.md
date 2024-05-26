# NextJS Project

## Description
NextJS project

## Main dependency
- NextJS (^12.0.10)
- Redux
- React Helmet
- Prettier & ESLint

## State management 
- ```/src/redux``` - Root redux folder
- ```/src/redux/actions/```
- ```/src/redux/makeStore/```
- ```/src/redux/reducers/```
- ```/src/redux/constants.js```

## SEO management
- ```/src/services/getSEOOptions.js``` - generating SEO options
- ```/src/constants/routes.js``` - SEO settings for different pages

## Requirements
- Installed [NodeJS](https://nodejs.org/uk/) v16.13.0

## How to start
- Download dependencies via NPM  ```npm i```
- To start local build run ```npm run dev```

## Environment variables
- ```API``` - Url of API
- ```BASE_URL``` - Base URL

Located in: ```/.env``` , ```/.env.production``` , ```/.env.development```
