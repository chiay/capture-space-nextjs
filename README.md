# Capture Space - A place to show off your images to the rest of the world!
Capture Space is developed using Nextjs, FaunaDB, React Hook Form, SWR, Semantic UI React, and TailwindCSS.
It is deploy to Vercel. Please check it out at [https://capture-space-nextjs.vercel.app/](https://capture-space-nextjs.vercel.app/)

## Getting Started

Clone this repository if you want to run it on your local machine.

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Since the app uses FaunaDB, please register an account, create a collection named 'images', and obtain a secret key. Save the secret key in a file named '.env.local'.
```
# Example
FAUNADB_SECRET_KEY="YOUR_SECRET_KEY_HERE_WITHOUT_QUOTES"
```
Other than that, simply visit the URL above.
