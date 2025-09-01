# Basic Quiz System

## Video Url
<a href="https://drive.google.com/file/d/1xA2KVplEh-ioBil2ObV1z_PitKip-V9u/view?usp=sharing">Google Drive Link </a>

## About Project

This is a recuritment task project of Infotech Service. It uses react as a frontend, laravel as backend. Tailwindcss used for frontend. For the api authethication sanctum is used. The main routes for this task are in api.php, and the routes in web.php are irrelevant to the tasks. 

The basic data are created using laravel seeder and factory.

## How to run the project

### Step 1 : Clone the repo
```
git clone https://github.com/143Sangam143/quiz-system
```
### Step 2 : Laravel Setup
Open terminal and navigate to backend
```
cd backend
```
Run below commands one at a time. Also, start your xampp and apaache server. Mysql too.
```
cp .env.example .env //only if .evn file is not present
composer install
npm install
php artisan migrate --seed
```

### Step 3 : Database Creation

Create a dabase with name 'quiz_system' or make the own you like and update in .env variabel database name

### Step 4 : Run the backend
```
php artisan serve
```
To run the view of backend you would need to do below but there is nothing much yet there. So you can skip it
```
npm run dev
```

### Step 5 : React Setup

open new terminal and navigate to path frontend
```
cd frontend
```
then run the below commands
```
npm install
npm start
```

### Step 6 : Access point
The port for laravel is 8000 and react is 3000 so make sure both of these port are free. Running this project in new port won't work, well it will if you update the cors, env and service.js of the react to work on the port you are used to.

```
localhost:3000
```

## Log In Credentials

### For admin
```
    username => admin@gmail.com,
    password => admin@admmin
```
### For user
```
    {
        {
            username => user@gmail.com
            password => admin@admin
        },
        {
            username => user2@gmail.com
            password => admin@admin
        },
        {
            username => user3@gmail.com
            password => admin@admin
        },
    }
```

## Notice

Below from this point are only info dump and my own rambling. So It is not necessarily to go with below. Also, the ui is not great since tailwind is not working at all.  It will be fix later when I have time.

## How to navigate

### First
Go to localhost:3000 you will see the login button and register button.

### Second
You can register your own account and go through the project.

If you want to go with already existing user accounts then here we go.

#### Go from admin it will be helpful
```
    username => admin@gmail.com,
    password => admin@admmin
```

##### There are menus and from these menu you will be able to perform these actions
1. Category => to list, create, edit, delete category
2. Difficulty => to list, create, edit, delete difficulty
3. Question  => to list , create, edit, delete question
            => from same you create aswers and the correct answer, answer ecplnation
4. Quiz => to list, create, delete quiz 
        => you will also see the number of player who attempt, total scores

(
    Note:: Quiz edit doesn't work yet. So skip it. And in quiz I seem to have misunderstood something. In the admin feature, there was a point which ask a quiz should have multiple questions but in the project overiew there was this which I saw later "Randomly select 5 questions based on chosen category and difficulty so the admin does not know
    the specific questions shown to the user". Because I confused, I tried making the quiz creation complicated due to which making the question fetch and selection on initial load on edit became hard. After 3 hours and even using AI, I skipped it for now.
)

I guess this is it in admin.

#### For the users or the players
```
    {
        {
            username => user@gmail.com
            password => admin@admin
        },
        {
            username => user2@gmail.com
            password => admin@admin
        },
        {
            username => user3@gmail.com
            password => admin@admin
        },
    }
```

### Menus avaiable to user
1. Quizzes List => See the list of quizzes available and there is play button from which you can play
2. History => See what quiz you played previously and your scores


## To the person who is reviewing this

### Things left to do
1. Bug testing in detail (For now, I have only covered the cases that comes to my mind)

Note: My mistake I was in hurry so, without looking up much I started setup but both got setup in latest version i.e laravel and react. When I realize my mistake it was late. Even tailwind wasn't working. I didn't have much time So, I had to go with it. 