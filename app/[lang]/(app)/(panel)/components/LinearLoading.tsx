export default function LinearLoading() {
 return (
  <div className='absolute end-0 start-0 top-0 h-1 bg-primary/50 overflow-hidden z-3'>
   <div className='absolute -top-px left-0 h-[6px] w-1/2 bg-background animate-slide-3s'></div>
   <div className='absolute -top-px left-0 h-[6px] w-1/4 bg-background animate-slide-2s'></div>
  </div>
 );
}
