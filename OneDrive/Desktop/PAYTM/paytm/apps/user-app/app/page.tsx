"use client";
import { signIn,signOut,useSession } from "next-auth/react";
import { useBalance } from "@repo/store/useBalance";
import { Appbar } from "@repo/ui/appbar";


export default function() {
  const session = useSession();
  const balance = useBalance();
  return <div>
    <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
  </div>
}