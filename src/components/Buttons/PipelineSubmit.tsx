"use client"
import { runPipeline } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import SubmitAlert from "../Alerts/SubmitAlert";

const initialState = {
    message: "",
    status: ""
  }
  
export default function PipelineSubmit(props: {
    topic_id: number;
    run_status: string;
  }) {
    const [state, formAction] = useFormState(runPipeline, initialState)
    const statusmsg = state.status === "success" ? <SubmitAlert alert_type="success" header="Success" msg={state.message} show_time={4000} />
      : state.status === "fail" ? <SubmitAlert alert_type="error" header="Error" msg={state.message} show_time={4000} />
      : "";
    const router = useRouter()
    const handleClick = () => {
      router.refresh();
    };

    return (
      <div>
        <form className="mb-5.5 flex flex-wrap items-left" action={formAction}>
          <input name="topic_id" className="hidden" value={props.topic_id} />
          {props.run_status === "in_progress" ? ""
            : <button className="mr-3 flex items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90" type="submit">Run</button>}
          <button
            className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white hover:bg-[#737373]/[0.08]"
            type="button"
            onClick={handleClick}
          >
            Refresh
          </button>
        </form>
        <p className="mb-5.5">
          {statusmsg}
        </p>
      </div>
    );
  };