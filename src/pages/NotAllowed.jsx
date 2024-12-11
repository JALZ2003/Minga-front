export default function NotAllowed() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center bg-gray-light mb-8">
        <div className="w-full flex flex-col items-center justify-center pt-[90px] mb-6">
            <h1 className='font-poppins text-orange-secondary leading-10 font-normal text-4xl'>Resource Not Allowed</h1>
        </div>
        <img className='w-full min-h-[527px] max-h-screen object-cover' src='/img/not_allowed.jpg' alt='Perfil' />
    </main>
  )
}
