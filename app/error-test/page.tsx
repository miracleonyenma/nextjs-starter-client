"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorTestPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  // This will cause a render error when showError is true
  if (showError) {
    throw new Error("This is a test error triggered by the user");
  }

  // Function to trigger an async error
  const triggerAsyncError = async () => {
    try {
      // Simulate an API call that fails
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Async operation failed")), 500);
      });
    } catch (error) {
      throw error; // This will be caught by the error boundary
    }
  };

  // Function to trigger a JavaScript runtime error
  const triggerRuntimeError = () => {
    // Accessing a property of undefined
    const obj = undefined;
    // @ts-expect-error: Intentionally accessing a property of undefined to trigger a runtime error
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    obj.someProperty; // This will throw TypeError
  };

  // Hide the page in production
  if (process.env.NODE_ENV === "production") {
    router.push("/"); // Redirect to the homepage or another page
    return null; // Prevent rendering
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Error Testing Page</h1>

        <div className="space-y-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-medium">Render Error</h2>
            <p className="mb-4 text-gray-600">
              Triggers an error during component rendering
            </p>
            <button onClick={() => setShowError(true)} className="btn">
              Trigger Render Error
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-medium">Async Error</h2>
            <p className="mb-4 text-gray-600">
              Triggers an error in an asynchronous operation
            </p>
            <button onClick={triggerAsyncError} className="btn">
              Trigger Async Error
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-medium">Runtime Error</h2>
            <p className="mb-4 text-gray-600">
              Triggers a JavaScript runtime error
            </p>
            <button onClick={triggerRuntimeError} className="btn">
              Trigger Runtime Error
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-medium">404 Not Found</h2>
            <p className="mb-4 text-gray-600">
              Navigate to a non-existent page to test the not-found component
            </p>
            <Link href="/this-page-does-not-exist" className="btn inline-block">
              Go to Non-existent Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
