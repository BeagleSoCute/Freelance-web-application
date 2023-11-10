import { useContext, useEffect, useState } from "react";
import ShowPostContentSection from "components/postService/ShowPostContentSection";
import ContentLayout from "layouts/ContentLayout";
const ShowPostDetails = ({}) => {
  return (
    <div className="show-post-details">
      <ContentLayout>
        <ShowPostContentSection />
      </ContentLayout>
    </div>
  );
};

export default ShowPostDetails;
