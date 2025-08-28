import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [shipments, setShipments] = useState<Array<Schema["Shipment"]["type"]>>([]);

  useEffect(() => {
    client.models.Shipment.observeQuery().subscribe({
      next: (data) => setShipments([...data.items]),
    });
  }, []);

  function createShipment() {
    //client.models.Shipment.create({ origin: window.prompt("Shipment origin") });
  }

    
  function deleteShipment(id: string) {
    client.models.Shipment.delete({ id })
  }

  return (
    <main>
      <h1>Task List</h1>
      <button onClick={createShipment}>Add New</button>
      <ul>
        {shipments.map((shipment) => (
          <li onClick={() => deleteShipment(shipment.id)} key={shipment.id}>
            {shipment.origin}  
            {shipment.destination}
            </li>
        ))}
      </ul>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
