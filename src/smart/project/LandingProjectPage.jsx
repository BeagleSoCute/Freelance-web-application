import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import { AppContext } from "contexts/app.context";
import { showProjectDetails } from "services/project.service";
const LandingProjectPage = () => {
  const { setProjectDetail, setLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const { projectID } = useParams();
  useEffect(() => {
    const init = async () => {
        setLoading(true)
      const { success, payload } = await showProjectDetails(projectID);
      setLoading(false)

      if (success) {
        const data = payload;
        setProjectDetail(data);
        if (data?.projectDetails.status !== "inProgress" && !data?.projectDetails.isPaid) {
          navigate(`/project-requirement/${projectID}`);
        } else {
          navigate(`/project/${projectID}`);
        }
      } else {
        notification("Something went wrong..., please try again later");
      }
    };
    init();
  }, []);
};

export default LandingProjectPage;
