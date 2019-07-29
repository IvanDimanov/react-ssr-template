import request from './request';

const fetchCommandResponse = async (command) => {
  const {data} = await request.post('/api/v1/terminal', {data: {command}});
  return data;
};

export default fetchCommandResponse;
