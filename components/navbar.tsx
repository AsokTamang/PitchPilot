import Link from "next/link";
import { auth, signIn, signOut } from "../app/auth";

const Navbar = async () => {
  const session = await auth();   //here we are awaiting the auth function imported from auth.ts file
  console.log('session id in navbar is :',session?.id)

  return (
    <div className="flex flex-row items-center justify-between bg-white shadow-sm px-6 font-work-sans">
      <Link href="/">
        <img src="https://images.unsplash.com/photo-1554306274-f23873d9a26c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo" width={144} height={85} />
      </Link>

      <div className="text-black flex flex-row items-center gap-10">
        {session && session.user ? (
          <>
            <Link href="/startup/create">
              <span>Create</span>
            </Link>

            <Link href={`/user/${session?.id}`}>{session.user.name}</Link>

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">
                <span>Logout</span>
              </button>
            </form>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");   //here we are using the github as the base for signin as we created the oathapp using github
            }}
          >
            <button type="submit">
              <span>Login</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Navbar;
