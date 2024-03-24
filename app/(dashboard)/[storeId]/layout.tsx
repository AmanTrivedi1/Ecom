import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId,
    }
   });

  if (!store) {
    redirect('/');
  };

  return (
    <>
     

<div className="h-full w-full   bg-black   bg-grid-small-white/[0.2]  relative ">
      <div className="absolute -z-50 pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className=' text-text_color'>
        <Navbar />
        {children}
      </div>
      </div>

    </>
  );
};