import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../libs/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key } = req.query

  if (!key) {
    return res.status(400).json({ error: 'Key is required' })
  }

  if (req.method === 'GET') {
    try {
      const data = await redis.get(key as string)
      console.log('data', data)
      res.status(200).json({ cachedResponse: data })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from Redis' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
