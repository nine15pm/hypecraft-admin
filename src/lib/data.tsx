"use server"

const BACKEND_HOST_URL = process.env.BACKEND_URL

export async function fetchPipelineDetailStatus(topic_id: number) {

  const url = new URL("/pipelinedetailstatus", BACKEND_HOST_URL)

  const data = fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic_id: topic_id }),
    cache: 'no-store',
  })

  return (await data).json();

}

export async function fetchRunStatus(topic_id: number) {

  const url = new URL("/pipelinerunstatus", BACKEND_HOST_URL)

  const data = fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic_id: topic_id }),
    cache: 'no-store',
  })

  return (await data).json();

}