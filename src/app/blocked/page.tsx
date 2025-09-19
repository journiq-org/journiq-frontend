"use client";

import { useRouter } from "next/navigation";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlockedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center">
        <Ban className="mx-auto text-red-500 w-16 h-16 mb-4" />

        <h1 className="text-2xl font-bold text-gray-800">
          Account Blocked
        </h1>
        <p className="mt-3 text-gray-600">
          Your account has been blocked. Please contact our support team
          for further assistance.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to Home
          </Button>
          <Button
            onClick={() =>
              router.push("/support") // if you have a support/contact page
            }
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
