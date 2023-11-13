import { useEffect, useState } from "react";
import ShowPostContentSection from "components/postService/ShowPostContentSection";
import ContentLayout from "layouts/ContentLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  showPostDetails,
  sendServiceRequest,
  approveCandidate,
} from "services/service.service";
import RequestForm from "./components/RequestForm";
import { Form } from "antd";
import { notification } from "helpers/notification.helper";
import CandidateLists from "./components/CandidateLists";
import CandidateDetails from "./components/CandidateDetails";

const ShowPostDetails = ({}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postID, type } = useParams();
  const [data, setData] = useState();
  const [isSeeCandidateDetails, setIsSeeCandidate] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await showPostDetails(postID, type);
      setData(result.payload);
    };
    init();
  }, []);
  const handleSubmit = async () => {
    const data = {
      description: form.getFieldValue("description"),
    };
    const { success } = await sendServiceRequest(data, postID, type);
    if (success) {
      notification({ type: "success", message: `Send a request Success` });
      navigate("/service-list");
    } else {
      notification({
        type: "error",
        message: "Can not send a request, please contract admin!",
      });
    }
  };
  const handleSetSeeCandidate = (value) => {
    setCurrentCandidate(value);
    setIsSeeCandidate(true);
  };
  const handleBack = () => {
    setCurrentCandidate({});
    setIsSeeCandidate(false);
  };
  const handleApproveCandidate = async (value) => {
    const transformData = {
      status: value,
      candidateID: currentCandidate.id,
    };
    const { success } = await approveCandidate(transformData, postID, type);
    if (success) {
      notification({ type: "success", message: `Send a request Success` });
      const result = await showPostDetails(postID, type);
      setData(result.payload);
      setCurrentCandidate({});
      setIsSeeCandidate(false);
    } else {
      notification({
        type: "error",
        message: "Can not send a request, please contract admin!",
      });
    }
  };
  return (
    <div className="show-post-details">
      <ContentLayout
        isSubmit={true}
        isGoBackOnly={data?.requestInfo || data?.isOwner ? true : false}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(data?.isOwner ? "/user-panel" : "/service-list")
        }
      >
        <ShowPostContentSection postType={type} data={data} />
        {data?.isOwner ? (
          isSeeCandidateDetails ? (
            <CandidateDetails
              data={currentCandidate}
              onSubmit={handleApproveCandidate}
              onBack={handleBack}
            />
          ) : (
            <CandidateLists
              data={data?.candidates}
              onSetSeeCandidate={handleSetSeeCandidate}
            />
          )
        ) : (
          <RequestForm requestInfo={data?.requestInfo} form={form} />
        )}
      </ContentLayout>
    </div>
  );
};

export default ShowPostDetails;
