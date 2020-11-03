import { NextApiRequest, NextApiResponse } from 'next'
import { Over, NotOver } from '../../model/IsItFinallyOver'

export const over = () : Over | NotOver => {
  return {
    over: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<Over | NotOver>) => {
  return res.status(200).json(over())
}