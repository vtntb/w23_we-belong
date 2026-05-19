USE we_belong;

-- Add course_url column only if it does not already exist
ALTER TABLE courses ADD COLUMN course_url VARCHAR(500);

-- Clear existing courses
DELETE FROM courses;

-- Insert all courses with correct page links
INSERT INTO courses (id, title, description, category, course_url, total_lessons) VALUES
('awareness', 'Disability Awareness Training', 'Learn the basics of disability awareness and inclusive communication.', 'Awareness', '/pages/LearningHub/awarenesstraining.html', 8),
('communication', 'Communication', 'Learn effective communication skills, including how to express yourself clearly, listen actively, and interact confidently with others in different situations.', 'Communication', '/pages/LearningHub/communication.html', 4),
('sportstraining', 'Inclusive Sports Training', 'Learn how to create inclusive sporting environments, support people with disabilities in sport, and promote participation, teamwork, and belonging within clubs and communities.', 'Sport', '/pages/LearningHub/sportstraining.html', 5),
('money', 'Money', 'Learn about budgeting, pay slips, banking, moving out of home, savings tips, and loans.', 'Life Skills', '/pages/LearningHub/money.html', 6),
('cybersafety', 'Cybersafety', 'Learn what cybersafety is, what can happen when you do not stay safe online, how to protect yourself, and what to do about cyberbullying.', 'Safety', '/pages/LearningHub/cybersafety.html', 4),
('selfcareemergency', 'Self-care During Emergencies', 'Learn what an emergency is, how to remain calm, signs you may need extra support, and where to find support services and resources.', 'Safety', '/pages/LearningHub/selfcareemergency.html', 4);
