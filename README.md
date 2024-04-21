# Quickly Code Challenge

## Access the hosted application

The application is also hosted on the internet and can be accessed at [quickly.anantshukla.com](quickly.anantshukla.com)

## How to execute the code locally

You can run the development server using:

```bash
npm run dev or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

The application has three pages:

-   Login: /login
-   Sign up: /signup
-   Profile: /myprofile

## Login Page

Login has a form with two fields: email and password. The form is submitted to the `/auth/login` endpoint. If the user is authenticated, they are navigated to the profile page. If the user is not authenticated, they are shown an error message.

## Sign up Page

The sign up page has a form with multiple fields. Some of the fields are required, and some are optional. The form is submitted to the `/auth/signup` endpoint. If the user is successfully signed up, they are navigated to the login page. Else, if there is an error in signing up, they are shown an error message.

## Profile Page

Profile is a protected route, meaning that the user must be authenticated to access it. It picks up the user's information from the API `/auth/login` endpoint and displays it.
If the user is not authenticated, they will be navigated to the login page.

The page has an option to view the data in plain text that is fetched from the API or in JSON format. This can be toggled by clicking the toggle button.
