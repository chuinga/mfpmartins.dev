# Requirements Document

## Introduction

Complete rebuild of the mfpmartins.dev personal portfolio website using a modern tech stack (Next.js, TypeScript, Tailwind CSS, Three.js). The site showcases Miguel Martins as a full-stack developer, displays portfolio projects, and provides contact/social information. The rebuild replaces a legacy React + Vite site with improved architecture, performance, visual effects, and expanded content sections.

## Glossary

- **Portfolio_Site**: The mfpmartins.dev web application built with Next.js App Router
- **Hero_Section**: The landing area of the home page displaying the owner's greeting, name, title, and description
- **Project_Sidebar**: A navigation panel listing all portfolio projects, displayed alongside project detail content
- **Project_Detail_Page**: A page showing a single project's description, technologies, screenshot, and external links
- **Theme_Toggle**: A UI control that switches between dark mode and light mode color schemes
- **Language_Selector**: A UI control allowing users to switch the site's display language
- **Three_JS_Scene**: A 3D animated background rendered using the Three.js library
- **Navigation_Bar**: The primary site navigation component displayed at the top of the page
- **About_Section**: A page or section providing detailed information about the site owner
- **Skills_Section**: A section displaying the owner's technical skills and proficiencies
- **Contact_Section**: A section providing ways to reach the site owner
- **Not_Found_Page**: A custom page displayed when a user navigates to a non-existent route
- **AWS_Amplify**: The AWS hosting service used to deploy the Next.js application
- **Locale_Store**: The mechanism that persists the user's selected language preference
- **Theme_Store**: The mechanism that persists the user's selected color theme preference

## Requirements

### Requirement 1: Hero Section Display

**User Story:** As a visitor, I want to see an engaging introduction when I land on the site, so that I immediately understand who Miguel Martins is and what he does.

#### Acceptance Criteria

1. WHEN a visitor loads the home page, THE Hero_Section SHALL display the greeting text "Hi, my name is" in the currently selected language
2. WHEN a visitor loads the home page, THE Hero_Section SHALL display the name "Miguel Martins" as a prominent heading
3. WHEN a visitor loads the home page, THE Hero_Section SHALL display the title "I create stuff for the web..." in the currently selected language
4. WHEN a visitor loads the home page, THE Hero_Section SHALL display a description paragraph about the owner being a full-stack developer based near Lisbon, Portugal, with interests in programming, downhill biking, and creating new sounds, in the currently selected language
5. THE Hero_Section SHALL render all text content using semantic HTML heading and paragraph elements

### Requirement 2: Three.js Animated Background

**User Story:** As a visitor, I want to see an interactive 3D animated background, so that the site feels modern and visually engaging.

#### Acceptance Criteria

1. WHEN the home page loads, THE Three_JS_Scene SHALL render an animated 3D particle or geometric background behind the page content
2. WHILE the visitor moves the mouse cursor, THE Three_JS_Scene SHALL subtly respond to cursor position by adjusting the animation perspective or particle movement
3. THE Three_JS_Scene SHALL render at a minimum of 30 frames per second on devices with hardware-accelerated graphics
4. WHILE the page is not visible (tab is inactive), THE Three_JS_Scene SHALL pause rendering to conserve system resources
5. IF the visitor's device does not support WebGL, THEN THE Portfolio_Site SHALL display a static gradient background as a fallback

### Requirement 3: Project Listing and Sidebar Navigation

**User Story:** As a visitor, I want to browse portfolio projects through a sidebar navigation, so that I can quickly switch between projects without leaving the projects area.

#### Acceptance Criteria

1. WHEN a visitor navigates to the projects area, THE Project_Sidebar SHALL display a list of all portfolio projects (Gravity, Pawsitive Homes, GrooveGrid, Setúbal)
2. WHEN a visitor clicks a project name in the Project_Sidebar, THE Portfolio_Site SHALL display the corresponding Project_Detail_Page alongside the sidebar
3. WHILE a project is selected, THE Project_Sidebar SHALL visually highlight the active project name
4. THE Project_Sidebar SHALL display the heading "Projects" in the currently selected language

### Requirement 4: Project Detail Display

**User Story:** As a visitor, I want to see detailed information about each project, so that I can understand the technologies used and access the live site or source code.

#### Acceptance Criteria

