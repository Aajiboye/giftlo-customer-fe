'use client';

const CardLoader = () => {
  return (
    <div className="border border-[#E4E4E4] rounded-xl overflow-hidden bg-white animate-pulse mt-4">     

      {/* Content Section */}
      <div className="pt-3 px-4 py-4 space-y-3">
        {/* Two column data section */}
        <div className="flex border-b pb-[14px]">
          <div className="w-[50%] space-y-1">
            {/* Label */}
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            {/* Value */}
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-1">
            {/* Label */}
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
            {/* Value */}
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Performance period text */}
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        
        {/* Performance button */}
        <div className="h-[30px] w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardLoader;