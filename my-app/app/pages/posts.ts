import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;
  const posts = [
    { id: '1', title: 'Post 1' },
    { id: '2', title: 'Post 2' },
  ];

  const filteredPosts = posts.filter(post => post.title.includes(search as string));
  res.status(200).json(filteredPosts);
}