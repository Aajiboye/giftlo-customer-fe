export default function Loading() {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="animate-pulse">
          <img src="/images/logo.svg" alt="Loading" className="w-32 h-32" />
        </div>
      </div>
    );
  }


  export function LoadingAbove() {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="animate-pulse">
          <img src="/images/logo.svg" alt="Loading" className="w-32 h-32" />
        </div>
      </div>
    );
  }



  