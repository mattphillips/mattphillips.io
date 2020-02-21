import React from 'react';
import { Link } from './Link';
import { Route } from '../Config';
import { Stats } from './icons/Stats';
import { Profile } from './icons/Profile';
import { Home } from './icons/Home';

import pic from '../images/profile.png';

export type Page = { children: React.ReactNode; current: Route };

const getColour = (current: Route, x: Route) => (current === x ? 'text-gray-900' : 'text-gray-500');

export const Page = ({ children, current }: Page) => (
  <section className="max-w-4xl mx-auto ">
    <header className="flex flex-row items-center px-6 pt-12 pb-8 md:justify-between">
      <div className="flex flex-row items-center w-full">
        <img className="rounded-full h-16 mr-4" src={pic} alt="Matt Phillips" />
        <h3 className="m-0">Matt Phillips</h3>
      </div>
      <ul className="hidden md:flex flex-row">
        <li className={`mr-8 ${getColour(current, Route.HOME)}`}>
          <Link to={Route.HOME}>Blog</Link>
        </li>
        <li className={`mr-8 ${getColour(current, Route.ABOUT)}`}>
          <Link to={Route.ABOUT}>About</Link>
        </li>
        <li className={getColour(current, Route.STATS)}>
          <Link to={Route.STATS}>Stats</Link>
        </li>
      </ul>
    </header>

    <main className="pb-24">{children}</main>

    <footer className="w-full max-w-4xl fixed bottom-0 bg-white pt-2 pb-6 shadow-md md:hidden px-8">
      <ul className="flex flex-row items-center justify-between ">
        <li className={`${getColour(current, Route.HOME)}`}>
          <Link className="p-2 flex" to={Route.HOME}>
            <Home />
          </Link>
        </li>
        <li className={`${getColour(current, Route.ABOUT)}`}>
          <Link className="p-2 flex" to={Route.ABOUT}>
            <Profile />
          </Link>
        </li>
        <li className={`${getColour(current, Route.STATS)}`}>
          <Link className="p-2 flex" to={Route.STATS}>
            <Stats />
          </Link>
        </li>
      </ul>
    </footer>
  </section>
);
