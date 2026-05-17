-- We Belong Seed Data
-- Run this after schema.sql to populate sample data

USE we_belong;

INSERT IGNORE INTO courses (id, title, description, category, image_url, total_lessons) VALUES
('awareness', 'Disability Awareness', 'Learn to understand and support people with disabilities in everyday life.', 'Awareness', '/AdditionalIMG/awareness-course.jpg', 8),
('communication', 'Inclusive Communication', 'Discover how to communicate respectfully and effectively with everyone.', 'Communication', '/AdditionalIMG/communication-course.jpg', 6),
('sport', 'IncluSport', 'Explore inclusive sports and how to make physical activity accessible for all.', 'Sport', '/AdditionalIMG/sport-course.jpg', 5),
('belonging', 'How to Belong', 'Build confidence and find your place in the community.', 'Community', '/AdditionalIMG/belonging-course.jpg', 7);

INSERT IGNORE INTO lessons (course_id, title, content_url, lesson_order) VALUES
('awareness', 'What is Disability?', '/DisabilitiesAware/lesson1.html', 1),
('awareness', 'Types of D);isability', '/DisabilitiesAware/lesson2.html', 2),
('awareness', 'Social Model vs Medical Model', '/DisabilitiesAware/lesson3.html', 3),
('awareness', 'Disability in Everyday Life', '/DisabilitiesAware/lesson4.html', 4),
('awareness', 'Language and Respect', '/DisabilitiesAware/lesson5.html', 5),
('awareness', 'Accessibility in Public Spaces', '/DisabilitiesAware/lesson6.html', 6),
('awareness', 'Supporting People with Disabilities', '/DisabilitiesAware/lesson7.html', 7),
('awareness', 'Being an Ally', '/DisabilitiesAware/lesson8.html', 8

INSERT IGNORE INTO chatbot_faqs (question, answer, keywords) VALUES
('How do I join a sport group?', 'To join, first choose an activity, then read the group details, and use the contact form or sign-up button.', 'join,sport,group'),
('What sports are available?', 'We offer a range of inclusive sports including swimming, athletics, team sports and more. Visit the IncluSport page to explore.', 'sport,activity,available'),
('How do I share my story?', 'You can share your story in simple steps. Visit the Stories page and follow the prompts.', 'story,share'),
('How do I find support?', 'We can help you find local support, clubs, and coaches. Use the search feature or contact us directly.', 'support,help,find'),
('What is We Belong?', 'We Belong is a platform that helps people with disabilities connect, learn, and participate in sports and community activities.', 'what,we belong,about'),
('Is this website accessible?', 'Yes! We Belong is designed with accessibility in mind, including keyboard navigation, high contrast mode, and large text options.', 'accessible,accessibility,keyboard'),
('How do I reset my password?', 'Click on "Forgot password?" on the login page and follow the instructions sent to your email.', 'password,reset,forgot'),
('I need urgent help', 'If you need urgent support, please contact emergency services (000 in Australia) or a trusted support person immediately. We Belong is not a crisis service.', 'urgent,emergency,crisis,help');
