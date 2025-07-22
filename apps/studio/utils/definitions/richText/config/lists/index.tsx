const listOptions = [
  { title: 'Bullet', value: 'bullet' },
  { title: 'Numbered', value: 'number' },
] as const;

export type ListOptions = (typeof listOptions)[number]['value'];

export default listOptions;
