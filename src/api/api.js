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

  /** Get a user. */

  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    console.log("RES from CapConApi: ", res);
    return res.user;
  }

  /** Get a user's projects */

  static async getUserProjects(userId) {
    const res = await this.request(`users/${userId}/projects`);
    console.log("RES from CapConApi: ", res);
    return res.projects;
  }

  /** Get a list of projects */
  
  static async getProjects(tagText=null) {
    let res = await this.request("projects", { tagText });
    return res.projects;
  }

  /** Get a project */

  static async getProject(id) {
    let res = await this.request(`projects/${id}`);
    console.log("RES from CapConApi: ", res);
    return res.project;
  }

  /** Add a new project */

  static async addProject(data) {
    console.log("DATA SENT: ", data);
    let res = await this.request("projects", data, "post");
    console.log("RES from CapConApi: ", res);
    return res.project;
  }

  /** Like a project */

  static async addProjectLike(data) {
    console.log("addProjectLike DATA: :, data");
    const { projectId } = data;
    const res = await this.request(`projects/${projectId}/likes`, data, "post");
    return res.projectLike;
  }

  /** Unlike a project */
  
  static async removeProjectLike(data) {
    const { projectId, currentUsersLikeId } = data;
    console.log("PROJECTID: ", projectId, "CURRENTUSERSLIKEID: ", currentUsersLikeId, "DATA: ", data);
    const res = await this.request(`projects/${projectId}/likes/${currentUsersLikeId}`, data, "delete");
    return res.deleted;
  }

  /** Get a list of tags */

  static async getTags() {
    let res = await this.request("tags");
    return res.tags;
  }

  /** Add a comment to a project */

  static async addComment(data) {
    console.log("addComment DATA: ", data);
    let res = await this.request("project_comments", data, "post");
    console.log("RES: ", res);
    console.log("RES.COMMENT: ", res.comment);
    return res.comment;
  }

  /** Edit a comment about a project */

  static async updateComment(commentId, data) {
    console.log("updateComment DATA: ", data);
    const res = await this.request(`project_comments/${commentId}`, data, "patch");
    console.log("RES: ", res);
    console.log("RES.COMMENT: ", res.comment);
    return res.comment;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Update user profile */

  static async updateProfile(userId, data) {
    const res = await this.request(`users/${userId}`, data, "patch");
    return res.user;
  }
}

export default CapConApi;