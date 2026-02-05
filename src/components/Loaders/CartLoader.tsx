'use client';
import Loader from '../common/loader';

const CartLoader = () => {
  return (
    <div className="mt-5">
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

export default CartLoader;
