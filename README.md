# Web-development-Blog system
A blog system developed by nodeJs, Express, MySQL, Ajax
---

### Introduce the blog system
1. Login(logout) and signup system.
2. Search article immediately without refresh page. (by ajax)
3. View article
4. Main page includes:

    a. Post article without refresh

    b. Delete article without refresh

    c. Edit article without refresh

    d. Upload personal picture without refresh (by ajax)
 
 ---
 
 ### Login(logout) and signup system
For sign-in, register, and the MySQL connection methods.

If the user does not have a membership, he or she can click on “Register” to enter the register page.

When creating an account and after logging in, it is necessary to prevent entering empty values, verify the account password, and display an error message on the page immediately.

After signup or signin, the page will show message immediately.

 <img src="https://user-images.githubusercontent.com/63782903/170741495-89fdf73a-b830-4d15-9f68-7597390a3cee.png" width=50%/>
 
 ---
 
 ### Search article
 After searching keyword, then show the relation article. (not only article title but also author name)
 
 In this section, we can see the search can update the article results in real-time which was use **"Ajax"** accomplish
 
 <img src="https://user-images.githubusercontent.com/63782903/170742485-c188d9ee-2518-463e-aeef-8e2fda7548bb.png" width=50% />
 
 ---
 
 ### Main page
The main page as show in following:

<img src="https://user-images.githubusercontent.com/63782903/170743426-a2c2ccf9-f4a8-4da7-b3a0-83198f5b7558.png" width=50% />

After clicking the **"Post"** button then can see:

<img src="https://user-images.githubusercontent.com/63782903/170743517-1b49f579-70d2-4ce0-aac7-487f6a39be5c.png" width=50% />

After posting then the "Your Article" will add immediately. (MySQL will added)

After clicking **"trash button"** then can delete article immediately. (MySQL will deleted)

After clicking **"edit button"** then can edit article as following see:

<img src="https://user-images.githubusercontent.com/63782903/170744232-9d3a1b9c-8c42-44a2-8399-9f7ce35aff74.png" width=50% />

Finally, users can upload or change their favorite profile images.

Images will store in directories on the **file system** and store references to the images (path to the image) in the database. (use **Multer** module)

And upload image without refresh immediately by ajax.

<img src="https://user-images.githubusercontent.com/63782903/170744925-2702f773-ab13-4bc4-aa88-b8f7cab26499.png" width=50% />





