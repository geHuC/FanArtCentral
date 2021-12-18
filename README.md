## FanArt Central
FanArt Central is my graduation project for the ReactJS course held by [SoftUni](https://softuni.bg) . The idea behind the site is to create a place where people can share their fan art with other people.
Live demo of the website can be accessed thanks to [heroku](https://heroku.com) on the following link [https://fanartcentral.herokuapp.com/](https://fanartcentral.herokuapp.com/)

## Tech Stack
The site is build utilizing the **MERN** technology stack (**M**ongo, **E**xpress, **R**eact and **N**ode). 
For persistence of the data a combination of [MongoDBAtlass](https://www.mongodb.com/atlas) for storing the database and [Firebase Storage](https://firebase.google.com/) for file keeping is used.

## User capabilities overview

 **Gues users** can

 - view the homepage
	 	 - filter by popularity/newest
 - search for content
 		 - filter said content by date
 - browse content by tags
		 - filter said content by date
 - view details page of each submission
 - view profile pages of registered users
 - view submission page of registered users
 - view favourites page of registered users
 - login and register
- change the site theme (fist time visit default is based on browser preferences)

**Registered users** can

 - access all the content **Guest users** can
 - submit new fanart
 - edit/delete the fanart they have created
 - follow/unfollow other users 
 - favourite/unfavourite other users content
 - access a **Feed** page that shows only content from users they follow
 		 - filter said content by date
 - access a settings page where they can change their biography/name/avatars

## Frontend architecture overview

**Dependacies used**

 - *create-react-app*  
		 - main building block of the whole application and all the goodies that come with it
 - *react-router-dom*
		 - used for routing
 -   *axios*
		 - used to handle requests to the backend server
 -  *react-icons*
		 - used for svg icons
 -  *timeago-react*
		 - only third-party component library used, shows elapsed time from a given date
 

 #
**Custom components used**
Can be divided in a few groups (**containers**,**components**,**hooks**,**services**,**contexts**)

***Containers*** - containers are the wrapper components for the different routes (could be considered views)

 - **About** - a stateless component holding static about data
 -  **Contact** - a stateless component containing a contact form
 -  **Details** - statefull component used to display a single submission entry
			 - interacts with the submission service to load and display the data
 -  **Feed** - statefull component used to display a users feed 
			 - interacts with the submission service and with the userContext to load the data and utilizes the ***Carousel*** component to display it
 -  **Home** - statefull component used to display an ***infinite scroll***  feed of all the content
			 - interacts with the submission service and with the userContext to load the data and utilizes the ***Carousel*** component to display it
 -  **Login** - statefull component used to contain the login form
 -  **NotFound** - stateless component holding the 404 error
 -  **Profile** - statull component that display the user's latest submission and favourites their statistics like view counts, subscriber count as well as their bio.
 -  **Register** - statefull component used to contain the register form
 -  **Search** -statefull component that interacts with the submission service to get the search results and utilizes the ***Carousel*** component to display it
 -  **Settings** statefull component that holds a form allowing the user to change their name/biography/avatar.
 - **Submit** statefull component that holds a form allowing the user to submit new content.
 -  **TagsContainer** statefull component that interacts with the submission service to get the tagged content and utilizes the ***Carousel*** component to display it
 - **UserFavourites** statefull component displaying data about the user and all their favourites
 - **UserSubmissions** statefull component displaying data about the user and all their submissions


***Components*** - the list is not exhaustive  will include a few of the most notable.

 - **Carousel** - *"pièce de résistance"* of the application. Takes in an array of submissions and uses the data from them alongside data from the custom hook useWindowDimesions to calculate rows of data for display in such a way as to always have a full grid of items, but keep their respective aspect ratios without cropping them. Does son on the fly - bad for performance perhaps but good for the soul, and anyway how often do you resize a browser window nonstop?
 - **SubmissionCard** - the bread and butter of the application. it is the main way submission data is presented to the user. Takes in the data for a single submission and presents at a glance to the user a thumbnail of the picture, the title, view count, the submitter and an option to favourite then and there.
 - **UserDropDown** - a popup card that shows on username hover that provides additional options to the user to get more data on the give user. Utilizes a bounding rect so that it can display above or below depending on wheter it might not clip out of the screen. In addition uses a fixed position so that it can always appear on top of where it needs to be without clipping.
 - **TagInput** a small component that converts entered tags into actual tag buttons with the ability to dismiss any single one you choose. used in the Submit form and the Edit form.
 - **FavourteButton** - handles the logic behind favouriting and showing whether something has been or not favourited. Optionally takes an argument about the appearance so it can be used as a smal one star button in the **SubmissionCard** or a big text button in the **Details** container.


***Context*** 
	

 - **UserContext** - handles the state of authentication with the help of useReducer, also exposes it's own hook useUserState for easier access to context data in other components. Also handles the setup so various services have access to the auth token.
 - **ThemeContext** - handles the theme context and exposes it's own hook for easier access.

***Hooks***

 - **useWindowDimensions** - the linchpin behind the **Carousel** component, listens to the window for resize events and changes the exposed widow dimensions accordingly.

					
***Utils***

 - **changeTitle** - a homemade version of the only functionality the application scope needs from the Helmet library. (changes the page title so history and bookmarks look nicer)
 - **prettyNumbers** - takes in a number and converts it to a shortened K version eg. 1000 to 1k, 1000000 to 1M and so on.
 - **prettySizes** - similar to **prettyNumbers** but this one converts bytes to KB, MB, GB etc.

 


*File tree for the react source folder*

    │   App.css
	│   App.js
	│   App.test.js
	│   index.css
	│   index.js
	│   reportWebVitals.js
	│   setupTests.js
	│
	├───components
	│   ├───authorControls
	│   │       authorControls.css
	│   │       AuthorControls.js
	│   │
	│   ├───carousel
	│   │       carousel.css
	│   │       Carousel.js
	│   │
	│   ├───categorySelector
	│   │       categorySelector.css
	│   │       CategorySelector.js
	│   │
	│   ├───changeAvatar
	│   │       changeAvatar.css
	│   │       ChangeAvatar.js
	│   │
	│   ├───confirmBox
	│   │       confirmBox.css
	│   │       ConfirmBox.js
	│   │
	│   ├───descriptionTextBox
	│   │       descriptionTextBox.css
	│   │       DescriptionTextBox.js
	│   │
	│   ├───editDialog
	│   │       editDialog.css
	│   │       EditDialog.js
	│   │
	│   ├───favouriteButton
	│   │       favouriteButton.css
	│   │       FavouriteButton.js
	│   │
	│   ├───followButton
	│   │       followButton.css
	│   │       FollowButton.js
	│   │
	│   ├───followerCard
	│   │       followerCard.css
	│   │       FollowerCard.js
	│   │
	│   ├───followersRow
	│   │       followersRow.css
	│   │       FollowersRow.js
	│   │
	│   ├───footer
	│   │       footer.css
	│   │       Footer.js
	│   │
	│   ├───formInput
	│   │       formInput.css
	│   │       FormInput.js
	│   │
	│   ├───imageDimensionsCard
	│   │       imageDimensionsCard.css
	│   │       ImageDimensionsCard.js
	│   │
	│   ├───loadintDots
	│   │       loadingDots.css
	│   │       LoadingDots.js
	│   │
	│   ├───loginForm
	│   │       loginForm.css
	│   │       LoginForm.js
	│   │
	│   ├───navbar
	│   │       navbar.css
	│   │       Navbar.js
	│   │
	│   ├───profileDataBar
	│   │       profileDataBar.css
	│   │       ProfileDataBar.js
	│   │
	│   ├───registerForm
	│   │       registerForm.css
	│   │       RegisterForm.js
	│   │
	│   ├───routeGuards
	│   │       RequireAuth.js
	│   │       RequireGuest.js
	│   │
	│   ├───scrollToTop
	│   │       ScrollToTop.js
	│   │
	│   ├───skeletonCarousel
	│   │       skeletonCarousel.css
	│   │       SkeletonCarousel.js
	│   │
	│   ├───submissionCard
	│   │       submissionCard.css
	│   │       SubmissionCard.js
	│   │
	│   ├───submissionsRow
	│   │       submissionsRow.css
	│   │       SubmissionsRow.js
	│   │
	│   ├───tagInput
	│   │       tagInput.css
	│   │       TagInput.js
	│   │
	│   ├───themeSwitch
	│   │       themeSwitch.css
	│   │       ThemeSwitch.js
	│   │
	│   ├───userDropDown
	│   │       userDropDown.css
	│   │       UserDropDown.js
	│   │
	│   └───usernameHoverCard
	│           usernameHoverCard.css
	│           UsernameHoverCard.js
	│
	├───containers
	│   ├───about
	│   │       about.css
	│   │       About.js
	│   │
	│   ├───contact
	│   │       contact.css
	│   │       Contact.js
	│   │
	│   ├───details
	│   │       details.css
	│   │       Details.js
	│   │
	│   ├───feed
	│   │       feed.css
	│   │       Feed.js
	│   │
	│   ├───home
	│   │       home.css
	│   │       Home.js
	│   │
	│   ├───login
	│   │       login.css
	│   │       Login.js
	│   │
	│   ├───notFound
	│   │       notFound.css
	│   │       NotFound.js
	│   │
	│   ├───profile
	│   │       profile.css
	│   │       Profile.js
	│   │
	│   ├───register
	│   │       register.css
	│   │       Register.js
	│   │
	│   ├───search
	│   │       search.css
	│   │       Search.js
	│   │
	│   ├───settings
	│   │       settings.css
	│   │       Settings.js
	│   │
	│   ├───submit
	│   │       submit.css
	│   │       Submit.js
	│   │
	│   ├───tagsContainer
	│   │       tagsContainer.css
	│   │       TagsContainer.js
	│   │
	│   ├───userFavourites
	│   │       userFavourites.js
	│   │
	│   └───userSubmissions
	│           userSubmissions.css
	│           UserSubmissions.js
	│
	├───context
	│       ThemeContext.js
	│       UserContext.js
	│
	├───hooks
	│       useWindowDimensions.js
	│
	├───services
	│       authService.js
	│       submissionService.js
	│       userService.js
	│
	└───utils
        changeTitle.js
        prettyNumbers.js
        prettySizes.js
