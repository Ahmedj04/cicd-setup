## cicd-test

Simple Node.js app that prints "Hello, World" and includes a Mocha test and a Dockerfile.

### Requirements

- Node.js 18+ (tested with Node 20)
- npm 9+
- Docker (optional, for containerized runs)

### Setup

1. Clone the repository
   
   ```bash
   git clone <your-repo-url>
   cd cicd-test
   ```
2. Install dependencies
   
   ```bash
   npm ci
   ```

### Run locally

- Run the app:
  
  ```bash
  node main.js
  ```
  Expected output: `Hello, World`

- Run tests:
  
  ```bash
  npm test
  ```

### Run with Docker

1. Build the image
   
   ```bash
   docker build -t cicd-test:local .
   ```
2. Run the container
   
   ```bash
   docker run --rm cicd-test:local
   ```

### How the pipeline works

This project is CI-friendly and can be validated with a simple pipeline that:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies with `npm ci`
4. Runs tests with `npm test`
5. (Optional) Builds and pushes a Docker image on main merges

Below is an example GitHub Actions workflow you can drop into `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Test
        run: npm test

  docker:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Authenticate to your registry (example: GitHub Container Registry)
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}/cicd-test:latest
```

### Additional setup for CI/CD

- If using a different container registry (e.g., Docker Hub), replace the login step and `tags` accordingly and add secrets in your repo settings:
  - `REGISTRY_USERNAME`
  - `REGISTRY_PASSWORD`
  - Update `registry`, `username`, and `password` in the login step

- For private registries, ensure network access from the CI runners and correct credentials.

- No environment variables are required by the app itself.

### Project structure

- `main.js`: App entry; prints "Hello, World" and exports `getMessage`.
- `test.js`: Mocha test ensuring the message is correct.
- `dockerfile`: Minimal Node 20-alpine image to run `main.js`.
- `package.json`: Defines the `test` script and dev dependency on Mocha.