1. WHEN a visitor selects a project, THE Project_Detail_Page SHALL display the project title
2. WHEN a visitor selects a project, THE Project_Detail_Page SHALL display a description of the project in the currently selected language
3. WHEN a visitor selects a project, THE Project_Detail_Page SHALL display a browser-frame screenshot of the project
4. WHEN a visitor selects a project, THE Project_Detail_Page SHALL display a "Visit Site" link that opens the project's live URL in a new browser tab
5. WHEN a visitor selects a project, THE Project_Detail_Page SHALL display a "GitHub" link that opens the project's repository URL in a new browser tab
6. THE Project_Detail_Page SHALL display the technologies used for each project

### Requirement 5: Dark and Light Theme Toggle

**User Story:** As a visitor, I want to switch between dark and light color themes, so that I can view the site in my preferred visual mode.

#### Acceptance Criteria

1. WHEN a visitor activates the Theme_Toggle, THE Portfolio_Site SHALL transition from the current theme to the opposite theme with a smooth CSS transition
2. WHEN a visitor selects a theme, THE Theme_Store SHALL persist the selection in the browser's localStorage
3. WHEN a returning visitor loads the site, THE Portfolio_Site SHALL apply the theme previously stored in the Theme_Store
4. IF no theme preference exists in the Theme_Store, THEN THE Portfolio_Site SHALL apply the theme matching the visitor's operating system preference (prefers-color-scheme)
5. THE Portfolio_Site SHALL maintain the blue and light-blue accent color palette in both dark and light themes

### Requirement 6: Multi-Language Support

**User Story:** As a visitor, I want to view the site in English, Spanish, French, or Portuguese, so that I can read content in my preferred language.

#### Acceptance Criteria

1. THE Language_Selector SHALL display flag icons for English, Spanish, French, and Portuguese
2. WHEN a visitor selects a language flag, THE Portfolio_Site SHALL immediately re-render all translatable text content in the selected language
3. WHEN a visitor selects a language, THE Locale_Store SHALL persist the selection in the browser's localStorage
4. WHEN a returning visitor loads the site, THE Portfolio_Site SHALL apply the language previously stored in the Locale_Store
5. IF no language preference exists in the Locale_Store, THEN THE Portfolio_Site SHALL default to English
6. THE Portfolio_Site SHALL translate the following content: greeting, title, description, project descriptions, section headings, navigation labels, and the 404 page message

### Requirement 7: Navigation and Header

**User Story:** As a visitor, I want clear navigation to move between site sections, so that I can easily find the content I am looking for.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display a site logo that links to the home page
2. THE Navigation_Bar SHALL display navigation links to all main sections (Home, Projects, About, Skills, Contact)
3. THE Navigation_Bar SHALL display social media icons linking to LinkedIn, GitHub, and email
4. WHEN a visitor clicks the LinkedIn icon, THE Portfolio_Site SHALL open https://www.linkedin.com/in/miguel-martins-a08a76a5/ in a new browser tab
5. WHEN a visitor clicks the GitHub icon, THE Portfolio_Site SHALL open https://github.com/chuinga in a new browser tab
6. WHEN a visitor clicks the email icon, THE Portfolio_Site SHALL open the default mail client with the recipient set to contact@mfpmartins.dev
7. WHILE the viewport width is below 768px, THE Navigation_Bar SHALL collapse into a hamburger menu icon
8. WHEN a visitor clicks the hamburger menu icon, THE Navigation_Bar SHALL expand to show all navigation links in a mobile-friendly overlay

### Requirement 8: About Section

**User Story:** As a visitor, I want to learn more about Miguel Martins beyond the hero introduction, so that I can understand his background, experience, and personality.

#### Acceptance Criteria

1. WHEN a visitor navigates to the About_Section, THE About_Section SHALL display a detailed biography in the currently selected language
2. THE About_Section SHALL include information about professional background, location (near Lisbon, Portugal), and personal interests (programming, downhill biking, creating new sounds)
3. THE About_Section SHALL display a professional photo or avatar of the site owner

### Requirement 9: Skills and Technologies Section

**User Story:** As a visitor, I want to see what technologies Miguel is proficient in, so that I can assess technical capabilities for potential collaboration or hiring.

#### Acceptance Criteria

1. WHEN a visitor navigates to the Skills_Section, THE Skills_Section SHALL display a categorized list of technical skills
2. THE Skills_Section SHALL group skills into categories (Frontend, Backend, Tools, and Other)
3. THE Skills_Section SHALL display each skill with a recognizable icon or logo

### Requirement 10: Contact Section

**User Story:** As a visitor, I want a dedicated contact area, so that I can easily reach out to Miguel for professional inquiries.

#### Acceptance Criteria

