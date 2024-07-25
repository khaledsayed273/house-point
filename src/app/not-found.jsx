"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null; // Or you can render a loading spinner, message, etc.
}

export default NotFound;