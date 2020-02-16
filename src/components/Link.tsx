import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Route } from '../Config';

export type Link = { children: React.ReactNode; className?: string; to: Route };

export const Link = ({ children, className = '', to }: Link) => (
  <GatsbyLink className={`font-semibold ${className}`} to={to}>
    {children}
  </GatsbyLink>
);
