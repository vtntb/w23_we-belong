USE we_belong;
INSERT INTO chatbot_faqs (question, answer, keywords, category)
VALUES

-- Learning Modules
('What is disability?',
'Disability is an incapacity or impairment that affects a person''s functional needs.',
'disability,what is disability,impairment,functional needs',
'Disability Awareness'),

('What is disability inclusion?',
'Disability inclusion involves identifying and removing barriers that prevent people with disability from participating fully in society.',
'disability inclusion,inclusion,barriers,participation',
'Disability Awareness'),

('Why is disability inclusion important?',
'Disability inclusion helps ensure equal opportunities, fair treatment, accessibility, and participation for people with disability.',
'importance of inclusion,equal opportunity,fair treatment',
'Disability Awareness'),

('What are reasonable adjustments?',
'Reasonable adjustments are modifications to systems, procedures, or environments that help people with disability participate effectively.',
'reasonable adjustments,accommodation,accessibility',
'Disability Awareness'),

('What barriers do people with disability face?',
'People with disability may face physical, communication, and attitudinal barriers that affect participation in everyday activities.',
'barriers,physical barriers,communication barriers',
'Disability Awareness'),

('What are the main types of disability?',
'Common types of disability include physical, intellectual, acquired brain injury, psychiatric, hearing, neurological, and vision disabilities.',
'types of disability,physical,intellectual,hearing,vision',
'Disability Awareness'),

('What is a physical disability?',
'A physical disability affects a person''s mobility, strength, or physical functioning.',
'physical disability,mobility',
'Disability Awareness'),

('What is an intellectual disability?',
'An intellectual disability affects learning, reasoning, problem-solving, and adaptive behaviour.',
'intellectual disability,learning',
'Disability Awareness'),

('What is an acquired brain injury?',
'An acquired brain injury is damage to the brain that occurs after birth and may affect thinking, movement, behaviour, or communication.',
'acquired brain injury,ABI',
'Disability Awareness'),

('Why do some people with disability avoid community places?',
'Many people with disability avoid community places because of accessibility barriers or negative experiences.',
'community places,avoidance,accessibility',
'Customer Service'),

('How many people with disability report unmet customer needs?',
'Approximately one in three people with disability report that their customer needs are often unmet.',
'customer needs,unmet needs',
'Customer Service'),

('How should I communicate with a person with disability?',
'Communicate respectfully, be patient, speak directly to the person, and ask before providing assistance.',
'communication,respect,assistance',
'Communication'),

('Should I ask personal questions about someone''s disability?',
'No. Personal questions about someone''s disability should generally be avoided unless the person chooses to discuss it.',
'personal questions,respect',
'Communication'),

('Should I speak to the support person instead?',
'No. Speak directly to the person with disability rather than only speaking to people accompanying them.',
'support person,communication',
'Communication'),

('What should I do if I do not understand someone?',
'Ask the person to repeat or rephrase what they said, or offer alternative communication methods such as writing.',
'repeat,rephrase,communication',
'Communication'),

('How should I offer assistance?',
'Offer assistance politely, wait for acceptance, and follow the person''s instructions.',
'assistance,help,offer help',
'Communication'),

('Should I raise my voice when speaking to a person with disability?',
'No. Use your normal tone of voice unless the person asks you to speak differently.',
'voice,tone,speaking',
'Communication'),

('What is people-first language?',
'People-first language places the person before the disability, such as saying "person with a disability".',
'people first language,respectful language',
'Etiquette'),

('What disability-related terms should I avoid?',
'Avoid outdated terms such as handicapped, crippled, wheelchair bound, the deaf, the blind, or the disabled.',
'language,outdated terms',
'Etiquette'),

('Can I say "see you later" to a person who is blind?',
'Yes. Common expressions such as "see you later" are acceptable.',
'blind,see you later',
'Etiquette'),

('Should I touch someone''s wheelchair or cane?',
'No. Mobility equipment is generally considered part of a person''s personal space.',
'wheelchair,cane,personal space',
'Etiquette'),

('What is website accessibility?',
'Website accessibility ensures digital content can be accessed and used by people with different abilities.',
'website accessibility,web accessibility',
'Accessibility'),

('What are communication boards?',
'Communication boards use pictures, symbols, or words to help people express their needs and preferences.',
'communication boards,assistive communication',
'Accessibility'),

