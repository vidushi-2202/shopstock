import { v4 as uuidv4 } from 'uuid'

export const CATEGORIES = [
  'Groceries',
  'Stationery',
  'Medicine',
  'Cleaning',
  'Electronics',
  'Clothing',
]

export const seedProducts = [
  { id: uuidv4(), name: 'Basmati Rice 5kg', category: 'Groceries',    price: 320,  qty: 42, sku: 'GRC-001' },
  { id: uuidv4(), name: 'Toor Dal 1kg',     category: 'Groceries',    price: 110,  qty: 28, sku: 'GRC-002' },
  { id: uuidv4(), name: 'Sunflower Oil 1L', category: 'Groceries',    price: 135,  qty: 6,  sku: 'GRC-003' },
  { id: uuidv4(), name: 'Whole Wheat Atta', category: 'Groceries',    price: 55,   qty: 0,  sku: 'GRC-004' },
  { id: uuidv4(), name: 'Amul Butter 100g', category: 'Groceries',    price: 58,   qty: 18, sku: 'GRC-005' },
  { id: uuidv4(), name: 'Paracetamol 500mg',category: 'Medicine',     price: 22,   qty: 8,  sku: 'MED-001' },
  { id: uuidv4(), name: 'ORS Sachets x10',  category: 'Medicine',     price: 45,   qty: 3,  sku: 'MED-002' },
  { id: uuidv4(), name: 'Bandage Roll',     category: 'Medicine',     price: 30,   qty: 14, sku: 'MED-003' },
  { id: uuidv4(), name: 'Cough Syrup 100ml',category: 'Medicine',     price: 68,   qty: 0,  sku: 'MED-004' },
  { id: uuidv4(), name: 'Blue Ball Pen x10',category: 'Stationery',   price: 40,   qty: 35, sku: 'STN-001' },
  { id: uuidv4(), name: 'A4 Paper 500 sheets',category:'Stationery',  price: 260,  qty: 7,  sku: 'STN-002' },
  { id: uuidv4(), name: 'Stapler',          category: 'Stationery',   price: 95,   qty: 5,  sku: 'STN-003' },
  { id: uuidv4(), name: 'Notebook 200pg',   category: 'Stationery',   price: 60,   qty: 22, sku: 'STN-004' },
  { id: uuidv4(), name: 'Scotch Tape',      category: 'Stationery',   price: 25,   qty: 0,  sku: 'STN-005' },
  { id: uuidv4(), name: 'Surf Excel 1kg',   category: 'Cleaning',     price: 115,  qty: 9,  sku: 'CLN-001' },
  { id: uuidv4(), name: 'Colin Glass Cleaner',category:'Cleaning',    price: 85,   qty: 4,  sku: 'CLN-002' },
  { id: uuidv4(), name: 'Broom (Jhadoo)',   category: 'Cleaning',     price: 75,   qty: 11, sku: 'CLN-003' },
  { id: uuidv4(), name: 'USB-C Cable 1m',   category: 'Electronics',  price: 180,  qty: 13, sku: 'ELC-001' },
  { id: uuidv4(), name: 'AA Batteries x4',  category: 'Electronics',  price: 65,   qty: 2,  sku: 'ELC-002' },
  { id: uuidv4(), name: 'Cotton Socks pair',category: 'Clothing',     price: 55,   qty: 30, sku: 'CLT-001' },
]
