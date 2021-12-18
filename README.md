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
			 - interacts with the submission service and with the userContext to load and display the data
 -  **Home** - statefull component used to display an ***infinite scroll***  feed of all the content
			 - interacts with the submission service and with the userContext to load and display the data
					

 


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
