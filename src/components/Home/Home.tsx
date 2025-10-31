import React from 'react';
import Buttons from './Buttons';
import Why from './Why';
import Sponsors from './Sponsors';
import useStrings from '../../hooks/useStrings.hook';

export interface HomePageProps {
  user?: string;
}

const Home = () => {
  const strings = useStrings();
  return (
    <div>
      <div className="h-140 flex items-center justify-center">
        <div className="mx-auto text-center max-w-150">
          <div className="text-shadow-lg">
            <h1 className="uppercase text-5xl sm:text-6xl xl:text-[5.625rem] font-medium leading-tight">
              {strings.app_name}
            </h1>
            <h2 className="text-2xl lg:text-4xl">{strings.app_description}</h2>
          </div>
          <div className="mt-6">
            <Buttons />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Why />
        <Sponsors />
      </div>
      <p className="text-sm opacity-60 font-light text-right">
        <span id="bg-image-description">{strings.home_background_by}</span>
        <a
          href="//www.artstation.com/artist/mikeazevedo"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="bg-image-description"
          aria-label="Mike Azevedo on artstation.com"
        >
          {' '}
          Mike Azevedo
        </a>
      </p>
    </div>
  );
};

export default Home;
