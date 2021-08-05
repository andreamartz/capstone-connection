export function asyncWrapper(incomingPromise) {
  return incomingPromise
  .then(data => ({error: null, data}))
  .catch(error => ({error, data: null}))
}

// async function fetcher() {
//   try {
//     const response = fetch("https://dog.ceo/api/breed/hound/images");
//     const data = await response.json();
//     console.log("DATA: ", data);
//     return data;
//   } catch (error) {
//     console.log("ERROR: ", error);
//   }
// }

// async function runMe() {
//   const myData = await fetcher();
//   console.log("MYDATA: ", myData);
// }

