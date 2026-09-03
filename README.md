# URL Shortener

A small Express.js web app that turns long URLs into short links and redirects visitors to the original address.

## Features

- Browser-based interface for shortening URLs
- JSON API for programmatic use
- Redirects short links to their original URLs
- File-based storage in `urls.json`
- Configurable port and public base URL for deployment

## Requirements

- [Node.js](https://nodejs.org/) (version 18 or later recommended)

## Run locally

```bash
npm install
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

The app supports these environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | Port the server listens on. |
| `BASE_URL` | `http://localhost:<PORT>` | Public base URL used when returning shortened links. Set this when deploying. |

Example:

```bash
PORT=8080 BASE_URL=https://short.example.com node server.js
```

## API

### Create a short URL

`POST /shorten`

Request body:

```json
{
  "originalUrl": "https://example.com/a/very/long/url"
}
```

Successful response:

```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "shortId": "abc123",
  "originalUrl": "https://example.com/a/very/long/url"
}
```

If `originalUrl` is missing, the API returns `400 Bad Request`.

### Use a short URL

Visit `GET /:shortId`, such as `http://localhost:3000/abc123`. The server redirects to the saved original URL; unknown IDs return `404 URL not found`.

## Storage

Short-link mappings are saved in `urls.json` in the project root. This makes the project simple to run locally, but is not intended for concurrent or production-scale storage. Use a database for a production deployment.

## Project structure

```text
public/index.html  Front-end page
server.js          Express server and API routes
urls.json          Persisted short-link mappings
```

## License

This project is licensed under the ISC license.