('Who benefits from communication boards?',
'Communication boards may help autistic people, people recovering from stroke or brain injury, people with ALS, and people with learning disabilities.',
'autism,stroke,ALS,communication boards',
'Accessibility'),

('What is disability inclusive employment?',
'Disability inclusive employment creates opportunities and supportive workplaces for people with disability.',
'disability employment,inclusive employment',
'Employment'),

('What are the benefits of disability inclusive employment?',
'Benefits include increased employee engagement, positive reputation, increased customer base, and access to support programs.',
'employment benefits,reputation,engagement',
'Employment'),

('Are employees with disability productive?',
'Research shows employees with disability often have higher retention rates, take fewer sick days, and are highly productive.',
'productive employees,retention',
'Employment'),

('Why is work important for people with disability?',
'Employment provides income, independence, social connection, purpose, and opportunities for participation.',
'importance of work,employment',
'Employment'),

('How can organisations become more disability inclusive?',
'Organisations can improve accessibility, communication, infrastructure, products, services, and workplace culture.',
'organisational inclusion,accessibility',
'Disability Awareness'),

('What should organisations review to improve accessibility?',
'Organisations should review websites, communications, facilities, transport access, parking, restrooms, and customer service practices.',
'accessibility review,facilities,websites',
'Accessibility');

-- DAM Lesson 1
INSERT INTO chatbot_faqs (question, answer, keywords, category)
VALUES

('What do we mean by disability?',
'Disability is a broad term that includes physical, sensory, intellectual, psychosocial and neurological differences. It can be permanent, temporary, or episodic.',
'disability,meaning of disability,what is disability',
'DAM Lesson 1'),

('What types of disability are there?',
'Disability can include physical or mobility differences, sensory differences such as vision or hearing, intellectual disability, psychosocial disability, and neurological differences.',
'types of disability,physical,sensory,intellectual,psychosocial,neurological',
'DAM Lesson 1'),

('Can disability be temporary?',
'Yes. Disability can be permanent, temporary, or episodic, and its impact can change over time.',
'temporary disability,episodic disability,permanent disability',
'DAM Lesson 1'),

('How common is disability in Australia?',
'According to the Australian Bureau of Statistics, around 1 in 5 Australians live with disability.',
'disability statistics,australia,1 in 5',
'DAM Lesson 1'),

('Is disability always visible?',
'No. Many disabilities are invisible or non-visible. In Australia, around 80 percent of disabilities are estimated to be invisible.',
'invisible disability,visible disability,hidden disability',
'DAM Lesson 1'),

('What is an invisible disability?',
'An invisible disability is a disability that may not be immediately obvious to others but can still significantly affect a person''s daily life and work.',
'invisible disability,hidden disability',
'DAM Lesson 1'),

('Why is it important to understand invisible disabilities?',
'Understanding invisible disabilities helps prevent assumptions that someone is fine when they may be managing significant challenges and need support.',
'invisible disability,support,assumptions',
'DAM Lesson 1'),

('Does disability mean someone is less capable?',
'No. Disability and capability are not opposites. People with disability have strengths, skills, experiences and potential just like anyone else.',
'capability,disability,skills,strengths',
'DAM Lesson 1'),

('Can people with disability perform well at work?',
'Yes. In the right environment and with appropriate support, people with disability can be reliable performers and high achievers.',
'work performance,employment,high achievers',
'DAM Lesson 1'),

('What affects workplace performance for people with disability?',
'The fit between the person and their work environment often has a greater impact on performance than the disability itself.',
'performance,work environment,employment',
'DAM Lesson 1'),

('How can workplaces support employees with disability?',
'Workplaces can support employees through clear expectations, accessible systems, flexibility, supportive colleagues, and appropriate workplace adjustments.',
'workplace support,adjustments,flexibility',
'DAM Lesson 1'),

('What is an example of workplace inclusion?',
'A workplace with clear routines, visual guides, supportive staff, accessible systems and flexible arrangements can help employees with disability thrive.',
'workplace inclusion,examples,inclusive workplace',
'DAM Lesson 1'),

('Do employees have to disclose their disability at work?',
'No. Disclosure is a personal choice and not everyone chooses to disclose their disability.',
'disclosure,privacy,workplace',
'DAM Lesson 1'),

