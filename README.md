# Valvet Room

A web application inspired by the Velvet Room in the Persona series. This app allows users to sign up, sign in, join an exclusive club with a secret passcode, and apply for admin status. Admin users can view all messages and delete them, while regular users can post new messages if they are club members.

## Features
- **User Authentication**: Sign up, sign in, and logout.
- **Role-Based Access**: Members can create posts, and admins have additional privileges.
- **Passcode-Restricted Access**: Secret passcodes to join the club and apply for admin.
- **Message Management**: Users can create messages; admins can delete them.

## Prerequisites
- Node.js
- PostgreSQL
- Passport.js
- ejs

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/frustratedProton/velvet-room.git
   cd valvet-room
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file with the following variables:
   ```bash
   DATABASE_URL=your_postgresql_database_url
   PORT=your_port
   CLUB_PASSCODE=your_club_passcode
   ADMIN_PASSCODE=your_admin_passcode
   ```

4. **Set up the database**:
   - Create a PostgreSQL database and update `DATABASE_URL` in your `.env` file.
   - Run the SQL commands to create necessary tables.

5. **Run the server**:
   ```bash
   npm start
   ```

   The app will be accessible at `http://localhost:PORT` or `http://localhost:3000`.

## Routes
- **User Authentication**:
  - `GET /auth/sign-up` - Sign-up page
  - `POST /auth/sign-up` - Handle sign-up
  - `GET /auth/sign-in` - Sign-in page
  - `POST /auth/sign-in` - Handle sign-in
  - `GET /logout` - Log out

- **Club Membership**:
  - `GET /join-club` - Join club page (requires CLUB_PASSCODE)
  - `POST /join-club` - Process club membership request

- **Admin Access**:
  - `GET /become-admin` - Become admin page (requires ADMIN_PASSCODE)
  - `POST /become-admin` - Process admin request

- **Messages**:
  - `GET /` - View all messages
  - `GET /messages/new` - Create new message page (must be logged in)
  - `POST /messages` - Submit a new message (must be logged in)
  - `POST /messages/:id/delete` - Delete message (admin only)
  - 