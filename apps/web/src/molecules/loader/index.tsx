import type { FC } from 'react';


const Loader: FC = () => (
  <div className="relative">
    <div className="h-4 aspect-[8] bg-dot-loader-neutrals-100" />
    <div className="absolute top-0 h-4 aspect-[8] bg-dot-loader-purple-400 clip-loader animate-dot-loader" />
  </div>
);

export default Loader;
