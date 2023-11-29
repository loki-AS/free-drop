import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-xl">
        Welcome to the{" "}
        <span className="capitalize font-semibold">Free Drop</span>
      </h1>
      <Link href="/dashboard">
        <button
          type="button"
          className="bg-blue-500 text-white shadow-md px-4 py-2 rounded"
        >
          Try Free Drop
        </button>
      </Link>
    </main>
  );
}
