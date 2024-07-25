import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://bendcemb:xjQBtoqvwh9UQcJc@cluster0.a9cjh0u.mongodb.net/?authMechanism=DEFAULT";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function GET(request) {
  const url = new URL(request.url);
  const year = url.searchParams.get('year');
  
  try {
    await client.connect();
    const database = client.db("KPI");
    const collection = database.collection("KPI_DATA");
    
    let query = {};
    if (year) {
      query = { year: parseInt(year) };
    }

    const data = await collection.find(query, { projection: { _id: 0 } }).toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: 'Error connecting to the database', error: err }, { status: 500 });
  } finally {
    await client.close();
  }
}
