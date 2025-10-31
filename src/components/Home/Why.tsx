import React from 'react';
import { IconOpenSource, IconStatsBars, IconWand } from '../Icons';
import useStrings from '../../hooks/useStrings.hook';

const WhyItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {icon}
      <div className="mt-4">
        <div className="headline text-2xl leading-relaxed">{title}</div>
        <div className="description font-light">{description}</div>
      </div>
    </div>
  );
};

const Why = () => {
  const strings = useStrings();
  return (
    <div className="text-center max-w-480 py-12 border-b border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <WhyItem
          icon={<IconOpenSource className="w-20 fill-blue" />}
          title={strings.home_opensource_title}
          description={strings.home_opensource_desc}
        />
        <WhyItem
          icon={<IconStatsBars className="w-20 fill-blue" />}
          title={strings.home_indepth_title}
          description={strings.home_indepth_desc}
        />
        <WhyItem
          icon={<IconWand className="w-20 fill-blue" />}
          title={strings.home_free_title}
          description={strings.home_free_desc}
        />
      </div>
    </div>
  );
};

export default Why;
