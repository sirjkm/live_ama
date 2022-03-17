import Head from 'next/head';
import { connectToDatabase } from '../lib/mongodb';

import 'tailwindcss/tailwind.css';

export default function Home({ isConnected, questions }) {
  console.log(questions);
  return (
    <div className="container">
      <Head>
        <title>Live AMA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
    const { client, db } = await connectToDatabase();

    const isConnected = await client.isConnected();

    const collection = db.collection("questions");

    const questions = await collection.find({}).toArray;

  return {
    props: { isConnected, questions: JSON.parse(JSON.stringify(questions)) }
  };
}
