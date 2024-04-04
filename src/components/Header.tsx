"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button";

export default function Header(){
    const session = useSession()
    return(
        <header>
            <div>
                {session.data ? <Button onClick={() => signOut()}>SignOut</Button> : <Button onClick={() => signIn()}>SignIn</Button> }
                {session.data?.user?.name}
                <ModeToggle/>
            </div>
        </header>
       
    )
}