import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import GenerateNewsletterForm from "@/components/Forms/GenerateNewsletterForm";
import SendNewsletterForm from "@/components/Forms/SendNewsletterForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypecraft | Generate",
  description: "Generate and send newsletter",
};

export default async function GeneratePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Generate" />
      <div className="flex flex-col gap-10">
        <GenerateNewsletterForm />
        <SendNewsletterForm />
      </div>
    </DefaultLayout>
  );
};
