/* eslint-disable class-methods-use-this */
class JsonService {
  async getTasks() {
    try {
      const url = 'http://localhost:3000/tasks';
      const response = await fetch(url, {
        method: 'Get',
      });
      const apiData = await response.json();
      return apiData;
    } catch (error) {
      return error;
    }
  }
}

export default JsonService;
