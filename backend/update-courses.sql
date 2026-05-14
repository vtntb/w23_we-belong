USE we_belong;

-- Add course_url column
ALTER TABLE courses ADD COLUMN course_url VARCHAR(500);

-- Clear existing courses
DELETE FROM courses;

-- Insert all courses with correct page links
INSERT INTO courses (id, title, description, category, course_url, total_lessons) VALUES
('awarenesstraining', 'Disability Awareness Training', 'Learn to understand and support people with disabilities in everyday life.', 'Awareness', '/LearningHub/awarenesstraining.html', 8),
('communication', 'Communication', 'Discover how to communicate respectfully and effectively with everyone.', 'Communication', '/LearningHub/communication.html', 6),
('sportstraining', 'Inclusive Sports Training', 'Explore inclusive sports and how to make physical activity accessible for all.', 'Sport', '/LearningHub/sportstraining.html', 5),
('cybersafety', 'Cybersafety', 'Stay safe online and learn how to protect yourself in the digital world.', 'Safety', '/LearningHub/cybersafety.html', 4),
('money', 'Money', 'Learn how to manage your money and budget effectively.', 'Life Skills', '/LearningHub/money.html', 5),
('learntodrive', 'Learn to Drive', 'Get started with driving and understand the road rules.', 'Life Skills', '/LearningHub/learntodrive.html', 6),
('supportemergency', 'Supporting People with Disabilities During an Emergency', 'Learn how to support people with disabilities in emergency situations.', 'Safety', '/LearningHub/supportemergency.html', 4),
('planemergency', 'Planning for an Emergency', 'Be prepared and learn how to plan for emergency situations.', 'Safety', '/LearningHub/planemergency.html', 4);
