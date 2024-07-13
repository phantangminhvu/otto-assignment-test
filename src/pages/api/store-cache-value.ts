import redis from '../../libs/redis'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { key, value } = req.body
    console.log('vvv', { key, value })

    if (!key || !value) {
      return res.status(400).json({ error: 'Key and value are required' })
    }

    try {
      await redis.set(key, value)
      res.status(200).json({ message: 'Value stored successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error storing value in Redis' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