1. WHEN a visitor navigates to the Contact_Section, THE Contact_Section SHALL display the email address contact@mfpmartins.dev as a clickable mailto link
2. THE Contact_Section SHALL display links to LinkedIn and GitHub profiles
3. THE Contact_Section SHALL display a call-to-action message encouraging visitors to get in touch, in the currently selected language

### Requirement 11: Footer

**User Story:** As a visitor, I want a consistent footer across all pages, so that I can access language selection, theme toggle, and copyright information from anywhere on the site.

#### Acceptance Criteria

1. THE Footer SHALL display the Language_Selector with flag icons for all four supported languages
2. THE Footer SHALL display the Theme_Toggle control
3. THE Footer SHALL display the copyright text "©{current year} mfpmartins.dev"
4. THE Footer SHALL be visible on every page of the Portfolio_Site

### Requirement 12: Custom 404 Not Found Page

**User Story:** As a visitor who navigates to a non-existent URL, I want to see a themed error page, so that I understand the page does not exist and can navigate back to valid content.

#### Acceptance Criteria

1. WHEN a visitor navigates to a non-existent route, THE Not_Found_Page SHALL display a black-hole themed visual element
2. WHEN a visitor navigates to a non-existent route, THE Not_Found_Page SHALL display a message indicating the page was not found, in the currently selected language
3. THE Not_Found_Page SHALL display a link that navigates the visitor back to the home page

### Requirement 13: Responsive Design

**User Story:** As a visitor using any device, I want the site to adapt to my screen size, so that I have a good experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a mobile-first responsive layout that adapts to viewport widths of 320px and above
2. WHILE the viewport width is below 768px, THE Portfolio_Site SHALL stack content vertically and hide the Project_Sidebar in favor of a project list view
3. WHILE the viewport width is 768px or above, THE Portfolio_Site SHALL display the Project_Sidebar alongside the Project_Detail_Page
4. THE Portfolio_Site SHALL maintain readable text sizes (minimum 16px body text) across all viewport widths

### Requirement 14: Performance and SEO

**User Story:** As the site owner, I want the site to load quickly and rank well in search engines, so that visitors have a fast experience and the site is discoverable.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of 90 or above on desktop
2. THE Portfolio_Site SHALL achieve a Lighthouse Accessibility score of 90 or above
3. THE Portfolio_Site SHALL use Next.js static generation for all pages that do not require dynamic data
4. THE Portfolio_Site SHALL use the next/image component for all raster images to enable automatic optimization and lazy loading
5. THE Portfolio_Site SHALL include appropriate meta tags (title, description, Open Graph) on every page
6. THE Portfolio_Site SHALL use semantic HTML elements (header, main, nav, section, article, footer) throughout

### Requirement 15: AWS Deployment

**User Story:** As the site owner, I want the site deployed on AWS with HTTPS and a custom domain, so that visitors access the site securely at mfpmartins.dev.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be deployed using AWS_Amplify Hosting with support for Next.js server-side rendering
2. THE Portfolio_Site SHALL be accessible at the custom domain mfpmartins.dev over HTTPS
3. THE Portfolio_Site SHALL use AWS Certificate Manager for TLS certificate provisioning
4. WHEN code is pushed to the main branch on GitHub, THE AWS_Amplify pipeline SHALL automatically build and deploy the updated site

### Requirement 16: Accessibility

**User Story:** As a visitor using assistive technology, I want the site to be navigable and understandable, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL provide alt text for all images and icons
2. THE Portfolio_Site SHALL ensure all interactive elements are reachable and operable via keyboard navigation
3. THE Portfolio_Site SHALL maintain a color contrast ratio of at least 4.5:1 for normal text and 3:1 for large text in both themes
4. THE Portfolio_Site SHALL use ARIA labels on icon-only buttons and links (social media icons, theme toggle, hamburger menu)
5. THE Portfolio_Site SHALL announce theme and language changes to screen readers using ARIA live regions

### Requirement 17: Page Transitions and Animations

**User Story:** As a visitor, I want smooth transitions between pages and UI state changes, so that the site feels polished and professional.

#### Acceptance Criteria

1. WHEN a visitor toggles between dark and light themes, THE Portfolio_Site SHALL animate the color transition over a duration of 300 to 500 milliseconds
2. WHEN a visitor navigates between sections, THE Portfolio_Site SHALL apply a subtle fade or slide transition to the incoming content
3. WHILE the visitor scrolls, THE Portfolio_Site SHALL reveal content sections with a fade-in-up animation as they enter the viewport
4. IF the visitor has enabled "prefers-reduced-motion" in their operating system, THEN THE Portfolio_Site SHALL disable all non-essential animations and transitions
