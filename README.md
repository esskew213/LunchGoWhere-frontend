# LunchGoWhere: Crowdsourced reviews of the best hawker food around

## User Problem
_“Where should we go today?”_ That’s what we ask whenever lunchtime rolls around. Google Maps has plenty of eateries listed, but:
1. It’s hard to find food based on price point and wait time (both important factors for busy office workers), and
2. It’s missing a lot of hawker stalls — the cornerstone of Singapore’s thriving food scene.

## Our Solution
We've created a dedicated platform where users can post reviews of hawker stalls, and find well-reviewed hawkers at their preferred location, price point and wait time.

## Tech Stack
This is a MERN stack app that is deployed to Heroku and Netlify, and uses MongoDB Atlas as the database. Images uploaded by users are stored on Cloudinary. Frontend styling is done with Material UI.

## API Calls
| Purpose        | HTTP Verb  |
| ------------- |-------------|
| User login     |POST |
| User signup     | POST |
| User logout     | GET |
| Authenticate user (protect React routes)  | GET |
| User signup     | POST |
| Display recommendations    | GET |
| Submit search and retrieve results   | POST |
| Submit new stall  | POST |
| Get info for one stall   | GET |
| Check for /get previous review  | GET |
| Submit review  | POST |
| Update review  | PATCH |
| Delete review  | DELETE |
| Get nearest hawker centres based on user location | POST |

## Product Requirements
We broke down the project by user story and task, as follows:
- *A user with an account should be able to log in. A new user should be able to create an account with a username and password.*
    - Set up Mongo collection, schema and model for user
    - Write Express API to post new user and authenticate existing user
    - Create landing page with signup modal that posts new user when done
    - Add login form to landing page that authenticates browser session and routes to home page when done
- *A logged-in user should be able to add a new hawker stall and upload an image of the stall (for way-finding).*
    - Set up Mongo collection, schema and model for stall (with stall name and hawker centre it resides in
    - Write API to post new stall
    - Configure Cloudinary and multer middleware for image upload
    - Create add stall page with form that posts new stall and redirects user to that stall’s review page (so that they can proceed with adding a review)
        - Style page
        - Implement form validations (in particular, only let users upload one image)
- *A logged-in user should be able to review a stall.*
    - Set up Mongo collection, schema and model for review (price, wait time, cuisine)
    - Write API to post new review
    - Create results page for each stall with a button to add a review
    - Create a review modal with a form that lets users post a new review
    - If a user has already submitted a review, they should only be able to edit that review or delete it, not post a new one.
- *A logged-in user should be able to search for a stall, filtering by location, price and wait time.*
    - To the home page, add a search form that lets user key in a location **with autocomplete suggestions**, and select price range and wait time range.
        - Implement form validations
        - Create the GET API that returns all hawker stalls that match the filters
    - Create a results display for the search results; users can click on each result to go to the individual result page
- *A logged-in user should be able to view the results for an individual stall.*
    - Create the GET API that returns the details of that stall, including average price, waiting time and percentage of people who would eat again / queue again
    - Augment the home page to display these details. When a user posts a new review, they will be redirected to this page with the latest computed stats
- *A logged-in user should have recommendations displayed on their home page.*
    - Write the API that returns a random list of recommended places, e.g. based on top-rated
    - Display the recommendations on the home page
- *A user should be able to log out.*
    - Add a log-out button on the user’s home page
    - Write API to clear the relevant cookies from the browser
- *Logged-out users should not be able to access any of the routes except the landing page.*
    - Protect all routes with a function that pings the backend to check whether a user is logged in (via verifying the JWT token)

## Challenges and Future Work
- Working in a team and using Git effectively was a very good, albeit challenging, learning experience. In particular, we realised the importance of configuring our linters to the same settings! We also learnt how to deconflict code and read PRs.
- There could definitely be further improvements to form and data validation. Given more time, we would have used JOI to ensure that data submitted in forms was of the correct type.
- We would also add a sort button to let users sort search results by rating, price and wait time, and a "My Activity" page to let users see the stalls / reviews they have contributed at a glance.
- Last but not least, we considered using the Google Maps autocomplete API to allow users to type in a location of their choice, and find stalls close by (as opposed to being constrained to searching by hawker centre). However, we did not implement this for the project as we did not want to pay to use the API. :P
- 
