import { useState } from 'react'

import { db } from 'services'

interface Output {
  isUpdating: boolean
  updateProfile: (displayName: string) => void
}

const useUpdateProfile = (userId: string): Output => {
  const [isUpdating, setIsUpdating] = useState(false)

  async function updateProfile(displayName: string) {
    setIsUpdating(true)
    try {
      await db.collection('users').doc(userId).update({ displayName })
    } catch (err) {
      console.error(err)
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, updateProfile }
}

export default useUpdateProfile
