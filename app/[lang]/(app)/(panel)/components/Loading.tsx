export default function Loading() {
 return (
  <div className='fixed inset-0 z-(--startup-loading-zindex)'>
   <div className='flex items-center justify-center h-full bg-white/50 dark:bg-black/50 p-10'></div>
  </div>
 );
}
