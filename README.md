# EVSD-SITE

###Purpose
The goal of this project was to create a website which will facilitate the logistics of running a speech and debate team, including club registration/payment, tournament registration/payment, and mass communcation. The project utilizes the Meteor JavaScript framework, Materialize CSS Framework, Stripe Checkout, and several Meteor packages which are listed below. 

###User Roles on Website
- Admin: Controls the website. Can add tournaments, change user roles, and manually change user balances. 
- User: Student
- Frozen: users initially frozen until approved by admin. Admin can also freeze users to prevent them from signing up from tournaments.
- Officer: to be added feature

###Website Structure
A side navigation bar allows the user to navigate between pages, and a footer is located at the bottom of the page.

If no user is logged in, the website contains the following:
- Homepage: contains testimonials and content describing the benefits of participating in Speech and Debate programs.
- Signup page: allows the user to create an account, including basic profile information and waiver upload functionality. Upon signup, the user will be redirected to login, then to a page where the user can pay a contribution to the club to cover costs of running such a program.
- Login page

If a user is logged in, the website contains the following:
- Profile Page: user can view the information they entered on signup, as well as edit this information.
- Logout
- Account Balance: user can view a history of payment transactions as well as their current balance. User can also pay online through Stripe to increase their balance manually.
- My Tournaments Page: user can view the tournaments they are currently signed up for. They can edit these entries or delete them.
- Tournament Signup: user can signup for tournaments which are created by the admin. There is an option for partner or no partner tournaments. If partner, user can select from a list of other available users as a partner. Payment with Stripe Checkout is implemented for automated tournament payments.

Admin specific content:
- Create a Tournament: admin can create tournaments and decide what type of tournament, partner needed or not, judge needed or not, signup deadline, and price.
- Current Tournaments: admin can edit tournaments or delete them.
- See Current Signups: admin can approve tournament signups from users.
- Log Checks for Users: admin can log checks for users if, in any circumstance, Stripe Checkout online is not appropriate.
- Change User Balance: admin can change user balances manually to add or deduct a specified amount.
- Profile: admin can see site users and change their roles here (unfreeze their account after signup, etc). 

###Sources (Packages and Frameworks Used)<br />
Project: Meteor JS Framework
UI: Materialize CSS Framework
Payment: Stripe Checkout 
Packages:
- meteor-base@1.0.4
- mobile-experience@1.0.4
- mongo@1.1.11
- blaze-html-templates@1.0.4
- reactive-var@1.0.10
- jquery@1.11.9
- tracker@1.1.0
- standard-minifier-css@1.2.0
- standard-minifier-js@1.2.0
- es5-shim@4.6.14
- ecmascript@0.5.8
- insecure@1.0.7
- accounts-ui@1.1.9
- accounts-password@1.3.0
- accounts-base@1.2.11
- check@1.2.3
- alanning:roles
- kadira:flow-router
- kadira:blaze-layout
- themeteorchef:bert
- mrgalaxy:stripe
- ostrio:files
- npm-bcrypt
- shell-server
- materialize:materialize
- edgee:slingshot

###Code Credits
- To be added
