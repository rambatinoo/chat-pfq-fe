import * as React from "react";
import { Skeleton } from "@mui/material";
import { MessagePreview } from "../components/MessagePreview";

export function PreviewsView({
  nonAdminMessages,
  setTalkingTo,
  category,
  loading,
}) {
  const skeletonCount = 14;

  if (loading) {
    return (
      <div id="column-3" style={{ overflow: "scroll" }}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} id="preview-container">
            <div id="preview-avatar">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div id="message-preview">
              <Skeleton variant="text" width="80%" />
            </div>
            <div id="message-preview-timestamp">
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="column-3" style={{ overflow: "scroll" }}>
      {nonAdminMessages.map((msg) => (
        <MessagePreview
          key={msg.created_at}
          msg={msg}
          setTalkingTo={setTalkingTo}
          category={category}
          loading={loading}
        />
      ))}
    </div>
  );
}
