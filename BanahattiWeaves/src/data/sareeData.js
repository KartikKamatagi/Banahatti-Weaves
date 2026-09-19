import { productsData } from './productsData';

export const initialSarees = productsData;

export const initialOrders = [
  {
    id: 'BW-ORD-9021',
    date: '2026-09-12',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya@example.com',
    customerPhone: '+91 98765 43210',
    address: '42 Heritage Enclave, Indiranagar, Bengaluru, KA - 560038',
    items: [
      { sareeId: 'saree-banahatti-01', name: 'Banahatti Maroon & White Check Saree with Gold Zari Border', price: 4250, quantity: 1, image: '/images/sarees/saree_model_maroon_1789668365104.png' }
    ],
    totalAmount: 4250,
    status: 'Delivered'
  },
  {
    id: 'BW-ORD-9022',
    date: '2026-09-15',
    customerName: 'Priya Kulkarni',
    customerEmail: 'priya@example.com',
    customerPhone: '+91 98123 45678',
    address: '15 Silk Board Junction, Jayanagar, Bengaluru, KA - 560041',
    items: [
      { sareeId: 'saree-banahatti-02', name: 'Banahatti Deep Purple Saree with White Temple Border', price: 4650, quantity: 1, image: '/images/sarees/saree_model_purple_1789668387478.png' }
    ],
    totalAmount: 4650,
    status: 'Shipped'
  },
  {
    id: 'BW-ORD-9023',
    date: '2026-09-16',
    customerName: 'Kartik Gowda',
    customerEmail: 'kartik@example.com',
    customerPhone: '+91 97400 11223',
    address: '77 Weavers Colony, Bagalkot Road, Banahatti, KA - 587311',
    items: [
      { sareeId: 'saree-banahatti-03', name: 'Banahatti Royal Indigo Blue Check Saree', price: 4450, quantity: 1, image: '/images/sarees/saree_model_blue_1789668405492.png' }
    ],
    totalAmount: 4450,
    status: 'Pending'
  }
];
