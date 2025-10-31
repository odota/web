import React from 'react';
import { Link } from 'react-router-dom';
import useStrings from '../../hooks/useStrings.hook';

interface AppLogoProps {
  size?: string;
  onClick?: () => void;
}

const AppLogo = ({ size, onClick }: AppLogoProps) => {
  const strings = useStrings();
  return (
    <Link
      className="font-medium text-primary uppercase hover:opacity-60"
      aria-label="Go to the Open Dota homepage"
      to="/"
      onClick={onClick}
    >
      <span style={{ fontSize: size }}>
        {strings.app_name && `<${strings.app_name}/>`}
      </span>
    </Link>
  );
};

export default AppLogo;
