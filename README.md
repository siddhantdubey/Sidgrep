# Sidgrep

## Why?

I built this because I wanted to play around with OpenAI's new embedding model, build a personal search engine of some sort, and because I thought it would make a good YouTube video. The code isn't really meant to be a starter template or anything, but if you want to use it to start your own project, the next few sections should help you do that fairly easily.

## Getting The Data
Obtaining the data was the most timeconsuming part of the project. There are two steps:
- Obtain the raw text
- Get the embeddings for the text.

To obtain the text, I used [this api](https://github.com/siddhantdubey/Sidgrep) to get the transcripts from my YouTube videos and saved the data in a csv with the following columns: text, start_time, url. You could simplify and combine the url and start_time into one url, but I didn't have the foresight to do to that. Make sure that your embeddings column contains arrays of floats and not strings.

Once you have the raw text, follow the [docs from OpenAI](https://beta.openai.com/docs/guides/embeddings/how-to-get-embeddings) to make an embeddings column in the csv. While you're at it, save your OpenAI key in a `.env` file so that this app can actually run. 

If you want examples to look at, here's a repository with my `.ipynb` files: [examples](https://github.com/siddhantdubey/SidgrepPrep/).

## Hosting The Data 
The size of your data after adding the embedddings will likely be very large (mine went from 2.5 MB before embeddings to 972 MB afterwards). Any naive way of looping through and calculating cosine similarities would probably not be efficient, so I had to host the data somehow. I chose to use [Pinecone](https://www.pinecone.io/), one of the sources recommended by OpenAI. It's a vector database built for vector search, so it saved me a lot of implementation. Follow Pinecone's documentation to upload your data to an index, get the link to your index and save it in the `.env` file as `NEXT_PUBLIC_PINECONE_URL` and save your api key as `NEXT_PUBLIC_PINECONE_KEY`. At this point you should be good to go.

DISCLAIMER: I've heard Pinecone has had some troubles with deleting databases, so progress carefully?

## Running The Project After Setup

YOU WILL PROBABLY NEED A CORS-PROXY! Right now this app is using the [cors-anywhere](https://cors-anywhere.herokuapp.com/) demo proxy. Make sure to set this up before running otherwise you'll run into CORS errors.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

