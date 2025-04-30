import FormAlbum from '@/components/FormAlbum'
import React from 'react'
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-dark min-h-[100vh]">
      <Link className="flex items-center gap-4 bg-slate-200 p-4" href="/">
        <ArrowLeftIcon className="h-6 w-6" />
        Retour
      </Link>
      <h1 className="py-16 text-center text-slate-100">Album privé</h1>
      <p className="text-slate-300 text-center">Afin d&apos;accéder à votre album privé, merci de bien vouloir saisir le mot de passe que vous avez reçu.</p>
      <FormAlbum />
    </div>
  )
}
