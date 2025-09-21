import axios from 'axios';

const api=axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  headers:{
    'x-api-key':import.meta.env.VITE_API_KEY
  }
});
/*
cuando se use en el front, hay que hacer un proxy para evitar problemas de CORS
https://stackoverflow.com/questions/43285956/no-access-control-allow-origin-header-is-present-on-the-requested-resource-when
https://vitejs.dev/config/server-options.html#server-proxy
  api.interceptors.request.use(async(config)=>{
    const user=auth.currentUser;
    if(user){
      const token=await user.getIdToken();
      config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
  });
*/
export default api;