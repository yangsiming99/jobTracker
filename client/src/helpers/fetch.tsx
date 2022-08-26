const addJob = (link: string) => {
  return new Promise ((resolve, reject) => {
    fetch('http://localhost:8080/jobs/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({jobLink: link})
    })
    .then(response => response.json())
    .then(resp => {
      console.log(resp)
      resolve(resp)
    })
  })
}

const deleteJob = (jobId: string) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/jobs?jobid=${jobId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(resp => resolve(resp))
  })
}

const searchJob = (search: string) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/jobs/search?search=${search}`)
    .then(response => response.json())
    .then(resp => resolve(resp))
  })
}

const getCoverLetter = (job_id: string) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/coverletter?job_id=${job_id}`)
    .then(response => response.json())
    .then(resp => resolve(resp))
  })
}

export {
  addJob,
  deleteJob,
  searchJob,
  getCoverLetter
}