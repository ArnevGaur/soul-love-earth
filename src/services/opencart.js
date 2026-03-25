// Mock data — swap BASE_URL fetch calls when OpenCart API is ready

const mockCategories = [
  { category_id: '1', name: 'Earthen Cookware' },
  { category_id: '2', name: 'Copperware' },
  { category_id: '3', name: 'Home Décor' },
  { category_id: '4', name: 'Hotel Amenities' },
  { category_id: '5', name: 'Handmade Footwear' },
  { category_id: '6', name: 'Wellness' },
]

const mockProducts = [
  { product_id: '1', name: 'Clay Cooking Pot', price: 'AED 85.00', special: null, category_id: '1', thumb: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80' },
  { product_id: '2', name: 'Earthen Kadai', price: 'AED 120.00', special: 'AED 99.00', category_id: '1', thumb: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&q=80' },
  { product_id: '3', name: 'Clay Tadka Pan', price: 'AED 65.00', special: null, category_id: '1', thumb: 'https://images.unsplash.com/photo-1622599997787-efb7e6fb2ef2?w=600&q=80' },
  { product_id: '4', name: 'Copper Water Bottle', price: 'AED 110.00', special: null, category_id: '2', thumb: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80' },
  { product_id: '5', name: 'Copper Tumbler Set', price: 'AED 145.00', special: 'AED 125.00', category_id: '2', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { product_id: '6', name: 'Copper Jug', price: 'AED 180.00', special: null, category_id: '2', thumb: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80' },
  { product_id: '7', name: 'Handwoven Wall Hanging', price: 'AED 220.00', special: null, category_id: '3', thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { product_id: '8', name: 'Jute Table Runner', price: 'AED 75.00', special: null, category_id: '3', thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { product_id: '9', name: 'Bamboo Fruit Basket', price: 'AED 95.00', special: 'AED 80.00', category_id: '3', thumb: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=600&q=80' },
  { product_id: '10', name: 'Biodegradable Shampoo Bar', price: 'AED 45.00', special: null, category_id: '4', thumb: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
  { product_id: '11', name: 'Eco Toiletry Kit', price: 'AED 160.00', special: null, category_id: '4', thumb: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80' },
  { product_id: '12', name: 'Bamboo Toothbrush Set', price: 'AED 55.00', special: 'AED 45.00', category_id: '4', thumb: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80' },
  { product_id: '13', name: 'Leather Kolhapuri Sandals', price: 'AED 195.00', special: null, category_id: '5', thumb: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80' },
  { product_id: '14', name: 'Handstitched Jutis', price: 'AED 165.00', special: null, category_id: '5', thumb: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { product_id: '15', name: 'Woven Flat Sandals', price: 'AED 145.00', special: 'AED 120.00', category_id: '5', thumb: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80' },
  { product_id: '16', name: 'Rose Water Toner', price: 'AED 85.00', special: null, category_id: '6', thumb: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&q=80' },
  { product_id: '17', name: 'Neem & Tulsi Face Pack', price: 'AED 70.00', special: null, category_id: '6', thumb: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80' },
  { product_id: '18', name: 'Argan Oil Serum', price: 'AED 130.00', special: 'AED 110.00', category_id: '6', thumb: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80' },
]

export async function fetchProducts({
  categoryId = '',
  search     = '',
  sort       = 'p.date_added',
  order      = 'DESC',
  page       = 1,
  limit      = 24,
} = {}) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 600))

  let results = [...mockProducts]

  if (categoryId) results = results.filter(p => p.category_id === categoryId)
  if (search)     results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  // Sort
  if (sort === 'p.price') {
    results.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
      return order === 'ASC' ? priceA - priceB : priceB - priceA
    })
  } else if (sort === 'pd.name') {
    results.sort((a, b) => order === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }

  return results
}

export async function fetchCategories() {
  await new Promise(r => setTimeout(r, 300))
  return mockCategories
}