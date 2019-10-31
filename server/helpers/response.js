class Respond {
  constructor(status, message, data, error) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  reply() {
    const response = {};
    response.status = this.status;
    response.message = this.message;
    if (this.data !== null) {
      response.data = this.data;
    } else if (this.error !== null) {
      response.error = this.error;
    }
    return response;
  }
}
export default Respond;