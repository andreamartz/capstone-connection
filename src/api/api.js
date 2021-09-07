import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API class
 *
 * Class with static methods for the purpose of getting data from and sending data to the Capstone Connections API.
 */

class CapConApi {
	// The token for interacting with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API call: ', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${CapConApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			const message = err.message;
			console.error('API Error:', err.response, 'MESSAGE: ', message);
		}
	}

	// ------------------------------
	// Individual API routes
	// ------------------------------

	/** Get a user. */

	static async getUser(id) {
		const res = await this.request(`users/${id}`);
		return res?.user;
	}

	/** Get a user's projects */

	static async getUserProjects(userId) {
		const res = await this.request(`users/${userId}/projects`);
		return res.projects;
	}

	/** Get a list of projects */

	static async getProjects(tagText, sortVariable) {
		const res = await this.request('projects', { tagText, sortVariable });
		return res.projects;
	}

	/** Get a project */

	static async getProject(id) {
		const res = await this.request(`projects/${id}`);
		return res?.project;
	}

	/** Add a new project */

	static async addProject(data) {
		let res = await this.request('projects', data, 'post');
		return res.project;
	}

	/** Like a project */

	static async addProjectLike(data) {
		const { projectId } = data;
		const res = await this.request(`projects/${projectId}/likes`, data, 'post');
		return res.projectLike;
	}

	/** Unlike a project */

	static async removeProjectLike(data) {
		const { projectId, currentUsersLikeId } = data;
		const res = await this.request(
			`projects/${projectId}/likes/${currentUsersLikeId}`,
			data,
			'delete',
		);
		return res.deleted;
	}

	/** Add a new tag
	 * data = { text }
	 */
	static async addTag(data) {
		const res = await this.request(`tags`, data, 'post');
		return res.tagText;
	}

	/** Get a list of tags */

	static async getTags() {
		const res = await this.request('tags');
		return res.tags;
	}

	/** Add a comment to a project */

	static async addComment(data) {
		const res = await this.request('project_comments', data, 'post');
		return res.comment;
	}

	/** Edit a comment about a project */

	static async updateComment(commentId, data) {
		const res = await this.request(
			`project_comments/${commentId}`,
			data,
			'patch',
		);
		return res.comment;
	}

	/** Get token for login from username, password. */

	static async login(data) {
		const res = await this.request(`auth/token`, data, 'post');
		return res.token;
	}

	/** Signup for site. */

	static async signup(data) {
		const res = await this.request(`auth/register`, data, 'post');
		return res.token;
	}

	/** Register demo user. */

	static async signupDemo() {
		const res = await this.request(`auth/register/demo`);
		return res.token;
	}

	/** Update user profile */

	static async updateProfile(userId, data) {
		const res = await this.request(`users/${userId}`, data, 'patch');
		return res.user;
	}
}

export default CapConApi;
