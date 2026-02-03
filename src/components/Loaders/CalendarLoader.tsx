'use client';
import Loader from '../common/loader';

const CalendarLoader = () => {
  return (
    <div className="space-y-[1px]">
      <div className="flex justify-between gap-5 mb-4">
        <div className="grid w-[52%] grid-cols-4 gap-[1px]">
          {Array.from({ length: 4 }).map((_, i) => {
            return <Loader key={i} height="h-10" />;
          })}
        </div>
        <Loader height="h-10" width="w-[10%]" />
      </div>

      <Loader height="h-[4.25rem]" />
      <div className="grid grid-cols-7 gap-[1px]">
        {Array.from({ length: 7 }).map((_, i) => {
          return <Loader key={i} height="h-14" />;
        })}
      </div>
      <div className="grid grid-cols-7 gap-[1px]">
        {Array.from({ length: 7 }).map((_, i) => {
          return <Loader key={i} height="h-28" />;
        })}
      </div>
    </div>
  );
};

export default CalendarLoader;
