"use server"
export async function fetchPipelineDetailStatus(topic_id: number) {
  try {
    const data = fetch(`http://localhost:5000/pipelinedetailstatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic_id: topic_id }),
      cache: 'no-store',
    })

    return (await data).json();
    
  } catch (error) {
    console.error('API error', error);
    throw new Error('Failed to fetch pipeline detail status.');
  }
}

export async function fetchRunStatus(topic_id: number) {
  try {
    const data = fetch(`http://localhost:5000/pipelinerunstatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic_id: topic_id }),
      cache: 'no-store',
    })

    return (await data).json();
    
  } catch (error) {
    console.error('API error', error);
    throw new Error('Failed to fetch run status.');
  }
}