('Why might someone choose not to disclose a disability?',
'People may choose not to disclose because of fear of stigma, concern about being treated differently, or uncertainty about how information will be used.',
'stigma,disclosure,fear of judgement',
'DAM Lesson 1'),

('Should workplaces respect disability privacy?',
'Yes. Inclusive workplaces respect privacy and create environments where people feel safe to share information if they choose to.',
'privacy,inclusive workplace,disclosure',
'DAM Lesson 1'),

('Do you need to know someone''s diagnosis to be inclusive?',
'No. You do not need to know a diagnosis. Instead, focus on understanding the person''s needs and creating a supportive environment.',
'diagnosis,inclusion,support',
'DAM Lesson 1'),

('Why should we avoid making assumptions about disability?',
'Every person''s experience of disability is unique. Assumptions can lead to misunderstanding, bias, and unfair treatment.',
'assumptions,bias,disability awareness',
'DAM Lesson 1'),

('What should I do when someone discloses a disability?',
'Stay curious, ask respectful questions when appropriate, check your understanding, and focus on what helps the person succeed.',
'disclosure,respectful communication,support',
'DAM Lesson 1'),

('How can assumptions affect people with disability?',
'Assumptions can affect hiring decisions, workplace opportunities, responsibilities, and perceptions of capability.',
'assumptions,hiring,bias,opportunities',
'DAM Lesson 1'),

('What are examples of disability-related bias?',
'People may incorrectly interpret disability-related experiences as laziness, disinterest, poor attitude, lack of professionalism, or low capability.',
'bias,stereotypes,laziness,professionalism',
'DAM Lesson 1'),

('Why does understanding disability matter?',
'Understanding disability helps reduce bias, challenge assumptions, and create fairer and more inclusive workplaces.',
'understanding disability,inclusion,bias',
'DAM Lesson 1'),

('What is the goal of disability inclusion training?',
'The goal is to build understanding, reduce uncertainty and fear, provide practical guidance, and increase confidence in everyday situations.',
'training goals,disability awareness,inclusion training',
'DAM Lesson 1'),

('Does this course make me a disability expert?',
'No. The course is designed to improve awareness and confidence, not to make participants disability experts.',
'course expectations,disability expert',
'DAM Lesson 1'),

('What will I learn in future lessons?',
'Future lessons explore workplace inclusion, barriers, communication, behaviour, systems, and practical ways to support inclusion.',
'future lessons,inclusion,communication,barriers',
'DAM Lesson 1'),

('What is disability inclusion in the workplace?',
'Disability inclusion means creating environments where people with disability feel safe, supported, respected, and able to contribute at their best.',
'workplace inclusion,disability inclusion,support',
'DAM Lesson 1');

-- DAM Lesson 2
INSERT INTO chatbot_faqs (question, answer, keywords, category)
VALUES

('Why does inclusion matter?',
'Inclusion matters because everyone deserves a fair opportunity to participate, contribute, and succeed. It helps people with disability use their skills, experience, and strengths in the workplace.',
'inclusion,why inclusion matters,fair opportunity,participation',
'DAM Lesson 2'),

('Why is workplace inclusion important?',
'Workplace inclusion helps create fair opportunities, stronger workplace cultures, better performance, and improved experiences for both employees and customers.',
'workplace inclusion,importance of inclusion',
'DAM Lesson 2'),

('How many Australians of working age live with disability?',
'Around 1 in 5 Australians of working age live with a disability.',
'1 in 5,australians,working age,disability statistics',
'DAM Lesson 2'),

('Do many people with disability want to work?',
'Yes. Many people with disability want to work, but nearly half are not employed because they face barriers when accessing jobs and workplaces.',
'employment,work,barriers,jobs',
'DAM Lesson 2'),

('What does work provide besides income?',
'Work contributes to identity, confidence, independence, and social connection in addition to providing income.',
'work benefits,identity,confidence,independence',
'DAM Lesson 2'),

('How does inclusion benefit organisations?',
'Inclusion can create stronger workplace culture, access to a broader talent pool, improved customer experience, higher engagement, better retention, and stronger performance.',
'organisational benefits,culture,retention,performance',
'DAM Lesson 2'),

('Is disability inclusion about charity?',
'No. Inclusion is not about charity or obligation. It is about recognising that diversity creates better outcomes, stronger workplaces, and richer communities.',
'charity,diversity,workplace outcomes',
'DAM Lesson 2'),

