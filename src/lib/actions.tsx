"use server"

export async function runPipeline(prevState: any, data: FormData) {
  try {
    const res = await fetch(`http://localhost:5000/runpipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic_id: data.get("topic_id") }),
      cache: 'no-store',
    })
    const response_body = await res.json()

    return {
      message: response_body.msg,
      status: response_body.type
    }
    
  } catch (error) {
    console.error('Run error', error);
    return {
      message: "Error, failed to start pipeline run",
      status: "fail"
    };
    throw new Error('Failed to fetch pipeline status.');
  }
}

export async function generateNewsletter(prevState: any, data: FormData) {
  try {
    const res = await fetch(`http://localhost:5000/generatenewsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: data.get("title"), min_date: data.get("min_date")}),
      cache: 'no-store',
    })
    const response_body = await res.json()

    return {
      message: response_body.msg,
      status: response_body.type
    }
    
  } catch (error) {
    console.error('Run error', error);
    return {
      message: "Error, failed to start newsletter generation",
      status: "fail"
    };
    throw new Error('Failed to fetch pipeline status.');
  }
}

export async function sendNewsletter(prevState: any, data: FormData) {
  try {
    const res = await fetch(`http://localhost:5000/sendnewsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content_date: data.get("content_date") }),
      cache: 'no-store',
    })
    const response_body = await res.json()

    return {
      message: response_body.msg,
      status: response_body.type
    }
    
  } catch (error) {
    console.error('Run error', error);
    return {
      message: "Error, failed to start newsletter send",
      status: "fail"
    };
    throw new Error('Failed to fetch pipeline status.');
  }
}