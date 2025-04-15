'use client';
import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [loading, isStateLoading] = useState<true | false>(false);
  const auth = useAuth()
  const logoutFromApplication = async () => {
    isStateLoading(() => true)

    setTimeout(() => {
      auth.handleSignOut()
    }, 4000)

  }
  return (
    <form action={logoutFromApplication} className='w-full'>
      <Button type="submit" className="bg-red-500 w-full !font-bold hover:!bg-red-200">
        {loading && <Loader className='animate-spin' />}
        Logout
      </Button>
    </form>
  );
}
