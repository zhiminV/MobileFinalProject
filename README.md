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





Iteration 2: 

We have add the following functionalities ：
-- Authentication: 
From start page, we will navigate to to signUp screen, and user can signup or signIn if they have account, after login, it will navigate to Home
![IMG_8689](https://github.com/zhiminV/MobileFinalProject/assets/122182731/782652c2-1e10-4657-a094-716a12ea3566)
![IMG_8690](https://github.com/zhiminV/MobileFinalProject/assets/122182731/84966e88-5c3a-4ab2-941d-8b2bff9877d1)
![IMG_8691](https://github.com/zhiminV/MobileFinalProject/assets/122182731/db42021e-625c-4583-8d4b-fb13a5c5b8fa)
![IMG_8692](https://github.com/zhiminV/MobileFinalProject/assets/122182731/35811d36-efdd-4864-ad45-e895efa6fc2e)
![IMG_8679](https://github.com/zhiminV/MobileFinalProject/assets/122182731/52ddb361-5d95-4a7e-9f54-0651e9bd8844)

-- Camera, Location, External API:
   Camera:  In post screen, user can choose camera ot photos from libary, and in edit page, user can change their avatar
   Location: In post screen, user can press location to locate their current position, and it will show the address 
   External API: We use weather as out external API, after selcet location, user ia able to get their local weather base on the location 
   ![IMG_8681](https://github.com/zhiminV/MobileFinalProject/assets/122182731/25e825ef-b018-4911-aec7-3cdee5b161a4)
    ![IMG_8682](https://github.com/zhiminV/MobileFinalProject/assets/122182731/5a994e30-2c11-4113-b6ee-007c79de9b88)
    ![IMG_8685](https://github.com/zhiminV/MobileFinalProject/assets/122182731/b3d93525-9931-4571-bcf0-5954fff2f46a)

-- We have not add notification, so there is no reaction when you click notification
![IMG_8683](https://github.com/zhiminV/MobileFinalProject/assets/122182731/da8ee4cb-4e1b-42b7-ab8b-fa6c29d58b1a)

when you click post history, you can see the list of all your posts, and click each postId you can navigate to the post Detail
![IMG_8686](https://github.com/zhiminV/MobileFinalProject/assets/122182731/62b0954b-0080-4bbe-90d3-1c3aacbd387c)
![IMG_8687](https://github.com/zhiminV/MobileFinalProject/assets/122182731/e0b95169-3bf0-4489-b730-55b2d0e699f0)

A detailed description of what each member has contributed:

ZiChuan Zhang: Fixed errors from iteration 1. Completely remade the home screen. Fixed the TimeLine component entirely. 

Zhimin Liang: fix error in interation1, add location and external api , improve layout and style of post, profile, postlist, and postDetail screen





Iteration 3: 

1.  We have add the following functionalities ：
 
-- Notification: user can set notification to remind them to post every day

![IMG_8863](https://github.com/zhiminV/MobileFinalProject/assets/122182731/cb12cd5f-9a5b-48bf-9c83-db765fc4890a)

![IMG_8864](https://github.com/zhiminV/MobileFinalProject/assets/122182731/eef84acb-c0fc-4eb4-ba95-ca5313b59746)

![IMG_8865](https://github.com/zhiminV/MobileFinalProject/assets/122182731/a5239554-742b-4ae0-bda8-c5e2963c4c7c)

![IMG_8866](https://github.com/zhiminV/MobileFinalProject/assets/122182731/8c38ec07-38f7-4077-92aa-a3399fa5fb85)

![IMG_8867](https://github.com/zhiminV/MobileFinalProject/assets/122182731/ac5c66a9-d6c5-4781-876e-ff1d3b8b8bc6)

-- Commment: User can write comments to thier friends
![IMG_8860](https://github.com/zhiminV/MobileFinalProject/assets/122182731/363666ed-7328-4e32-919b-b4611a8cc60e)

![IMG_8861](https://github.com/zhiminV/MobileFinalProject/assets/122182731/f746ba63-48ce-41f0-96b8-b51b7d73cedc)

-- VisitMap: user can see all their post location 
![IMG_8848](https://github.com/zhiminV/MobileFinalProject/assets/122182731/4ddb7249-2481-4fa7-b4a5-dd8b243e7f5f)


2.   we have make some improvement for our app:
   
-- Start Screen : add own design logo and improve styling

![IMG_8857](https://github.com/zhiminV/MobileFinalProject/assets/122182731/8e5eab08-6900-48ff-a183-5cae1369aa6c)

![IMG_8858](https://github.com/zhiminV/MobileFinalProject/assets/122182731/d9e6a1a2-fbbe-4139-9187-77202f3a0b6b)

![IMG_8859](https://github.com/zhiminV/MobileFinalProject/assets/122182731/f08edb76-eb78-4e07-ba7e-076d4a104051)

-- Post Screen : improve delete icon and styling

![IMG_8847](https://github.com/zhiminV/MobileFinalProject/assets/122182731/89c839a2-0e46-4738-8e37-14676e7b543e)

-- Post History Screen : show post base on time line

![IMG_8854](https://github.com/zhiminV/MobileFinalProject/assets/122182731/cd0f1bbb-daae-416f-84b0-37a752ce0fc2)

-- Post Detail Screen: improve delete styling and improve layout for different amount of images 

![IMG_8855](https://github.com/zhiminV/MobileFinalProject/assets/122182731/01a86dbb-c240-44b8-ba92-0d3353da3f1f)

![IMG_8856](https://github.com/zhiminV/MobileFinalProject/assets/122182731/1a621b5e-779a-4a21-93b6-3a0cb59262c8)



3. A detailed description of what each member has contributed:

ZiChuan Zhang: 

Zhimin Liang: fix error, add Visitmap ,  notification and postlist , improve layout and style of post, editpage and postDetail screen


Demo link: https://www.youtube.com/watch?v=9PA3WveNp-g 

