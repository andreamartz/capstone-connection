import CapConApi from './api/api';

const asyncWrapper = (incomingPromise) => {
  return incomingPromise
    .then((data) => ({ error: null, data }))
    .catch((error) => ({ error, data: null }));
};

const toggleLikeProject = async (
  projectIdx,
  currentUser,
  projects,
  setProjects
) => {
  const currentUserId = currentUser?.id;
  const likerId = currentUserId;
  const project = projects[projectIdx];
  console.log('PROJECT: ', project);
  let { id, likesCount, currentUsersLikeId } = project;
  const projectId = id;

  // if project already liked by currentUser, unlike it
  if (currentUsersLikeId) {
    const userId = currentUserId;
    const { data, error } = await asyncWrapper(
      CapConApi.removeProjectLike({ projectId, currentUsersLikeId, userId })
    );
    if (error) {
      alert('Failed to unlike project. Try again later.');
      return;
    }
    console.log('DATA: ', data);
    if (data) {
      setProjects((currentProjects) => {
        const newProjects = [...currentProjects];
        newProjects[projectIdx] = {
          ...newProjects[projectIdx],
          likesCount: likesCount - 1,
          currentUsersLikeId: null,
        };

        return newProjects;
      });
    }
  } else {
    // otherwise, like it
    const { data, error } = await asyncWrapper(
      CapConApi.addProjectLike({ projectId, likerId })
    ); // CHECK replace likerId with currentUser.id once we have auth
    if (error) {
      alert('Failed to like project. Try again later.');
      return;
    }
    console.log('DATA: ', data);
    if (data.id) {
      setProjects((currentProjects) => {
        const newProjects = [...currentProjects];
        newProjects[projectIdx] = {
          ...newProjects[projectIdx],
          likesCount: likesCount + 1,
          currentUsersLikeId: data.id,
        };

        return newProjects;
      });
    }
  }
};

const pgTimeToDate = (pgDate) => {
  const newDateMM = pgDate.substring(5, 7);
  const newDateDD = pgDate.substring(8, 10);
  const newDateYYYY = pgDate.substring(0, 4);

  const newDateDay = +newDateDD;
  const newDateYear = +newDateYYYY;

  let newDateMonth;
  switch (newDateMM) {
    case '01':
      newDateMonth = 'January';
      break;
    case '02':
      newDateMonth = 'February';
      break;
    case '03':
      newDateMonth = 'March';
      break;
    case '04':
      newDateMonth = 'April';
      break;
    case '05':
      newDateMonth = 'May';
      break;
    case '06':
      newDateMonth = 'June';
      break;
    case '07':
      newDateMonth = 'July';
      break;
    case '08':
      newDateMonth = 'August';
      break;
    case '09':
      newDateMonth = 'September';
      break;
    case '10':
      newDateMonth = 'October';
      break;
    case '11':
      newDateMonth = 'November';
      break;
    case '12':
      newDateMonth = 'December';
      break;
    default:
      newDateMonth = '';
  }

  return `${newDateMonth} ${newDateDay}, ${newDateYear}`;
};

export { asyncWrapper, toggleLikeProject, pgTimeToDate };
