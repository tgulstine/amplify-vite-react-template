import { useState } from 'react';
import { Package, Truck, MapPin, Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import './App.css'; // Import the CSS file

const ShipmentForm = () => {
  const [shipments, setShipments] = useState([
    {
      id: 'SH001',
      trackingNumber: 'TRK123456789',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      status: 'In Transit',
      weight: '25.5',
      dimensions: '12x8x6',
      carrier: 'FedEx',
      shipDate: '2024-08-25',
      estimatedDelivery: '2024-08-30',
      recipient: 'John Doe'
    },
    {
      id: 'SH002',
      trackingNumber: 'TRK987654321',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'Delivered',
      weight: '18.2',
      dimensions: '10x6x4',
      carrier: 'UPS',
      shipDate: '2024-08-20',
      estimatedDelivery: '2024-08-24',
      recipient: 'Jane Smith'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    status: 'Pending',
    weight: '',
    dimensions: '',
    carrier: '',
    shipDate: '',
    estimatedDelivery: '',
    recipient: ''
  });

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Transit': 'bg-blue-100 text-blue-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Cancelled': 'bg-gray-100 text-gray-800'
  };

  const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'Other'];
  const statuses = ['Pending', 'In Transit', 'Delivered', 'Delayed', 'Cancelled'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    
    if (editingId) {
      setShipments(shipments.map(shipment => 
        shipment.id === editingId 
          ? { ...formData, id: editingId }
          : shipment
      ));
      setEditingId(null);
    } else {
      const newShipment = {
        ...formData,
        id: 'SH' + String(shipments.length + 1).padStart(3, '0')
      };
      setShipments([...shipments, newShipment]);
    }
    
    setFormData({
      trackingNumber: '',
      origin: '',
      destination: '',
      status: 'Pending',
      weight: '',
      dimensions: '',
      carrier: '',
      shipDate: '',
      estimatedDelivery: '',
      recipient: ''
    });
    setShowForm(false);
  };

  const handleEdit = (shipment) => {
    setFormData(shipment);
    setEditingId(shipment.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setShipments(shipments.filter(shipment => shipment.id !== id));
  };

  const handleCancel = () => {
    setFormData({
      trackingNumber: '',
      origin: '',
      destination: '',
      status: 'Pending',
      weight: '',
      dimensions: '',
      carrier: '',
      shipDate: '',
      estimatedDelivery: '',
      recipient: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div>
        <h1>Shipment Management</h1>
        <p>Track and manage your shipments</p>
      </div>

      {/* Add Shipment Button */}
      {!showForm && (
        <div>
          <button
            onClick={() => setShowForm(true)}>
            <Plus size={20} />
            Add New Shipment
          </button>
        </div>
      )}

      {/* Shipment Form */}
      {showForm && (
        <div className="container">
          <h2>
            <Package className="text-blue-600" size={24} />
            {editingId ? 'Edit Shipment' : 'Add New Shipment'}
          </h2>
          
          <div className="label">
              Tracking Number *
          </div>
          <div>
            <input
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter tracking number"
            />
          </div>

          <div className="label">
              Recipient *
          </div>
          <div>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              required
              placeholder="Recipient name"
            />
          </div>

          <div className="label">
              Origin *
          </div>
          <div>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              required
              placeholder="Origin address"
            />
          </div>

          <div className="label">
              Destination *
          </div>
          <div>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
              placeholder="Destination address"
            />
          </div>

          <div className="label">
            Carrier *
          </div>
          <div>
              <select
                name="carrier"
                value={formData.carrier}
                onChange={handleInputChange}
                required>
                  <option value="">Select carrier</option>
                  {carriers.map(carrier => (
                    <option key={carrier} value={carrier}>{carrier}</option>
                  ))}
              </select>
          </div>

          <div className="label">
            Status
          </div>
          <div>              
            <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
            </select>
          </div>

          <div className="label">
              Weight (lbs)
          </div>
          <div>     
            <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Package weight"
              />
          </div>

          <div className="label">
            Dimensions (L×W×H)
          </div>
          <div>
          <input
          type="text"
          name="dimensions"
          value={formData.dimensions}
          onChange={handleInputChange}
          placeholder="e.g., 12x8x6"
          />
          </div>

          <div className="label">
            Ship Date
          </div>
          <div>
          <input
          type="date"
          name="shipDate"
          value={formData.shipDate}
          onChange={handleInputChange}
          />
          </div>

          <div className="label">
            Estimated Delivery
          </div>
          <div>
            <input
              type="date"
              name="estimatedDelivery"
              value={formData.estimatedDelivery}
              onChange={handleInputChange}
              />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}>
              {editingId ? 'Update Shipment' : 'Add Shipment'}
            </button>
            <button
              type="button"
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
 
      )}

      {/* Shipments List */}
      <div>
        <div >
          <h2>
            <Truck className="text-blue-600" size={24} />
            Current Shipments ({shipments.length})
          </h2>
        </div>

        {shipments.length === 0 ? (
          <div>
            <Package size={48} />
            <p>No shipments found. Add your first shipment to get started.</p>
          </div>
        ) : (
          <div className="container">
            <div className="label">
              Shipment Id
            </div>
            <div>
              Tracking Number
            </div>
            <div>
              Recipient
            </div>
            <div>
              Origin
            </div>
            <div>
              Destination
            </div>
            <div>
              Status
            </div>
            <div>
              Carrier
            </div>
            <div>
              Package Info
            </div>
            <div>
              Shipped
            </div>
            <div>
              ETA
            </div>
            <div>
              Actions
            </div>

            {shipments.map((shipment) => (
              <div>
                    <div className="label">
                      {shipment.id}
                    </div>
                    <div>
                      {shipment.trackingNumber}
                    </div>
                    <div>
                      {shipment.recipient}
                    </div>
                    <div>
                      <MapPin size={16}/>
                        {shipment.origin}
                    </div>
                    <div>
                        {shipment.destination}
                    </div>
                    <div>
                      <span className={`${statusColors[shipment.status]}`}></span>{shipment.status}
                    </div>
                    <div>
                      via {shipment.carrier}
                    </div>
                    <div>
                      {shipment.weight ? `${shipment.weight} lbs` : 'N/A'}

                      {shipment.dimensions || 'N/A'}
                    </div>
                    <div>
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      Shipped: {shipment.shipDate || 'N/A'}            
                    </div>
                    <div>
                      ETA: {shipment.estimatedDelivery || 'N/A'}
                    </div>
                    <div>
                      <button
                        onClick={() => handleEdit(shipment)}
                        title="Edit shipment">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(shipment.id)}
                        title="Delete shipment">
                        <Trash2 size={16} />
                      </button>
                    </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentForm;