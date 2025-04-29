import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

export const metadata = {
  title: 'TopProfile | Login',
  description: 'Share your links, social profiles, contact info and more on one page',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Sign In
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Sign in to your account using one of the methods below
        </p>
        <LoginWithGoogle />
      </div>
    </div>
  );
}