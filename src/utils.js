import CapConApi from "./api/api";


const asyncWrapper = (incomingPromise) => {
  return incomingPromise
  .then(data => ({error: null, data}))
  .catch(error => ({error, data: null}))
}

const toggleLikeProject = async (projectIdx, currentUser, projects, setProjects) => {
  const currentUserId = currentUser?.id;
  const likerId = currentUserId;  
  const project = projects[projectIdx];
  console.log("PROJECT: ", project);
  let { id, likesCount, currentUsersLikeId } = project;
  const projectId = id;

  // if project already liked by currentUser, unlike it
  if (currentUsersLikeId) {
    const {data, error} = await asyncWrapper(CapConApi.removeProjectLike({ projectId, currentUsersLikeId }));
    if (error) {
      alert("Failed to unlike project. Try again later.");
      return;
    }
    console.log("DATA: ", data);
    if (data) {
      setProjects(currentProjects => {
        const newProjects = [...currentProjects];
        newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount-1, currentUsersLikeId: null};

        return newProjects;
      });
    }
  } else {
    // otherwise, like it
    const {data, error} = await asyncWrapper(CapConApi.addProjectLike({ projectId, likerId }));  // CHECK replace likerId with currentUser.id once we have auth
    if (error) {
      alert ("Failed to like project. Try again later.");
      return;
    }
    console.log("DATA: ", data);
    if (data.id) {
      setProjects(currentProjects => {
        const newProjects = [...currentProjects];
        newProjects[projectIdx] = {...newProjects[projectIdx], likesCount: likesCount+1, currentUsersLikeId: data.id};

        return newProjects;
      });
    }
  }
};

export { asyncWrapper,
         toggleLikeProject };