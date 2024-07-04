import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title:
    "Hypecraft | Admin Dashboard",
  description: "Admin dashboard to run and monitor pipeline",
};

export default function Home() {
  return (
    <>
    </>
  );
}
