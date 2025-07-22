import { setPage, useStatsPage, useTotalPages } from 'components/statsCarousel/store';

const StatCarouselSteps = () => {
  const totalPages = useTotalPages(),
    currentPage = useStatsPage();

  return (
    <div className="flex w-full gap-2">
      {Array(totalPages)
        .fill(null)
        .map((_, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="h-1 shrink-0 grow basis-0 cursor-pointer rounded-3xl bg-gray/10 focus-outline-primary transition-colors hover:bg-gray/20 focus-visible:bg-gray/20 aria-[current=true]:bg-gray/40"
            aria-current={currentPage === index}
            onClick={() => setPage(index)}
          />
        ))}
    </div>
  );
};

export default StatCarouselSteps;
