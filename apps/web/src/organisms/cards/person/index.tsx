import { hasArrayValues } from '@packages/utils/src/arrays';

import { constructName } from 'molecules/attribution';
import Icon from 'molecules/icon';
import Image from 'molecules/image';
import Link from 'molecules/link';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';
import type { personFragment } from 'molecules/attribution';
import type { FC } from 'react';

export type PersonCardFragment = InferFragmentType<typeof personFragment>;

const PersonCard: FC<PersonCardFragment> = ({ headshot, firstName, lastName, role, previousRole, socials }) => (
  <div className="group relative flex w-full flex-col overflow-hidden rounded-[10px] shadow-none transition-shadow hover:shadow-xl">
    <div className="aspect-[154/123] w-full overflow-hidden">
      {headshot && <Image {...headshot} objectCover className="size-full [&>img]:object-[center_calc(50%_+_20px)]" />}
    </div>
    <div className="flex w-full grow flex-col gap-2 bg-neutrals-900 p-4 sm:p-6">
      <div className="flex w-full flex-col gap-2">
        {(firstName || lastName) && (
          <div className="text-display-sm font-medium text-white sm:text-display-md lg:text-display-lg">
            {constructName(firstName, lastName)}
          </div>
        )}
        {role && <span className="font-favorit text-mono-sm sm:text-mono-md lg:text-mono-lg font-medium text-purple-50">{role}</span>}
      </div>
      <hr className="mt-2 border-white/10" />
      {previousRole && (
        <span className="line-clamp-2 text-xs leading-normal text-white/50">Previously {previousRole}</span>
      )}
    </div>
    {hasArrayValues(socials) && (
      <div className="absolute top-6 right-6 flex flex-col gap-4.5 opacity-0 transition-opacity group-hover:opacity-100">
        {socials.map(social => (
          <Link key={social.account} href={social.url} className="text-white/50 transition-colors hover:text-white">
            <Icon icon={social.account as IconIds} size={32} />
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default PersonCard;
