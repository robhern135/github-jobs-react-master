import { useState } from "react"
import useFetchJobs from "./utilities/useFetchJobs"
import { Container, Spinner } from "react-bootstrap"

import Job from "./components/Job.js"
import JobsPagination from "./components/JobsPagination"
import SearchForm from "./SearchForm"

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)

    setParams((prevParams) => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <Spinner
          className="mb-3"
          animation="border"
          role="status"
          variant="primary"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {error && <h1>Error. Try refreshing.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}

export default App
