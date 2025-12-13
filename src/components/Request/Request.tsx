import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Heading from "../Heading/Heading";
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer";
import useStrings from "../../hooks/useStrings.hook";
import config from "../../config";

const Request = () => {
  const strings = useStrings();
  const [matchId, setMatchId] = useState(window.location.hash.slice(1));
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>();
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const resp = await fetch(`${config.VITE_API_HOST}/api/request/${matchId}`, {
      method: "post",
    });
    const json = await resp.json();
    if (json?.job?.jobId) {
      setJobId(json?.job?.jobId);
      while (true) {
        const resp2 = await fetch(
          `${config.VITE_API_HOST}/api/request/${json.job.jobId}`,
        );
        const job = await resp2.json();
        if (!job || job.state === "completed") {
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
      window.location.href = `/matches/${matchId}`;
      // Maybe could parse eventSource
      // On success or skip, redirect to match page
      // But if the job finishes really fast we might miss the logs, so polling more reliable
    } else {
      setLoading(false);
      setError(true);
    }
  }, [matchId]);
  useEffect(() => {
    if (matchId) {
      // If preset, submit
      handleSubmit();
    }
  }, []);
  return (
    <div>
      <Helmet title={strings.title_request} />
      <Heading title={strings.request_title} className="top-heading" />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100vw",
          width: 600,
          height: "600px",
          gap: "8px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <TextField
          id="match_id"
          label={strings.request_match_id}
          error={Boolean(error)}
          helperText={error && !loading ? strings.request_error : false}
          value={matchId}
          onChange={(e) => {
            setMatchId(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          {strings.request_submit}
        </Button>
        <div style={{ height: "300px", display: jobId ? "block" : "none" }}>
          {
            <ScrollFollow
              startFollowing={true}
              render={({ follow, onScroll }) => (
                <LazyLog
                  stream
                  url={`${config.VITE_API_HOST}/logs/${jobId}`}
                  eventsource
                  follow={follow}
                  onScroll={onScroll}
                  selectableLines
                  wrapLines
                />
              )}
            />
          }
        </div>
      </form>
    </div>
  );
};

export default Request;
