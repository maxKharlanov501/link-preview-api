import axios from 'axios'
import * as cheerio from 'cheerio'

export interface LinkPreviewResponse {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  favicon: string
}

export const getLinkPreview = async (url: string) => {
  const { data: html } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    },
  })

  const $ = cheerio.load(html)
  const getMeta = (name: string) =>
    $(`meta[name="${name}"]`).attr('content') ||
    $(`meta[property="${name}"]`).attr('content') || ''

  const response: LinkPreviewResponse = {
    title: getMeta('og:title') || $('title').text(),
    description: getMeta('og:description') || getMeta('description'),
    image: getMeta('og:image'),
    url,
    siteName: getMeta('og:site_name'),
    favicon: $('link[rel="icon"]').attr('href') || '/favicon.ico',
  }

  return response
}