('Why do some workplaces struggle with inclusion?',
'Many workplaces struggle with inclusion because it can feel unfamiliar, uncertain, or more difficult than it actually is.',
'barriers to inclusion,uncertainty,fear',
'DAM Lesson 2'),

('What are common concerns about disability inclusion?',
'People often worry about getting things wrong, making mistakes, costs, risk, or not knowing how to provide support.',
'concerns,fears,inclusion,worries',
'DAM Lesson 2'),

('Are workplace adjustments usually expensive?',
'No. Many workplace adjustments are simple, practical, and low cost.',
'adjustments,cost,reasonable adjustments',
'DAM Lesson 2'),

('Is support available for disability inclusion?',
'Yes. Support and resources are available to help workplaces create more inclusive environments.',
'support,resources,inclusive workplace',
'DAM Lesson 2'),

('Does inclusion increase workplace risk?',
'No. Good people practices generally reduce risk rather than increase it.',
'risk,workplace inclusion,people practices',
'DAM Lesson 2'),

('What is one of the biggest barriers to inclusion?',
'One of the biggest barriers is believing that certainty is required before taking action.',
'barriers,certainty,action',
'DAM Lesson 2'),

('Is inclusion more difficult than people think?',
'No. Inclusion is often easier than people expect and is usually achieved through simple everyday actions.',
'easy inclusion,myths,inclusive workplaces',
'DAM Lesson 2'),

('Does inclusion require specialist knowledge?',
'No. Most inclusive workplaces are built through awareness, openness, practical actions, and a willingness to adapt.',
'specialist knowledge,inclusion,myths',
'DAM Lesson 2'),

('Does inclusion require major workplace changes?',
'Not usually. Many inclusive practices are small adjustments that workplaces already use.',
'major changes,workplace adjustments',
'DAM Lesson 2'),

('What are examples of inclusive workplace practices?',
'Examples include flexible hours, clear expectations, adapting communication styles, and providing support when someone is learning.',
'flexible hours,communication,support,expectations',
'DAM Lesson 2'),

('Does inclusion lower performance standards?',
'No. Inclusion is about removing unnecessary barriers so people can meet performance standards, not lowering those standards.',
'performance standards,inclusion',
'DAM Lesson 2'),

('What makes the difference between exclusion and inclusion?',
'Often the difference is awareness, openness, and willingness to adapt rather than expertise.',
'awareness,openness,adaptability',
'DAM Lesson 2'),

('What does an inclusive workplace look like?',
'An inclusive workplace is one where people are treated with respect, differences are accepted, communication is clear, support is available, and people feel safe speaking up.',
'inclusive workplace,respect,support',
'DAM Lesson 2'),

('How are people treated in inclusive workplaces?',
'People are treated with respect, acceptance, fairness, and without judgement.',
'respect,fairness,acceptance',
'DAM Lesson 2'),

('What role does communication play in inclusion?',
'Inclusive workplaces use communication that is clear, flexible, and adapted to individual needs when necessary.',
'communication,clear communication,flexibility',
'DAM Lesson 2'),

('Why is psychological safety important for inclusion?',
'People are more likely to ask questions, share concerns, and contribute when they feel safe and supported.',
'psychological safety,support,speak up',
'DAM Lesson 2'),

('Do you need to be perfect to be inclusive?',
'No. Inclusion develops over time through awareness, intention, learning, and practical action.',
'perfect inclusion,learning,awareness',
'DAM Lesson 2'),

('What is inclusion really about?',
'Inclusion is about creating fair opportunities for participation, contribution, and success.',
'participation,contribution,fair opportunity',
'DAM Lesson 2'),

('Why do many people feel uncertain about disability inclusion?',
'Many people worry about getting it wrong or not knowing what to do, even when they genuinely want to be inclusive.',
'uncertainty,worry,get it wrong',
'DAM Lesson 2'),

('What helps make disability inclusion easier?',
'Understanding disability, reducing assumptions, asking questions, and being willing to adapt can make inclusion much easier.',
'understanding disability,adaptation,inclusion',
'DAM Lesson 2'),

('Can inclusive practices help employees without disability too?',
'Yes. Practices such as flexible work, clear communication, and supportive management often benefit all employees.',
'benefits for everyone,flexibility,communication',
'DAM Lesson 2'),

