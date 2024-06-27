import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StepStatus } from "@/types/StepStatus";
import { RunStatus } from "@/types/RunStatus";
import { fetchPipelineDetailStatus } from "@/lib/data";
import { fetchRunStatus } from "@/lib/data";
import PipelineSubmit from "@/components/Buttons/PipelineSubmit";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypecraft | Run Pipeline",
  description: "Run pipeline and view status",
};

const initialState = {
  message: "",
  status: ""
}

async function PipelineTable(props: {
  topic_id: number;
  topic_name: string;
}) {
  const data: StepStatus[] = await fetchPipelineDetailStatus(props.topic_id);
  const runstatus: RunStatus = await fetchRunStatus(props.topic_id)

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-5.5 flex flex-row justify-between">
        <h4 className="mr-3 py-[7px] text-body-2xlg font-bold text-dark dark:text-white">
          {props.topic_name}
        </h4>
        {runstatus.run_status === "in_progress" ? <p className="mr-3 flex items-center bg-[#FFA70B]/[0.08] text-[#FFA70B] justify-center px-6 py-[7px] font-medium">Run in progress, started at {runstatus.start_time}</p>
          : runstatus.run_status === "incomplete" ? <p className="mr-3 flex items-center bg-[#D34053]/[0.08] text-[#D34053] justify-center px-6 py-[7px] font-medium">Run stopped: {runstatus.msg}</p>
          : runstatus.run_status === "complete" ? <p className="mr-3 flex items-center bg-[#219653]/[0.08] text-[#219653] justify-center px-6 py-[7px] font-medium">Run completed at {runstatus.end_time}</p>
          : <p className="mr-3 flex items-center bg-[#737373]/[0.08] text-[#737373] justify-center px-6 py-[7px] font-medium">Run not started</p>}
      </div>
      <PipelineSubmit topic_id={props.topic_id} run_status={runstatus.run_status} />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-dark-6 xl:pl-7.5">
                Step
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-dark-6">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-dark dark:text-dark-6">
                Duration
              </th>
              <th className="px-4 py-4 font-medium text-dark dark:text-dark-6 xl:pr-7.5">
                Attempts
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-dark dark:text-dark-6 xl:pr-7.5">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((step, index) => (
              <tr key={index}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {step.step_name}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p
                    className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                      step.status === "success"
                        ? "bg-[#219653]/[0.08] text-[#219653]"
                        : step.status === "error"
                          ? "bg-[#D34053]/[0.08] text-[#D34053]"
                          : step.status === "in_progress"
                            ? "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                            : "bg-[#737373]/[0.08] text-[#737373]"
                    }`}
                  >
                    {step.status}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {step.duration}s
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {step.attempts}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {step.detail}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default async function PipelinePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pipeline" />
      <div className="flex flex-col gap-10">
        <PipelineTable topic_id={1} topic_name={"Formula 1 🏎️"} />
        <PipelineTable topic_id={2} topic_name={"Crypto 🪙"} />
        <PipelineTable topic_id={3} topic_name={"AI 🤖"} />
      </div>
    </DefaultLayout>
  );
};
