import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from './prisma';

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.ACCESS_TOKEN_NAME];

    if (token) {
      let user: User;

      try {
        const { payload } = jwt.verify(token, process.env.TOKEN_SECRET, {
          complete: true,
        });

        const id = (payload as JwtPayload).id as number;
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error('User not found');
        }
      } catch (error) {
        res.status(401);
        res.json({ error: 'Not authorized' });
        return;
      }

      return handler(req, res, user);
    }
  };
};