('What is the main message of Lesson 2?',
'Inclusion is often much easier than people expect and is achieved through everyday actions that create fair opportunities for everyone.',
'lesson summary,inclusion,everyday actions',
'DAM Lesson 2');

-- DAM Lesson 3
INSERT INTO chatbot_faqs (question, answer, keywords, category)
VALUES

('What does an inclusive workplace look like?',
'An inclusive workplace is one where people feel respected, supported, informed, and able to contribute. Inclusion is reflected in everyday experiences, interactions, communication, and workplace practices.',
'inclusive workplace,what does inclusion look like,inclusion in practice',
'DAM Lesson 3'),

('How can I recognise an inclusive workplace?',
'You can recognise an inclusive workplace when people feel comfortable asking questions, understand what is expected of them, and feel supported when challenges arise.',
'recognise inclusion,inclusive workplace signs',
'DAM Lesson 3'),

('Is inclusion about policies alone?',
'No. Inclusion is not defined by policies alone. It is reflected in how work is organised, how people communicate, and how safe people feel at work.',
'policies,inclusion,culture',
'DAM Lesson 3'),

('What does inclusion feel like for employees?',
'Employees in inclusive workplaces often say they know what is expected of them, feel comfortable asking questions, and feel supported when something is not working.',
'employee experience,inclusion feelings',
'DAM Lesson 3'),

('What are the five pillars of inclusive workplaces?',
'The five pillars are Access, Communication, Flexibility, Culture, and Support.',
'five pillars,access,communication,flexibility,culture,support',
'DAM Lesson 3'),

('What is access in an inclusive workplace?',
'Access means ensuring people can physically and practically participate in the workplace by removing unnecessary barriers.',
'access,barriers,participation',
'DAM Lesson 3'),

('Why is workplace access important?',
'Workplace access helps people participate fully by ensuring facilities, systems, information, and environments work for different needs.',
'workplace access,accessibility',
'DAM Lesson 3'),

('What is communication in an inclusive workplace?',
'Inclusive communication is clear, consistent, adaptable, and designed to meet different communication needs.',
'communication,clear communication',
'DAM Lesson 3'),

('How can workplaces improve communication?',
'Workplaces can use plain language, provide written follow-ups, check communication preferences, and allow time for questions.',
'plain language,written follow up,communication preferences',
'DAM Lesson 3'),

('Why is clear communication important?',
'Clear communication reduces confusion, builds confidence, and helps people perform their jobs effectively.',
'clear communication,confidence,performance',
'DAM Lesson 3'),

('What is flexibility in an inclusive workplace?',
'Flexibility recognises that people work differently and may need different ways of completing tasks or organising their work.',
'flexibility,working arrangements',
'DAM Lesson 3'),

('What are examples of workplace flexibility?',
'Examples include flexible schedules, different ways of completing tasks, adjusted work arrangements, and adapting roles over time.',
'flexible hours,schedules,adjustments',
'DAM Lesson 3'),

('Does flexibility lower expectations?',
'No. Flexibility helps people meet expectations by providing approaches that work for their individual needs.',
'flexibility,performance expectations',
'DAM Lesson 3'),

('What is workplace culture?',
'Workplace culture is reflected in how people treat each other, respond to differences, handle mistakes, and support one another.',
'culture,workplace culture',
'DAM Lesson 3'),

('Why is workplace culture important for inclusion?',
'A positive culture helps people feel respected, psychologically safe, and comfortable contributing and asking for help.',
'culture,psychological safety',
'DAM Lesson 3'),

('What does psychological safety mean?',
'Psychological safety means people feel safe to speak up, ask questions, raise concerns, and make mistakes without fear of judgement.',
'psychological safety,speaking up',
'DAM Lesson 3'),

('What is support in an inclusive workplace?',
'Support means ensuring people have what they need to succeed through clear expectations, adjustments, communication, and guidance.',
'support,success,adjustments',
'DAM Lesson 3'),

('Does support mean special treatment?',
'No. Support is not about special treatment. It is about creating fair opportunities for everyone to succeed.',
'support,special treatment,fairness',
'DAM Lesson 3'),

('What are examples of workplace support?',
'Examples include onboarding, clear expectations, workplace adjustments, and knowing who to speak to when issues arise.',
'onboarding,expectations,adjustments',
'DAM Lesson 3'),

