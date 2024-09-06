

class PollAPI {
  baseUrl = 'http://localhost:3333'
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getPolls() {
    const response = await fetch(`${this.baseUrl}/api/v1/polls`);
    const data = await response.json();
    return data;
  }

  async createPoll(formHtml) {
    const formData = new FormData(formHtml);
    const formDataEntries = Object.fromEntries(formData.entries())
    const response = await fetch(`${this.baseUrl}/api/v1/polls`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data;
  }

  async getPoll(pollId) {
    const response = await fetch(`${this.baseUrl}/api/v1/polls/${pollId}`);
    const data = await response.json();
    return data;
  }

  async updatePoll(pollId, formHtml) {
    const formData = new FormData(formHtml);
    const formDataEntries = Object.fromEntries(formData.entries())
    const response = await fetch(`${this.baseUrl}/api/v1/polls/${pollId}`, {
      method: 'PUT',
      body: formData
    });
    const data = await response.json();
    return data;
  }

  async deletePoll(pollId) {
    const response = await fetch(`${this.baseUrl}/api/v1/polls/${pollId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
}