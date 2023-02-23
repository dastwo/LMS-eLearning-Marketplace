# Real World eLearning Marketplace (Udemy Clone) - README
This project is a clone of Udemy, a popular eLearning marketplace that allows instructors to create and sell courses on various topics.

Technologies Used
This project is built using the following technologies:

Full stack/MERN stack JavaScript
- Next.js
- React
- Node.js
- MongoDB
- Stripe
- AWS SES for emails
- AWS S3 for storage

Getting Started
To get started with this project, follow these steps:

Clone the repository to your local machine:
bash
Copy code
git clone https://github.com/dastwo/LMS-eLearning-Marketplace-.git
Install dependencies:
go
Copy code
cd real-world-elearning-marketplace
npm install
Set up environment variables:
Create a .env file in the root of the project and fill in the following variables:

makefile
Copy code
- MONGODB_URI=<your MongoDB URI>
- JWT_SECRET=<your JWT secret>
- STRIPE_SECRET_KEY=<your Stripe secret key>
- STRIPE_PUBLIC_KEY=<your Stripe public key>
- STRIPE_REDIRECT_URL=<url address after stripe>
- STRIPE_SETTINGS_REDIRECT=<url address after changing settings>
- STRIPE_SUCCESS_URL=<url address after success payment>
- STRIPE_CANCEL_URL=<url address when cancel>
- AWS_ACCESS_KEY_ID=<your AWS access key ID>
- AWS_SECRET_ACCESS_KEY=<your AWS secret access key>
- AWS_REGION=<your AWS region>
- AWS_BUCKET=<your AWS S3 bucket name>
- AWS_API_VERSION=<your api version of AWS>
- FROM_EMAIL=<your AWS SES email address>
  
Start the development server:
Copy code
npm run dev
The server should be running on http://localhost:3000.

Features
This project includes the following features:

- User authentication (signup, login, logout)
- User authorization (role-based access control)
- Instructor dashboard (create, edit, and delete courses)
- Student dashboard (browse and enroll in courses)
- Course search and filtering
- Stripe integration for payment processing
- AWS SES for sending emails (e.g., course enrollment confirmation)
- AWS S3 for storing course materials (e.g., videos, documents)





