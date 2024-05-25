export default function Page() {
  return (
    <div className="bg-[#161b22] h-screen flex flex-col justify-center items-center">
      <div className="px-8 py-5 rounded-xl bg-[#0d1117] text-white">
        <form action="">
          <fieldset>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@usbair.com"
              className="bg-transparent border border-[#555] rounded-md py-2 px-4 w-72 placeholder:text-sm placeholder:text-gray-500"
            />
            <br />
            <input
              type="submit"
              value="Sign in with Email"
              className="p-3 text-center cursor-pointer bg-[#161b22] w-full rounded-md mt-2 hover:bg-[#0f6ddb] text-sm"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
