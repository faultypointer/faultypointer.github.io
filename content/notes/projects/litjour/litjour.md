+++
author = "faultypointer"
title = "LitJour"
date = "2024-11-29"
description = "A social media platform based on ActivityPub."
draft = true
tags = [
    "litjour",
]
categories = [
    "Project",
]
+++

# LitJour

3o14,

## RoadMap

- [ ] **Name**
  - Finalize the name for the project. (*LitJour* is a good one.)

- [ ] **Design**
  - [ ] **System Architecture**:
    - [ ] Decide on the tech stack.
      - [x] Backend: `Django`
      - [ ] Frontend:
    - [ ] Plan API endpoints (e.g., for creating journals, posting reviews, user authentication).
    - [ ] Design the database schema (tables for `Users`, `Books`, `Journals`, `Reviews`, etc.).
    - [ ] Integrate ActivityPub for federation support (following, sharing, commenting).

  - [ ]  **UI/UX Design**:
    - [ ]  Sketch wireframes for the key pages:
      - [ ]  **Home Screen**: List user activity and book recommendations.
      - [ ]  **Journal Screen**: Create, edit, and browse journals.
      - [ ]  **Review Page**: Post reviews with ratings and explore others' reviews.
      - [ ]  **User Profile**: Showcase user stats, followed users, and activity.
    - [ ]  Plan a simple, clutter-free interface for an easy user experience.
    - [ ]  Choose a theme or design language (light/dark mode, font, colors).

- [ ] **Code**
  - [ ] **Backend**:
    - [ ] Set up a backend framework.
    - [ ] Implement user authentication.
    - [ ] Create APIs for:
      - [ ] Journals: CRUD operations (Create, Read, Update, Delete).
      - [ ] Reviews: Submit reviews and fetch them for books.
      - [ ] ActivityPub: Build federation support (sending/receiving updates).
    - [ ] Connect the database.

  - [ ] **Frontend**:
    - [ ] Set up a framework.
    - [ ] Create pages/components for:
      - [ ] Journals and Reviews (form inputs, list displays).
      - [ ] User profiles and activity feeds.
    - [ ] Integrate frontend with backend APIs.

  - [ ] **Integration**:
    - [ ] Handle federated user actions (e.g., following other users, liking reviews).
    - [ ] Implement Markdown support for journals and reviews.

- [ ] **Tests**
  - [ ] Write test cases for:
    - [ ] Backend API endpoints (e.g., creating journals, posting reviews).
    - [ ] Database operations (ensure data consistency for journals and reviews).
    - [ ] Frontend components (rendering and user interaction).
  - [ ] Perform ActivityPub compatibility tests with platforms like Mastodon or Bookwyrm.
  - [ ] End-to-end testing of user flows (e.g., posting a journal, sharing it, and receiving likes).

- [ ] **Deployment**
  - [ ] **Backend**:
    - [ ] Containerize with Docker.
    - [ ] Deploy using a service like AWS, DigitalOcean, or Fly.io.
  - [ ] **Frontend**:
    - [ ] Build and deploy static assets to a CDN or hosting service (e.g., Vercel, Netlify).
  - [ ] **Domain and SSL**:
    - [ ] Configure the domain with HTTPS using Let's Encrypt.
  - [ ] **Monitoring**:
    - [ ] Set up logging (e.g., Grafana or Prometheus) and error tracking (e.g., Sentry).
