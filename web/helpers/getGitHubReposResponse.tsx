import axios from 'axios';

export const getGitHubReposResponse = async () => {
	try {
		const res = await axios.get('https://api.github.com/repos/equinor/engineering-symbols/releases');

		if (!res) return;

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
