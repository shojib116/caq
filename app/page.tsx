import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full h-screen text-center flex flex-col justify-center gap-10">
      <h1 className="text-5xl font-bold">
        <span className=" bg-clip-text text-transparent bg-gradient-to-tl from-blue-600 to-green-500 drop-shadow-lg">
          Welcome,
        </span>
        <br />
        <span className="text-slate-600 drop-shadow">to</span>
        <br />
        <span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-orange-300 to-green-300">
          Competency Assessment Questionniare
        </span>
      </h1>
      <p className="font-medium">
        To go further, please{" "}
        <Link href="/signin" className="text-blue-600 underline">
          sign in
        </Link>
      </p>
    </div>
  );
}
