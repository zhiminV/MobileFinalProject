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
   ![IMG_8542](https://github.com/zhiminV/MobileFinalProject/assets/122182731/4ac7fecd-cea9-46f4-9319-31ab387a5f49)
   ![IMG_8539](https://github.com/zhiminV/MobileFinalProject/assets/122182731/d7ad6b57-14bc-4ebf-b4ff-0ffce003bb64)
![IMG_8540](https://github.com/zhiminV/MobileFinalProject/assets/122182731/7ce9e119-f620-4432-a0f1-623520b6ffcf)
   ![IMG_8534](https://github.com/zhiminV/MobileFinalProject/assets/122182731/48e662d9-688d-467c-877d-cd658530160b)
   ![IMG_8535](https://github.com/zhiminV/MobileFinalProject/assets/122182731/6f6ae253-3b9a-411e-b811-343980661518)
   ![IMG_8536](https://github.com/zhiminV/MobileFinalProject/assets/122182731/d5df2598-8f58-4d5f-9dd1-e26088d0905e)



7. A detailed description of what each member has contributed so far.
   
   ZiChuan Zhang: Implemented the home screen. Search Functionality, Signin/Signup.
   
   Zhimin Liang: Setup the base environment of the app
                 Create navigator tab, add signin and signup screen
                 Write post screen content which allows user to add description and photo from libary or camera, and write the post to collection
                 Write profile screen which fetch post history for login user, and allow user navigate to detail page for each post item
                 Write editProfile screen,which fetch(read) the exist information from database, and  allow user to updata the personal information
                 Add delete button in the profile page to allow  user to delete their account which will delete the docID in user collection and then signout the app
                 Add fetchInfoById and updateFromDB function in firebaseHelper to allow user to read data by id and updata data from database




