"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MoleculesPageRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/fiches/creer-examen')
  }, [router])

  return null
}
