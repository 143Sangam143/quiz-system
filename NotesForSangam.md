# Sangam Quiz System

## About the project

This project is being made for "Infotech Services" recuritment task. The Task is to make a quiz system where the backend is in laravel and frontend is in react. Well this will be the first time I will be doing both by myself from scratch. I did have done react and laravel combination but in react only the api consumption. Well I do have experience in Nextjs on both frontend and backend.

Since, I don't have much time and can't do testing. I would need to go with all things working fine and testing at the end. So, this project will not be a simple react frontend and laravel backend. It will be both (react frontend and laravel backend) and also traditional laravel i.e blade engine for frontend too. I would be going with blade engine first cause I am more familiar with it and would be able to develop a working project fast. Well, this traditional laravel will be more advance than the react and laravel combo, since my main background is full stack in laravel well abit skill on react and nextjs.

## Time Allocated

I only have 12 hours to complete the task.
<br />
Started at : 08:50 pm
<br />
Need to finish at : 8:50 am
<br />
(I will be working whole night. I also haven't have much sleep previous night. So, let's hope I don't fall asleep midnight)

## Task Requirement

<ul>
    <li>Allow admin users to create categories and difficulty levels</li>
    <li>Allow admin users to create quizzes with questions and multiple answers</li>
    <li>Allow users to register, log in, and take quizzes</li>
    <li>Display results and quiz history</li>
    <li>Randomly select 5 questions based on chosen category and difficulty so the admin does not know
    the specific questions shown to the user</li>
</ul>

## Functional Requirements

### 1. Authentication

<ul>
    <li>Register/Login system</li>
    <li>Two roles: admin , user</li>
    <li>API authentication via Laravel Sanctum</li>
</ul>

### 2. Admin Features

<ul>
    <li>Create, update, delete categories (e.g., PHP, JavaScript)</li>
    <li>Create, update, delete difficulty levels (e.g., Beginner, Intermediate)</li>
    <li>Create quizzes:
        <ul>
            <li>Title</li>
            <li>Category (from categories table)</li>
            <li>Difficulty level (from difficulty_levels table)</li>
            <li>Time limit (minutes)</li>
            <li>Add multiple questions per quiz</li>
            <li>Add multiple answers per question (one marked as correct)</li>
        </ul>
    </li>
    <li>View quiz attempts by users</li>
</ul>

### 3. User Features

<ul>
    <li>Submit selected answers for each question</li>
    <li>View quiz result immediately after submission</li>
    <li>Quiz scoring: user gets 1 point for each correct answer (e.g., 3 correct answers = 3 points)</li>
    <li>View quiz history</li>
</ul>

## My Plans

Since I have been asked to give my 100% for this task which isn't possible with this little time. I might only be able to give 70 tp 80% of my best. I don't know if I would get selected so, I will be implementing something more here so that my time won't be wasted. I mean if I didn't get select I would turn this into a website in the future which I can add in the cv.

### Somethings in my mind

I alreayd have a few thing and more will be added later

1. Make it into multi tenant which I did in my Personal CMS.
2. Color picker for difficulty.
3. Permisison every where like in my personal CMS.

(All these ideas are for laravel blade. And if I have time I would implement it on react too.)