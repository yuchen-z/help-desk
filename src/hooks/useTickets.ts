import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTicketStore } from './useTicketStore';

function useTickets() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setTickets} = useTicketStore()

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.get('api/ticket', {
          responseType: 'json',
        })  
        const data = await response.data
        setTickets(data)
      } catch (error){
        if (axios.isAxiosError(error)) setError(error)
        else (setError(new Error('unable to get tickets')))
      } finally{
        setIsLoading(false);
      }
      
    }
    fetchData()
  },[])
  return { error, isLoading };
}

export default useTickets;
