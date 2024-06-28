"use client"
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { generateNewsletter } from "@/lib/actions";
import SubmitAlert from "../Alerts/SubmitAlert";
import InputGroup from "../FormElements/InputGroup";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";

const initialState = {
  message: "",
  status: ""
}

export default function GenerateNewsletterForm() {
    const [generate_state, formAction] = useFormState(generateNewsletter, initialState)
    const { pending } = useFormStatus();
    const statusmsg = generate_state.status === "success" ? <SubmitAlert alert_type="success" header="Success" msg={generate_state.message} show_time={4000} />
      : generate_state.status === "fail" ? <SubmitAlert alert_type="error" header="Error" msg={generate_state.message} show_time={4000} />
      : "";

    return (
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Generate Newsletter
            </h3>
          </div>
          <form action={formAction}>
            <div className="p-6.5">

              <DatePickerOne
                name="min_date"
                label="Newsletter date"
                required
              />

              <InputGroup
                name="title"
                label="Newsletter title"
                customClasses="mb-4.5"
                value="HYPECRAFT V1 ALPHA"
                required
              />

              <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90" disabled={pending} type="submit">
                {pending ? "Generating newsletter..." : "Generate"}
              </button>
              {statusmsg}
            </div>
          </form>
        </div>
      </div>
    );
  };