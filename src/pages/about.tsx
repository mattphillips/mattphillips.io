import React from 'react';

import { Page } from '../components/Page';
import { Route } from '../Config';

const About = () => (
  <Page current={Route.ABOUT}>
    <div className="px-6">
      <h4>Hey I'm Matt 👋</h4>

      <p className="my-4">
        I'm a London based software engineer with a passion for solving complex problems with elegant solutions; writing
        clean, test-driven code; learning new technologies, techniques and best-practices.
      </p>
      <p>Passionate for pure functional programming and contributing to open-source software.</p>
    </div>
  </Page>
);

export default About;
