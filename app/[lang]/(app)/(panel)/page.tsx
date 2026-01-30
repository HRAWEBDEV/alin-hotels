export default function Panel() {
 return (
  <div className='h-full grid place-content-center'>
   <div className='w-160'>
    <img
     className='dark:hidden'
     alt='alin logo'
     src='/images/logo/alincloud-light.png'
     draggable={false}
    />
    <img
     className='hidden dark:block'
     alt='alin logo'
     src='/images/logo/alincloud-dark.png'
     draggable={false}
    />
   </div>
  </div>
 );
}
