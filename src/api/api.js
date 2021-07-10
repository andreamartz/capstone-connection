import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API class 
 * 
 * Class with static methods for the purpose of getting data from and sending data to the Capstone Connections API.
*/

class CapConApi {
  // The token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API call: ", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CapConApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("ERR: ", err);
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      console.log("MESSAGE: ", message);
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ------------------------------
  // Individual API routes
  // ------------------------------

  /** Get the current user. */

  // static async getCurrentUser(username) {
  //   let res = await this.request(`users/${username}`);
  //   return res.user;
  // }

  /** Get a list of projects */
  
  static async getProjects() {
    let res = await this.request("projects");
    return res.projects;
  }

  /** Add a new project */

  static async addProject(data) {
    console.log("DATA SENT: ", data);
    let res = await this.request("projects/new", data, "post");
    console.log("RES from CapConApi: ", res);
    return res.project;
  }
  /** Like a project */

  static async addProjectLike(data) {
    console.log("addProjectLike DATA: ", data);
    let res = await this.request("project_likes/new", data, "post");
    console.log("RES: ", res);
    return res.projectLike;
  }

  }

}

export default CapConApi;