import axios from 'axios';

function useTicket() {
  const getTicket =  async(id: number) => {
    try {
      const response = await axios.get(`api/ticket/${id}`, {
        responseType: 'json',
      })  
      return response.data
    } catch (error){
      return console.error(error)
    }
  }
  return { getTicket }
}

export default useTicket;
