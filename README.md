1. Members: Zichuan Zhang, Zhimin Liang

2. Describe your data model and the 3 collections you will use.

--Users collection           
  uid
  email
  userName
  phoneNum:
  location:
  userAvatar
  post:[],
  followers:[],
  following:[]

--Posts collection
  UserID
  Description
  Image_URL
  Timestamp
  Location
  Weather(external API)
  CommentsID

--Comments collection
  postId: The ID of the post the comment is related to.
  userId : The UID of the user who made the comment.
  text : The comment text.
  Timestamp: The time when the comment was made.


3. Describe which of the CRUD operations are implemented on which collections.
   
   We use CRUD in the User collection, we write user information in user collection when signup account,
   and in the editProfile, the app will fetch(read) the exist information from database, and it also allow user to updata the personal information,
   In the profile page, we enble user to delete their account which will delete the docID in user collection and then signout the app 

5. Your readme should reflect the current state of the application, with screenshots as appropriate (at least 1)
   

6. A detailed description of what each member has contributed so far.
   
   ZiChuan Zhang:
   
   Zhimin Liang: Setup the base environment of the app
                 Create navigator tab, add signin and signup screen
                 Write post screen content which allows user to add description and photo from libary or camera, and write the post to collection
                 Write profile screen which fetch post history for login user, and allow user navigate to detail page for each post item
                 Write editProfile screen,which fetch(read) the exist information from database, and  allow user to updata the personal information
                 Add delete button in the profile page to allow  user to delete their account which will delete the docID in user collection and then signout the app
                 Add fetchInfoById and updateFromDB function in firebaseHelper to allow user to read data by id and updata data from database

                 
