type Badges = typeof BadgeVariations;

type BadgeVariants = {
  [K in keyof Badges]: string;
};

const BadgeVariations = {
  green: {
    badge: 'bg-success-500 text-white',
  },
};

const toTwCVA = <T extends Badges>(obj: T, opt: keyof typeof BadgeVariations.green): BadgeVariants =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value[opt]])) as BadgeVariants;

export const badgeVariations = toTwCVA(BadgeVariations, 'badge');

export default BadgeVariations;
