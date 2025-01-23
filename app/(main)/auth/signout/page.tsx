// import { getProviders } from "next-auth/react";

// import SignUpPage from "../signup/page";
// import { redirect } from "next/navigation";
// import SignOut from "./signout";
// import { auth } from "@/auth";

// export default async function Signout(context) {
//   const session = await auth();

//   if (!session) {
//     return redirect("/auth/login");
//   }

//   const providers = await getProviders();

//   return (
//     <>
//       <SignOut />
//     </>
//   );
// }
