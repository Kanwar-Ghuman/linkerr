import { redirect } from "next/navigation";
import SignOutButton from "./signout";
import { auth } from "@/auth";

export default async function SignOutPage() {
    const session = await auth();

    if (!session) {
        return redirect("/auth/login");
    }

    return <SignOutButton />;
}

