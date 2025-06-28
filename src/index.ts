import express, { Request, Response } from 'express'
import { getLinkPreview } from './services/getLinkPreview'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the LinkPreview API!')
})

app.post('/api/preview', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return
  }

  try {
    const preview = await getLinkPreview(url);
    res.json(preview);
  } catch (error) {
    console.error('Error fetching link preview:', error);
    res.status(500).json({ error: 'Failed to fetch link preview' });
  }
});


app.listen(port, () => {
  console.log('LinkPreview API is running on port', port)
})