import axios from "axios";

const url = 'https://api.blackbox.ai/api/chat';
const data = {
  messages: [
    {
      content: 'make a simple python function',
      role: 'user'
    }
  ],
  model: 'deepseek-ai/DeepSeek-V3',
  max_tokens: '1024'
};

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

axios.post(url, data, config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));