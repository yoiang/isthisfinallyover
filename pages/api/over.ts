import { NextApiRequest, NextApiResponse } from 'next'
import { Over, NotOver } from '../../model/IsItFinallyOver'

export const over = () : Over | NotOver => {
  return {
    over: true,
    sources: [
      ["associated press", "https://apnews.com/article/joe-biden-wins-white-house-ap-fd58df73aa677acb74fce2a69adb71f9"],
      ["fox news", "https://www.foxnews.com/politics/biden-wins-presidency-trump-fox-news-projects"],
      ["new york times", "https://www.nytimes.com/interactive/2020/11/03/us/elections/results-president.html"]
    ]
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<Over | NotOver>) => {
  return res.status(200).json(over())
}