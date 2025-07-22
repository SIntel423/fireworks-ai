import { twJoin } from 'tailwind-merge';

import IconContainer from 'molecules/iconContainer';

import type { IconIds } from '@packages/ui/icons';
import type { FC } from 'react';
import type { ModelFragment } from 'templates/model/query';

type ModelInfoProps = Pick<
  ModelFragment,
  | 'serverless'
  | 'fineTuning'
  | 'pricingInput'
  | 'pricingOutput'
  | 'pricingUnit'
  | 'collapsePricing'
  | 'contextLength'
  | 'provider'
  | 'modelType'
>;
interface InfoCardProps {
  title: string;
  value: string;
  icon: IconIds;
  size?: 'sm' | 'lg';
  noBorder?: boolean;
}

const generatePrice = (
  input: ModelInfoProps['pricingInput'],
  output: ModelInfoProps['pricingOutput'],
  collapse: ModelInfoProps['collapsePricing'],
) => {
  const isCollapsed = Boolean(collapse) || input === output;

  if (!input && !output) return { isCollapsed, pricingValue: 'No Pricing Available' };

  if (isCollapsed) return { isCollapsed, pricingValue: input ? `$${input}` : `$${output}` };

  return { isCollapsed, pricingValue: `$${input} / $${output}` };
};

const unit = {
  million: '1M Tokens',
  image: 'Image',
  step: 'Step',
  minute: 'Minute',
};

const InfoCard: FC<InfoCardProps> = ({ title, value, icon, size, noBorder }) => (
  <div className={twJoin('flex w-full items-center gap-4', noBorder ? '' : 'border-b border-b-neutrals-300 pb-4')}>
    <IconContainer icon={icon} />
    <h3 className="text-md text-black">{title}</h3>
    <p
      className={twJoin(
        'ml-auto text-right font-medium',
        size === 'lg' ? 'text-display-xs sm:text-display-sm lg:text-display-md' : 'text-lg',
      )}
    >
      {value}
    </p>
  </div>
);

const ModelInfo: FC<ModelInfoProps> = ({
  provider,
  modelType,
  contextLength,
  serverless,
  fineTuning,
  pricingInput,
  pricingOutput,
  pricingUnit,
  collapsePricing,
}) => {
  const { pricingValue, isCollapsed } = generatePrice(pricingInput, pricingOutput, collapsePricing);

  return (
    <div className="flex flex-col gap-4">
      {provider?.company?.name && <InfoCard title="Provider" value={provider.company.name} icon="home-01" />}
      {modelType && (
        Array.isArray(modelType) && modelType.length > 0 && (
          // Display multiple model types
          <div className="flex w-full items-center gap-4 border-b border-b-neutrals-300 pb-4">
            <IconContainer icon="text-align-justify" />
            <h3 className="text-md text-black">Model Type</h3>
            <div className="ml-auto flex flex-wrap justify-end gap-2">
              {modelType.map(type => (
                <span key={type._id} className="rounded-full bg-neutrals-100 px-2 py-1 text-sm font-medium">
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      {contextLength && <InfoCard title="Context Length" value={contextLength} icon="spacing-width" />}
      {serverless && (
        <InfoCard title="Serverless" value={serverless ? 'Available' : 'Unavailable'} icon="upload-cloud" />
      )}
      {fineTuning && <InfoCard title="Fine-Tuning" value={fineTuning ? 'Available' : 'Unavailable'} icon="wrench" />}
      <InfoCard
        title={`Pricing Per ${unit[pricingUnit || 'million']}${isCollapsed ? '' : ' Input/Output'}`}
        value={pricingValue}
        icon="currency-dollar-circle"
        size="lg"
        noBorder
      />
    </div>
  );
};

export default ModelInfo;
