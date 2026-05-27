# Flagstaff's We Belong — Inclusive Community Platform

Helping people with intellectual disability discover welcoming clubs — and helping clubs become truly inclusive.

## Overview

We Belong connects people with intellectual disability to local hobby, interest, and sports groups. It also supports clubs by providing practical inclusion tools such as micro-learning resources, checklists, and task-modification templates.

The MVP is designed to be accessibility-first, mobile-friendly, and aligned with WCAG 2.2 AA standards. The project is delivered through agile two-week sprints as part of CSIT321.

## Roadmap & Assessments

- **A1:** Initial project description  
  Problem, audience, market, management, and risks.

- **A2:** Requirements & initial design  
  Functional requirements, non-functional requirements, early interface design, and project planning.

- **A3:** Interactive prototype  
  Clickable interface prototype showing core user journeys.

- **A4:** Design progress & working prototype snapshot  
  Improved interface, working frontend/backend features, and progress documentation.

- **A5:** Marketing & technical videos  
  Product marketing video and technical explanation video.

- **A6:** Final product & documentation  
  Final system, documentation, testing evidence, and TechExpo presentation.

## How we work

- Work is managed using GitHub Projects and GitHub Issues.
- Tasks are organised by assessment milestone, such as A1, A2, A3, A4, A5, and A6.
- Each issue should include:
  - A clear task description
  - An owner
  - A milestone
  - Acceptance criteria
- Team members create branches for their own work and submit changes through pull requests.
- Pull requests should be reviewed before merging into the main branch.
- The team records meeting minutes and individual progress diaries for Moodle submission.
- Client or tutor feedback is reviewed regularly and used to improve the project.
- Development focuses on accessibility, usability, inclusion, and clear documentation.

## Getting started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Open the project folder:

   ```bash
   cd W23_WE-BELONG
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Set up the database using the files inside the `database/` folder.

5. Start the backend server:

   ```bash
   npm start
   ```

6. Open the frontend pages from the `public/` folder in your browser.

7. Begin development by selecting an issue from the GitHub Project board.

## Repo layout

```text
W23_WE-BELONG/
│
├── backend/                 # Backend server code, routes, controllers, and API logic
│
├── database/                # MySQL database scripts, schema, and seed data
│
├── public/                  # Frontend website files
│   ├── mainpage.html
│   ├── aboutus.html
│   ├── webelong.html
│   ├── disaware.html
│   ├── incsport.html
│   ├── story.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── account.html
│   │
│   ├── components/          # Reusable page sections
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── banner.html
│   │   ├── chatbot.html
│   │   └── accessibility.html
│   │
│   ├── css/                 # Stylesheets
│   │   ├── style.css
│   │   └── learninghub.css
│   │
│   ├── js/                  # Frontend JavaScript files
│   │   ├── script.js
│   │   ├── accessibility.js
│   │   ├── chatbot.js
│   │   └── learninghub.js
│   │
│   ├── images/              # Website images and logos
│   │   ├── home-page-banner.jpg
│   │   ├── AdditionalIMG/
│   │   └── Logo/
│   │
│   └── pages/               # Website sub-pages grouped by feature area
│       ├── DisabilitiesAware/
│       ├── HowtoBelong/
│       ├── IncluSport/
│       ├── LearningHub/
│       └── Stories/
│
├── docs/                    # Project documentation, reports, notes, and meeting records
│
├── postman/                 # Postman collections for testing backend APIs
│
├── node_modules/            # Installed Node.js dependencies
│
├── package.json             # Project dependencies and npm scripts
├── package-lock.json        # Dependency lock file
└── README.md                # Project overview and setup instructions
```

## License

Copyright (c) 2025 Group W23, University of Wollongong.

This repository was created as part of the CSIT321 subject at the University of Wollongong. It is for educational purposes only. No license is granted to copy, modify, or distribute this work without permission from the authors and the University.
