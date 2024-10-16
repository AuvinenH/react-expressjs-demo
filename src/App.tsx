import { useEffect, useState } from 'react';

 function App() {
   const [message, setMessage] = useState<string>('');
 
   useEffect(() => {
     fetch('http://localhost:5000/api/hello')
       .then(response => response.json())
       .then(data => setMessage(data.message))
       .catch(error => console.error('Error fetching data:', error));
   }, []);
 
   return (
     <div className="min-h-screen bg-base-100 flex items-center justify-center">
       <div className="text-center">
         <h1 className="text-4xl font-bold">React + Express Demo</h1>
         <p className="mt-4">{message}</p>
       </div>
     </div>
   );
 }
 
 export default App;