('Do inclusive workplaces need large budgets?',
'No. Inclusive workplaces do not require large budgets. Small, thoughtful actions can make a significant difference.',
'budget,cost,inclusion',
'DAM Lesson 3'),

('Do inclusive workplaces need specialist expertise?',
'No. Inclusion is built through awareness, learning, listening, and practical problem-solving rather than specialist expertise.',
'expertise,awareness,learning',
'DAM Lesson 3'),

('Do all inclusive workplaces look the same?',
'No. Inclusive workplaces can look different depending on the organisation, workforce, and environment.',
'different workplaces,inclusive workplace',
'DAM Lesson 3'),

('What matters most when building inclusion?',
'What matters most is listening, learning, practical problem-solving, and a commitment to continuous improvement.',
'building inclusion,listening,learning',
'DAM Lesson 3'),

('Can inclusion improve over time?',
'Yes. Inclusion grows through small, thoughtful actions and ongoing efforts to improve workplace practices.',
'continuous improvement,inclusion growth',
'DAM Lesson 3'),

('Who is responsible for workplace inclusion?',
'Everyone is responsible for creating an inclusive workplace, including leaders, managers, HR teams, and employees.',
'responsibility,workplace inclusion,everyone',
'DAM Lesson 3'),

('Are managers solely responsible for inclusion?',
'No. While managers play an important role, inclusion is a shared responsibility across the entire organisation.',
'managers,responsibility',
'DAM Lesson 3'),

('How are new employees supported in inclusive workplaces?',
'New employees are welcomed, given clear instructions, provided with guidance, and encouraged to ask questions.',
'new employees,onboarding,welcome',
'DAM Lesson 3'),

('Why are written instructions helpful?',
'Written instructions help improve understanding, provide reference material, and support different learning styles.',
'written instructions,learning styles',
'DAM Lesson 3'),

('What is the main message of Lesson 3?',
'Inclusion is created through everyday actions, communication, support, flexibility, access, and positive workplace culture.',
'lesson summary,everyday inclusion',
'DAM Lesson 3'),

('What are some signs that a workplace is inclusive?',
'People are treated with respect, communication is clear, support is available, differences are accepted, and employees feel safe speaking up.',
'signs of inclusion,respect,support',
'DAM Lesson 3');

-- DAM Lesson 4
INSERT INTO chatbot_faqs (question, answer, keywords, category)
VALUES

('What is a workplace barrier?',
'A workplace barrier is anything that makes it harder for someone to participate, contribute, or perform effectively at work.',
'workplace barrier,barrier,participation',
'DAM Lesson 4'),

('What do we mean by barriers in disability inclusion?',
'Barriers are obstacles within systems, environments, processes, or attitudes that make participation more difficult than it needs to be.',
'barriers,disability inclusion,obstacles',
'DAM Lesson 4'),

('Are workplace barriers usually intentional?',
'No. Most workplace barriers are unintentional and develop through everyday systems, habits, and assumptions.',
'unintentional barriers,systems,assumptions',
'DAM Lesson 4'),

('Why is it important to identify barriers?',
'Identifying barriers helps organisations remove unnecessary obstacles and create fairer opportunities for participation and success.',
'identify barriers,inclusion,fairness',
'DAM Lesson 4'),

('What mindset shift helps improve inclusion?',
'Instead of asking "What is wrong with the person?", ask "What might be getting in the way?"',
'mindset shift,what is getting in the way',
'DAM Lesson 4'),

('What causes many workplace difficulties for people with disability?',
'Many difficulties are caused by environments, systems, or processes that do not match a person''s needs.',
'workplace difficulties,environment,systems',
'DAM Lesson 4'),

('Where do workplace barriers commonly exist?',
'Barriers often exist in communication, workplace culture, systems and processes, sensory environments, and assumptions about what is normal.',
'communication barriers,culture,systems,sensory',
'DAM Lesson 4'),

('Why do people often miss workplace barriers?',
'Many barriers become part of everyday workplace routines, so people stop noticing them over time.',
'unnoticed barriers,everyday work',
'DAM Lesson 4'),

('How do barriers usually develop?',
'Barriers often develop through standard processes, well-meaning assumptions, and systems designed for a narrow range of people.',
'standard processes,assumptions,system design',
'DAM Lesson 4'),

