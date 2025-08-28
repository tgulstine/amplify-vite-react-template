import { useState } from 'react';
import { Package, Truck, MapPin, Calendar, Plus, Edit2, Trash2 } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipment Management</h1>
        <p className="text-gray-600">Track and manage your shipments</p>
      </div>

      {/* Add Shipment Button */}
      {!showForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Shipment
          </button>
        </div>
      )}

      {/* Shipment Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="text-blue-600" size={24} />
            {editingId ? 'Edit Shipment' : 'Add New Shipment'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number *
              </label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tracking number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient *
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Recipient name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin *
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Origin address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Destination address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carrier *
              </label>
              <select
                name="carrier"
                value={formData.carrier}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select carrier</option>
                {carriers.map(carrier => (
                  <option key={carrier} value={carrier}>{carrier}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Package weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions (L×W×H)
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 12x8x6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ship Date
              </label>
              <input
                type="date"
                name="shipDate"
                value={formData.shipDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery
              </label>
              <input
                type="date"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                {editingId ? 'Update Shipment' : 'Add Shipment'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipments List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Truck className="text-blue-600" size={24} />
            Current Shipments ({shipments.length})
          </h2>
        </div>

        {shipments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No shipments found. Add your first shipment to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipment Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {shipment.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {shipment.trackingNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {shipment.recipient}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <div>
                          <div>{shipment.origin}</div>
                          <div className="text-gray-500">to {shipment.destination}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[shipment.status]}`}>
                        {shipment.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        via {shipment.carrier}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{shipment.weight ? `${shipment.weight} lbs` : 'N/A'}</div>
                      <div className="text-gray-500">{shipment.dimensions || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <div>
                          <div>Shipped: {shipment.shipDate || 'N/A'}</div>
                          <div className="text-gray-500">ETA: {shipment.estimatedDelivery || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(shipment)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Edit shipment"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(shipment.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete shipment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentForm;