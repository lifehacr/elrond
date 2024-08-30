import { unstable_noStore as noStore } from 'next/cache'

import GenerateResetTokenForm from '@/components/auth/forgot-password/GeneratedResetTokenForm'
import ResetPasswordForm from '@/components/auth/reset-password/ResetPasswordForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  noStore()
  const token = searchParams?.token || null

  return (
    <div className='my-auto flex h-full justify-center'>
      {token ? <ResetPasswordForm token={token} /> : <GenerateResetTokenForm />}
    </div>
  )
}
