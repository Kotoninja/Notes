![Django](https://img.shields.io/badge/Django-v6.0-grey?logo=Django&logoColor=green&labelColor=grey)
![React](https://img.shields.io/badge/React-grey?logo=React)
![Vite](https://img.shields.io/badge/Vite-grey?logo=Vite)
![Docker](https://img.shields.io/badge/Docker-grey?logo=Docker)

# Notes

**NOTES** - a web application for taking notes.

## Description

**Fullstack**: React(frontend) + Django(backend/API).  
**Database**: SQLite (for develop) / PostgreSQL (for production).  
**Cache**: Redis  
**Authentication**: JWT.  
**Main functions**: CRUD (Create, Read, Update, Delete ), Authentication, Search, Tags.  
**The essence of the project**: Managing Notes.  
**Target**: Demonstration and training of my full stack development skills.

## Getting Started

* Python 3.12 +
* Node.js 20+
* npm
* Docker

### Dependencies

#### Frontend:
  - React -- v19.2.0
  - Vite -- v7.2.5
  - Material UI -- v7.3.6
  - React-router-dom -- v7.11.0
  - Axios -- v1.13.2
  - jwt-decode -- v4
#### Backend:
  - Django -- v6
  - Django REST framework -- v3.16.1
  - DRF SimpleJWT -- v5.5.1
  - Psycopg -- v3.3.2
  - Redis -- v7.1
  - Hiredis -- v3.3
  - DRF Spectacular -- v0.29
  - Django Environ -- v0.12
  - Django cors headers -- v4.9
#### DevOps:
 - Docker
 - Docker-compose

### Installing

1. Clone the repository
```
git clone git@github.com:Kotoninja/Notes.git
cd Notes
```
2. Env configuration

```
touch .env
```
Open the .env file and paste the entire contents of the .env.example file
> [!TIP]
> If you want to start the project quickly run ```cp .env.example .env```, otherwise see the .env.dist file and set up your own .env file.

> [!CAUTION]
> **Don't** use data from the .env.example file in a production environment.

### Executing program

* Run ```docker compose run --build```
* Open your browser and go to http://localhost:3000

## Help
> [!NOTE]
> This content will be added later.

## Authors

Contributors names and contact info

ex. Kotoninja  

## Version History

> [!NOTE]
> This content will be added later.
