# cgec-social-app

A web app to communicate between the students of Coochbehar Government Engineering College to share common necessities, such as books, drawing kit, lab stuffs etc.
It has a sign-up form for new students to register. It will verify the students by sending an email to the given email address during the sign up process. I have used nodemailer module for this purpose. 

[A sign up form photo]

After verification students can log-in using their username and password. I have used bCryptjs module for hashing the passwords. 

[A log-in form photo]

After a successful log-in it will take you to the home page where all the request will be loaded by a ajax call to the server. And fill up 10 requests per page. 
It will also have a request maker on the top of the page. 

[A home page photo]

Clicking on a post, the post will be loaded. and details such as people interested in it, comments on the post will also appear.

[A photo of a opened post]

