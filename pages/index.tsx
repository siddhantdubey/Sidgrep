import Head from 'next/head'
import { useState } from 'react'
import Result from '../components/Result'
import axios from 'axios'
import { ResultProps } from '../components/Result'

export default function Home() {
    const [results, setResults] = useState<ResultProps[]>([])
    const [search, setSearch] = useState<string>("")
    const endpointURL = "https://api.openai.com/v1/embeddings"
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY
    const model = "text-embedding-ada-002"
    return (
        <>
            <Head>
                <title>Sidgrep</title>
                <meta name="description" content="A YouTube Search App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-100 h-screen v-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold mb-10">Sidgrep</h1>
                    <input className="w-96 h-12 rounded-full border-2 border-gray-300 px-4"
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search" />
                    <button className="w-96 h-12 rounded-full bg-blue-500 text-white mt-4 mb-4"
                        onClick={() => {
                            const body = {
                                "input": search,
                                "model": model
                            }
                            axios.post(endpointURL, body, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${apiKey}`
                                }
                            }).then((res) => {
                                console.log(res.data['data'][0]['embedding'])
                                const embedding = res.data['data'][0]['embedding']
                                const pineconeBody = {
                                    "vector": embedding,
                                    "topK": 5,
                                    "includeMetadata": true,
                                    "includeValues": true,
                                    "namespace": ""
                                }
                                const proxy = "https://cors-anywhere.herokuapp.com/"
                                const pineconeURL = process.env.NEXT_PUBLIC_PINECONE_URL
                                const combinedURL = proxy + pineconeURL
                                axios.post(combinedURL, pineconeBody, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Api-Key": process.env.NEXT_PUBLIC_PINECONE_KEY,
                                    }
                                }).then((res) => {
                                    const matches = res.data['matches']
                                    let obtained_vals: ResultProps[] = []
                                    for (let i = 0; i < matches.length; i++) {
                                        const match = matches[i]
                                        const text = match['id']
                                        const metadata = match['metadata']
                                        const link = metadata['link'] + '&t=' + Math.floor(metadata['start']) + 's'
                                        obtained_vals.push({ text: text, link: link, id: text })
                                    }
                                    setResults(obtained_vals)
                                })

                            })
                        }}
                    >Search</button>
                    <div className="flex flex-row">
                        {results.length > 0 && results.map((result) => (
                            <Result result={result} key={result.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