('What are system-based barriers?',
'System-based barriers occur when workplace systems, processes, or environments create unnecessary challenges for some people.',
'system based barriers,systems,workplace',
'DAM Lesson 4'),

('Why are barriers often described as system-based rather than person-based?',
'Because the environment often creates the challenge rather than the individual themselves.',
'system based,person based',
'DAM Lesson 4'),

('How can barriers affect employees?',
'Barriers can affect confidence, participation, performance, wellbeing, and a sense of belonging.',
'confidence,performance,wellbeing',
'DAM Lesson 4'),

('What can barriers feel like for employees?',
'Barriers may feel like constantly trying to catch up, putting in extra effort, feeling uncertain, or becoming exhausted by the environment.',
'employee experience,catching up,exhaustion',
'DAM Lesson 4'),

('What are communication barriers?',
'Communication barriers occur when workplace communication methods make it difficult for people to understand, access, or use information effectively.',
'communication barriers,workplace communication',
'DAM Lesson 4'),

('Why can communication become a barrier?',
'People process information differently, so communication methods that work for one person may not work for another.',
'communication,information processing',
'DAM Lesson 4'),

('What are examples of communication barriers?',
'Examples include vague expectations, rapidly changing instructions, verbal-only information, inaccessible digital systems, and limited opportunities to ask questions.',
'vague expectations,verbal instructions,digital accessibility',
'DAM Lesson 4'),

('How can communication barriers be reduced?',
'Communication barriers can be reduced by using clear language, providing written follow-ups, slowing explanations, and checking for understanding.',
'clear language,written follow up,checking understanding',
'DAM Lesson 4'),

('What are sensory barriers?',
'Sensory barriers occur when aspects of the environment create stress, fatigue, or difficulty concentrating for some people.',
'sensory barriers,environment',
'DAM Lesson 4'),

('What are examples of sensory barriers?',
'Examples include bright lighting, loud noise, crowded spaces, strong smells, visual clutter, and constant interruptions.',
'lighting,noise,crowded spaces,strong smells',
'DAM Lesson 4'),

('Can sensory barriers affect work performance?',
'Yes. Sensory barriers can increase fatigue, stress, and difficulty concentrating, making work more challenging.',
'fatigue,stress,concentration',
'DAM Lesson 4'),

('What are organisational and cultural barriers?',
'Organisational and cultural barriers are workplace beliefs, habits, and norms that unintentionally limit inclusion.',
'organisational barriers,cultural barriers',
'DAM Lesson 4'),

('What are examples of cultural barriers?',
'Examples include beliefs that everyone should handle pressure the same way, that asking for help is a weakness, or that there is only one correct way to work.',
'culture,asking for help,pressure',
'DAM Lesson 4'),

('How can workplace culture create barriers?',
'Workplace culture can influence hiring, support, communication, and expectations in ways that unintentionally disadvantage some people.',
'workplace culture,hiring,support',
'DAM Lesson 4'),

('Why is flexibility important for inclusion?',
'Flexibility allows people to participate and perform effectively by adapting work arrangements to their needs.',
'flexibility,inclusion,participation',
'DAM Lesson 4'),

('What are examples of flexible workplace practices?',
'Examples include flexible hours, alternative work locations, adaptable task design, and different pacing options.',
'flexible hours,remote work,task design',
'DAM Lesson 4'),

('Does flexibility mean lowering standards?',
'No. Flexibility helps people meet workplace expectations by removing unnecessary barriers.',
'lowering standards,expectations',
'DAM Lesson 4'),

('How can managers identify unnecessary barriers?',
'Managers can ask whether a requirement is truly essential or if there is another effective way to achieve the same outcome.',
'essential requirements,problem solving',
'DAM Lesson 4'),

('Are most barriers fixable?',
'Yes. Most barriers are identifiable, manageable, and can be reduced or removed over time.',
'fixable barriers,manageable barriers',
'DAM Lesson 4'),

('What is often the first step toward inclusion?',
'The first step is recognising where unnecessary barriers exist and taking action to reduce them.',
'first step,inclusion,recognising barriers',
'DAM Lesson 4'),

('What is the main message of Lesson 4?',
'Inclusion improves when we focus on identifying and reducing workplace barriers rather than focusing only on individual differences.',
'lesson summary,barriers,inclusion',
'DAM Lesson 4');