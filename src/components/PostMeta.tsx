import React from 'react';

type PostMeta = { date: string; timeToRead: number };

export const PostMeta = ({ date, timeToRead }: PostMeta) => (
  <small className="text-sm text-gray-600 block">
    {date} • {timeToRead} min read
  </small>
);
