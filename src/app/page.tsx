import { AppRoutes, ExternalRoutes } from "@/utils/enums";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary flex flex-col min-h-screen h-full text-accent">
      <header className="flex flex-col md:flex-row justify-between items-center p-6">
        <div className="text-2xl font-bold mb-4 md:mb-0">Delve</div>
        <nav className="space-x-4 mb-4 md:mb-0">
          <Link href={AppRoutes.HOME} className="hover:text-secondary">
            Home
          </Link>
          <Link href={ExternalRoutes.BLOG} className="hover:text-secondary">
            Blog
          </Link>
          <Link
            href={ExternalRoutes.LINKED_IN}
            className="hover:text-secondary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Link
            href={AppRoutes.LOGIN}
            className="bg-secondary text-primary px-4 py-2 rounded-md"
          >
            Log in
          </Link>
          <Link
            href={ExternalRoutes.GITHUB}
            className="bg-accent text-primary px-4 py-2 rounded-md"
          >
            Book a demo
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center h-full justify-center text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          Delving Deeper into Supabase Configs
        </h1>
        <p className="text-xl mb-8">
          Explore the intricacies of Supabase configurations with us.
        </p>
        <Link
          href={AppRoutes.SIGN_UP}
          className="bg-secondary text-primary px-6 py-3 rounded-md"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
