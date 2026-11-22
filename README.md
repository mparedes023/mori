
# Mori ⋆｡𖦹°⭒˚｡⋆

**Your personal reading companion.**

Mori is a mobile book discovery and reading tracker application built with React Native and Expo. It helps readers discover new books, organize their reading lists, track their reading progress and work toward their reading goals, all in one place.

Whether you're building your reading list or keeping track of your latest read, Mori makes it easier to keep your reading journey organized.

## Features

Mori includes the following planned and developing features:

- **Book Discovery:** Search for books by title, author or keyword using the Google Books API.
- **Personal Reading Shelves:** Organize books into To Be Read, Currently Reading and Already Read collections.
- **Reading Progress:** Track your current page and monitor your reading progress.
- **Reading Goals:** Set yearly reading goals and keep track of completed books.
- **Mystery Book Match:** Complete a short survey based on your mood and reading preferences to discover a surprise book recommendation.
- **Favourites:** Save favourite books and organize your personal collection.
- **User Profiles:** Customize your profile with your name, username and bio.
- **Cloud Storage:** Store personal reading collections and preferences using Firebase Cloud Firestore.

## Technologies

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| JavaScript | Application programming language |
| Expo | Development environment and testing |
| React Navigation | Screen navigation and routing |
| Google Books API | Book search and information retrieval |
| Firebase Cloud Firestore | Cloud database and data persistence |
| Redux | Shared application state management |

## Application Screens

Mori includes the following screens:

- Sign Up / Login
- Home
- Search Books
- Book Details
- My Library
- To Be Read
- Currently Reading
- Already Read
- Five-Star Books
- Could Not Finish
- Mystery Book Match
- User Profile

## Getting Started

### Prerequisites

Before running Mori, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) on your mobile device

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mparedes023/mori.git
   ```

2. Navigate into the project directory:

   ```bash
   cd mori
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code using Expo Go to open the application on your mobile device.

## API Integration

Mori uses the [Google Books API](https://developers.google.com/books) to retrieve book information, including:

- Book titles
- Authors
- Cover images
- Descriptions
- Page counts
- Publication information

API responses are retrieved in JSON format using asynchronous fetch requests.

## Project Goals

Mori aims to make reading more organized and enjoyable by combining book discovery, personal reading collections and reading progress tracking into one mobile application.

## Developers

Developed by **Eton Miller** and **Melissa Red Paredes**.
