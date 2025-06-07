import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return ( <div className="flex h-screen">
      {/* Left Panel: Image */}
      <div className="w-1/2 relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Gas Station"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-3xl font-bold">
            Welcome to AI Interview Mocker 🚀
          </h1>
          <p className="mt-2 text-lg max-w-md">
            Just give a try.
          </p>
        </div>
      </div>

      {/* Right Panel: Clerk Sign-In */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
  
}