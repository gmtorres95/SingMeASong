# SingMeASong

Share your favorite songs!  
With SingMeASong you can share youtube links, upvote/downvote recommendations and even check the top shared songs.  
Link of the API: https://smas.herokuapp.com

## Technologies

<div styles="display: flex">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white" height="28px" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>

## How to use the API

### POST /recommendations

With this route you can share your recommendations.    
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "name": "Of Monsters and Men - King And Lionheart",
    "youtubeLink": "https://youtu.be/A76a_LNIYwE",
  }
  ```
</details>

### POST /recommendations/:id/upvote

With this route you can upvote a recommendation you like.  
If the ```:id``` param is a valid song ID then it will increase the song score by 1 point.

### POST /recommendations/:id/downvote

Just like upvote, this route allows you to downvote a recommendation you don't like.  
If the ```:id``` param is a valid song ID then it will decrease the song score by 1 point.  
If the song will be **deleted** if it's score reaches **-6**.

### GET /recommendations/random

With this route you can get a random recommendation from the database.  
There's a higher chance of getting a song with score greater than 10 point (*70%*).  
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  {
    "id": 1,
    "name": "Of Monsters And Men - Little Talks",
    "youtubeLink": "https://youtu.be/ghb6eDopW8I",
    "score": 241
  }
  ```
</details>

### Get /recommendations/top/:amount

With this route you can get a list of top songs sorted by score.  
The ```:amount``` must be a positive integer and it'll be the length of the list.  
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  [
    {
      "id": 168,
      "name": "Of Monsters And Men - Love Love Love",
      "youtubeLink": "https://youtu.be/beiPP_MGz6I",
      "score": 419
    },
    {
      "id": 16,
      "name": "Of Monsters and Men - Crystals",
      "youtubeLink": "https://youtu.be/-PgPZ3F9P4",
      "score": 217
    },
    ...
  ]
  ```
</details>

## How to run

### Install the application

```bash
# Clone this repository
$ git clone https://github.com/gmtorres95/SingMeASong

# Install the dependencies
$ npm i
```

### Configure the .env file

Use the .env.example file

### Run the application

```bash
$ npm run start
```
