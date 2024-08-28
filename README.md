# Teste PDSoluções

## Getting started

- Run everything together: `docker-compose up`

Now you can visit [`localhost:3000`](http://localhost:3000) from your browser.

### Run projects separeted
- Run the mysql-db: `npm run start:db` or `docker-compose up mysql-db`

- Run the backend-app: `npm run start:back` or `docker-compose up backend-app`

- Run the frontend-app: `npm run start:front` or `docker-compose up frontend-app`

### Clean the database volume
- Run `npm run clean` or `docker-compose down -v`

## Access Back-End Documentation
- `cd insomnia`
- `npx serve`