# Technical Trial Objective - FrontEnd CrossOver - Gerardo de la Rosa

#### Objective
Develop the frontend of a single page application. It is a video portal, where users can login, see video listings, navigate to a single video, rate videos and can perform all media related tasks e.g. Play, Pause, Adjust volume and seek video position. (You can use the default HTML5 video player controls)

#### Client side tools
  - AngularJS (1.X)
  - Jasmine
  - Material Lite
  - SASS
#### Functional Requirements
 - Develop a single page application by using one of the allowed MVV* frameworks.
 - Design the UI, which should be motivated by the provided visuals.
 - Implement user authentication. The content of this application should not be visible to public.
 - User should be able to see video listings on index page. Only first 10 videos should be loaded initially.
 - Lazy loading should be implemented i.e. More videos should appear as the user scrolls down the listing.
 - Users should not be able to play more than 1 video simultaneously. Playing a video should pause all other videos.
 - Users should be able to rate videos, an overall rating for each video should also be displayed.
 - Users should be able to open the video details page by clicking on video title.
 - REST API should be consumed.
 - Unit tests with at least 50% code coverage should be provided.

#### Development
ALl functional and non-functional requirements were completed, the app structure is: 

/root

--client(FrontEnd folder)

--unitTest(Unit Test files)

--backend_folders (backend files)
    

In order to run the front-end, first we need to run backend with

    npm start
Then we put the front-end code on client folder and the app will be ready.

The unit test is available on unitTaste folder, in this case we just need to open the html file 'runner.html' and all the testing dashboard will be displayed.

### Note
I download the libs files in order to test the application offline, but instead I prefer always to use CDN.
