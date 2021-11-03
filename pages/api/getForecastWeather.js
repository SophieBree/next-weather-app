// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";

export default async function handler(req, res) {
  const city = req.query.city;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=Australia&key=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const response = await fetch(URL);
  const data = await response.json();
  res.status(200).json({ body: { data } });
}
