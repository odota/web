import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import config from '../../config';

import useStrings from '../../hooks/useStrings.hook';

const Sponsors = () => {
  const strings = useStrings();
  return (
    <div className="flex flex-col items-center mt-8 mb-5 text-center">
      <div className="uppercase text-xl">{strings.home_sponsored_by}</div>
      <div className="my-5 flex flex-col gap-4">
        <a
          href="https://www.openai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            className="h-8"
            src="/assets/images/openai-logo.png"
            alt="Open AI home"
          />
        </a>
        {config.VITE_ENABLE_RIVALRY && (
          <a
            href="https://www.rivalry.com/opendota"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/rivalry-logo.png"
              alt="Logo for sponsor, Rivalry.com"
            />
          </a>
        )}
        {config.VITE_ENABLE_GOSUAI && (
          <a
            href="https://gosu.ai/dota/?utm_source=opendota&utm_medium=cpc&utm_campaign=Home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/gosu-logo.png"
              alt="Logo for sponsor, Gosu.ai"
            />
          </a>
        )}
      </div>
      <div>
        <Button href="mailto:sponsor@opendota.com">
          {strings.home_become_sponsor}
        </Button>
      </div>
    </div>
  );
};

export default Sponsors;
