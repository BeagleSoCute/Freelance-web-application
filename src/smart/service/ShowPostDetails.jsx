import { useContext, useEffect, useState } from "react";
import ShowPostContentSection from "components/postService/ShowPostContentSection";
import ContentLayout from "layouts/ContentLayout";
import { useNavigate, useParams } from "react-router-dom";
import { showPostDetails } from "services/service.service";

const ShowPostDetails = ({}) => {
  const { postID, type } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await showPostDetails(postID, type);
      setData(result.payload);
    };
    init();
  }, []);
  return (
    <div className="show-post-details">
      <ContentLayout>
        <ShowPostContentSection postType={type} data={data} />
      </ContentLayout>
    </div>
  );
};

export default ShowPostDetails;
