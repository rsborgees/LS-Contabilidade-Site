import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function AdminRoute() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    fetch('/api/auth/me')
      .then((response) => setStatus(response.ok ? 'authenticated' : 'unauthenticated'))
      .catch(() => setStatus('unauthenticated'))
  }, [])

  if (status === 'checking') {
    return null
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
