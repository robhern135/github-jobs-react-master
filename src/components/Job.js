import React, { useState } from "react"

//React Bootstrap
import { Card, Badge, Button, Collapse } from "react-bootstrap"

import ReactMarkdown from "react-markdown"

export default function Job({ job }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary mr-2">{job.type}</Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown className="mt-2" source={job.how_to_apply} />
            </div>
          </div>

          <img
            src={job.company_logo}
            alt={job.company}
            className="d-none d-md-block"
            height="50"
          />
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            variant="primary"
          >
            {open ? "Hide" : "View"} Details
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}
