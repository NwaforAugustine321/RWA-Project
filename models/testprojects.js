const axios = require('axios');
const Project = require('../models/projects');

jest.mock('axios');

describe('Project Model', () => {
  describe('getProjects', () => {
    it('fetches successfully data from an API', async () => {
      const mockData = {
        records: [
          // Your mock data here
        ],
      };

      axios.get.mockResolvedValue({ data: mockData });

      const projects = await Project.getProjects();

      expect(projects).toEqual(mockData.records);
    });

    it('fetches erroneously data from an API', async () => {
      axios.get.mockRejectedValue(new Error('Some error'));

      await expect(Project.getProjects()).rejects.toThrow('Some error');
    });
  });
});
