import React from 'react';

type PostMeta = { date: string; timeToRead: number };

export const PostMeta = ({ date, timeToRead }: PostMeta) => (
  <small className="text-xs text-gray-600 block">
    {date} • {timeToRead} min read
  </small>
);
