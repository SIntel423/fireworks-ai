const buttonVariations = {
  primary: [
    // default
    'bg-purple-400 text-white rounded-lg',
    // hover
    'hover:bg-purple-500 group-hover:bg-purple-500',
    // focus
    'focus-visible:bg-purple-500',
  ],
  outline: [
    // default
    'bg-transparent border text-neutrals-900 border-neutrals-900 dark:text-white dark:border-white rounded-lg',
    // hover
    'hover:bg-white/30 group-hover:bg-bg-white/30',
    // group-hover
    'focus-visible:bg-bg-white/30',
  ],
  link: [
    // default
    'text-neutrals-900 dark:text-white',
    // hover
    'hover:text-purple-400 group-hover:text-purple-400',
    // group-hover
    'focus-visible:text-purple-400',
  ],
};

export default buttonVariations;
