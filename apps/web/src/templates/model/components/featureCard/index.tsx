import Button from 'molecules/button';
import IconContainer from 'molecules/iconContainer';

import type { FC } from 'react';
import type { ModelFragment } from 'templates/model/query';

type ModelFeatureCardProps = StripArray<StripMaybe<ModelFragment['features']>>;

const ModelFeatureCard: FC<ModelFeatureCardProps> = ({ icon, label, description, link }) => (
  <div className="flex w-full flex-col justify-start gap-x-13 gap-y-6 rounded-xl bg-white p-6 sm:flex-row">
    <div className="flex w-full items-center gap-4 sm:max-w-42">
      <IconContainer icon={icon || 'info-circle'} size={48} bold />
      {label && <h3 className="text-lg font-medium text-black">{label}</h3>}
    </div>
    <div className="flex max-w-[482px] flex-col gap-4">
      {description && <p className="text-sm text-black">{description}</p>}
      {link && <Button link={link} hierarchy="linkColor" label="Learn More" className="w-fit" />}
    </div>
  </div>
);

export default ModelFeatureCard;
