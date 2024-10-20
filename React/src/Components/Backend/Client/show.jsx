
import { useState, useEffect } from 'react';
import { apiUrl, token } from '../../http';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Show = () => {
  const [clients, setClients] = useState([]);

  // Fetch services from the API
  const fetchClients = async () => {
    try {
      const res = await fetch(apiUrl + 'clients', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      console.log('API Result:', result); // Checking the response in console

      // Assuming the data is in result.data
      setClients(result.data || result);  // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching clients:', error);  // Log errors
    }
  };


   const deleteClients = async (id) => {
    if(confirm('Are you sure you want to delete this clients?')) {

      const res = await fetch(apiUrl + 'clients/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      // console.log( result); 
      if (result.status == true) {
        const newClients = clients.filter((client) => client.id != id);
        setClients(newClients);
        toast.success(result.message);
      } else{
        toast.error(result.message);
      }

    }

 
  }


  // Fetch services when component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
    <div className="flex h-screen">
    

        {/* Table Content */}
        <div className="p-4 flex-1 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Clients Table</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if services exist and map through them */}
              {clients && clients.map((client) => (
                <tr key={client.id} className="bg-gray-100 text-left">
                  <td className="py-2 px-4 border-b">{client.id}</td>
                  <td className="py-2 px-4 border-b">{client.name}</td>
                  <td className="py-2 px-4 border-b">{client.email}</td>
                    <td className="py-2 px-4 border-b">{client.address}</td>
                  <td className="py-2 px-4 border-b">{client.pic}</td>
                  <td className="py-2 px-4 border-b">
  <span
    className={`px-2 py-1 rounded-full text-white ${
        client.status === 'active' ? 'bg-green-500' : 'bg-red-500'
    }`}
  >
    {client.status === 'active' ? 'Active' : 'Inactive'}
  </span>
</td>
                  <td className="py-2 px-4 border-b">
                   
                      <Link to={`/admin/services/edit/${client.id}`}>Edit</Link>
                    <button onClick={() => deleteClients(client.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Show;
