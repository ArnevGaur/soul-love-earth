// Mock data — swap BASE_URL fetch calls when OpenCart API is ready

const mockCategories = [
  { category_id: '1', name: 'Earthen Cookware' },
  { category_id: '2', name: 'Copperware' },
  { category_id: '3', name: 'Home Décor' },
  { category_id: '4', name: 'Hotel Amenities' },
  { category_id: '5', name: 'Handmade Footwear' },
  { category_id: '6', name: 'Wellness' },
  { category_id: '7', name: 'Bed Linens' },
  { category_id: '8', name: 'Towels' },
  { category_id: '9', name: 'Chaffings' },
  { category_id: '10', name: 'Bathrobes' },
  { category_id: '11', name: 'Pillow Covers' },
]

// helper: generate 4 slightly varied angle views from a base Unsplash photo ID
function angles(ids) {
  return ids.map(id => `https://images.unsplash.com/${id}?w=800&q=80`)
}

const mockProducts = [
  { product_id: '1',  name: 'Clay Cooking Pot',           price: 'AED 85.00',  special: null,        category_id: '1', thumb: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', images: angles(['photo-1565193566173-7a0ee3dbe261','photo-1622599997787-efb7e6fb2ef2','photo-1590779033100-9f60a05a013d','photo-1556909114-f6e7ad7d3136']), description: 'Handcrafted from natural terracotta clay sourced from the banks of the Narmada river, this timeless cooking pot retains moisture and minerals, imparting a unique earthy flavour to every dish. Each piece is individually shaped by skilled artisans and fired in traditional kilns. Ideal for slow cooking, this pot is a conscious choice for your kitchen.', tags: ['Handcrafted', 'Eco-Friendly', 'Traditional', 'Natural Clay'], reviews: [{author:'Priya M.',rating:5,date:'March 2025',text:'Absolutely love this pot. Food tastes so much better and the quality is exceptional.'},{author:'Rami K.',rating:4,date:'February 2025',text:'Beautiful craftsmanship. Took a little seasoning but now it\'s perfect.'},{author:'Sara J.',rating:5,date:'January 2025',text:'Best purchase I\'ve made this year. Totally worth every dirham.'}] },
  { product_id: '2',  name: 'Earthen Kadai',              price: 'AED 120.00', special: 'AED 99.00', category_id: '1', thumb: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=80', images: angles(['photo-1590779033100-9f60a05a013d','photo-1565193566173-7a0ee3dbe261','photo-1622599997787-efb7e6fb2ef2','photo-1556909114-f6e7ad7d3136']), description: 'A wide, shallow kadai perfect for sautéing vegetables and preparing aromatic curries. Made from thick, food-safe clay that distributes heat evenly and retains warmth long after cooking. Crafted sustainably with zero synthetic coatings — just pure earth.', tags: ['Handcrafted', 'Eco-Friendly', 'Traditional'], reviews: [{author:'Aarav S.',rating:5,date:'March 2025',text:'Outstanding quality. My curries have never tasted better!'},{author:'Nadia P.',rating:4,date:'February 2025',text:'Great product, delivery was smooth and packaging eco-friendly.'}] },
  { product_id: '3',  name: 'Clay Tadka Pan',             price: 'AED 65.00',  special: null,        category_id: '1', thumb: 'https://images.unsplash.com/photo-1622599997787-efb7e6fb2ef2?w=800&q=80', images: angles(['photo-1622599997787-efb7e6fb2ef2','photo-1565193566173-7a0ee3dbe261','photo-1590779033100-9f60a05a013d','photo-1556909114-f6e7ad7d3136']), description: 'A beautifully small clay pan ideal for tempering spices in traditional tadka. The porous surface blooms the natural oils of mustard seeds, cumin, and curry leaves in a way no metal pan can replicate. Season it once and it becomes your most treasured kitchen companion.', tags: ['Handcrafted', 'Natural', 'Artisan'], reviews: [{author:'Meera R.',rating:5,date:'March 2025',text:'The tadka from this pan is incredible. True to its earthy character!'}] },
  { product_id: '4',  name: 'Copper Water Bottle',        price: 'AED 110.00', special: null,        category_id: '2', thumb: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80', images: angles(['photo-1610701596007-11502861dcfa','photo-1558618666-fcd25c85cd64','photo-1563453392212-326f5e854473','photo-1504198266287-1659872e6590']), description: 'Storing water in copper has been an Ayurvedic practice for thousands of years. This elegant bottle is crafted from 99.9% pure copper, hand-hammered by artisans in Rajasthan. Carry the wisdom of ancient wellness in a beautiful, reusable vessel — free from BPA and plastic.', tags: ['Ayurvedic', 'Copper', 'Wellness', 'Sustainable'], reviews: [{author:'Fatima A.',rating:5,date:'March 2025',text:'Stunning bottle. I feel so much better since I started drinking copper water.'},{author:'John B.',rating:4,date:'February 2025',text:'Beautiful craftsmanship, exactly as described.'}] },
  { product_id: '5',  name: 'Copper Tumbler Set',         price: 'AED 145.00', special: 'AED 125.00',category_id: '2', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', images: angles(['photo-1558618666-fcd25c85cd64','photo-1610701596007-11502861dcfa','photo-1563453392212-326f5e854473','photo-1504198266287-1659872e6590']), description: 'A set of two hand-beaten copper tumblers that bring an Ayurvedic ritual to your daily hydration. Known to balance the dosha and purify water, copper is as beneficial as it is beautiful. Each tumbler is individually finished with a lacquer-free natural patina.', tags: ['Copper', 'Ayurvedic', 'Set of 2', 'Artisan'], reviews: [{author:'Laila H.',rating:5,date:'March 2025',text:'Gifted these to my parents. They loved them and use them every morning.'}] },
  { product_id: '6',  name: 'Copper Jug',                 price: 'AED 180.00', special: null,        category_id: '2', thumb: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80', images: angles(['photo-1563453392212-326f5e854473','photo-1610701596007-11502861dcfa','photo-1558618666-fcd25c85cd64','photo-1504198266287-1659872e6590']), description: 'A statement centrepiece for your table or shelf. This hand-hammered copper jug stores and serves water with traditional Ayurvedic wisdom. The natural oxidation process develops a gorgeous living patina unique to each piece over time.', tags: ['Copper', 'Artisan', 'Home Décor', 'Wellness'], reviews: [{author:'Omar F.',rating:5,date:'February 2025',text:'Absolutely beautiful. A conversation starter at every gathering.'}] },
  { product_id: '7',  name: 'Handwoven Wall Hanging',     price: 'AED 220.00', special: null,        category_id: '3', thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', images: angles(['photo-1586023492125-27b2c045efd7','photo-1555041469-a586c61ea9bc','photo-1609557927087-f9cf8e88de18','photo-1616046229478-9901c5536a45']), description: 'A premium macramé wall hanging, woven by hand using sustainably sourced cotton rope. Its intricate knotwork draws from ancient textile traditions revived by our community of weavers in Jaipur. A soul-centred addition to any living space, radiating calm and intentionality.', tags: ['Handwoven', 'Macramé', 'Home Décor', 'Cotton'], reviews: [{author:'Ananya T.',rating:5,date:'March 2025',text:'My living room looks completely transformed. Looks even better in person!'}] },
  { product_id: '8',  name: 'Jute Table Runner',          price: 'AED 75.00',  special: null,        category_id: '3', thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', images: angles(['photo-1555041469-a586c61ea9bc','photo-1586023492125-27b2c045efd7','photo-1609557927087-f9cf8e88de18','photo-1616046229478-9901c5536a45']), description: 'A naturally textured jute runner that brings warmth and organic beauty to your dining table. Woven by hand in a traditional block-print pattern. Completely biodegradable and made without synthetic dyes — just earth-gifted colour.', tags: ['Jute', 'Natural', 'Handwoven', 'Biodegradable'], reviews: [{author:'Reem A.',rating:4,date:'February 2025',text:'Lovely texture and earthy colours. Great quality for the price.'}] },
  { product_id: '9',  name: 'Bamboo Fruit Basket',        price: 'AED 95.00',  special: 'AED 80.00', category_id: '3', thumb: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=800&q=80', images: angles(['photo-1609557927087-f9cf8e88de18','photo-1586023492125-27b2c045efd7','photo-1555041469-a586c61ea9bc','photo-1616046229478-9901c5536a45']), description: 'A beautifully woven bamboo basket that doubles as kitchen art. Harvested from sustainably managed bamboo groves, this basket is both functional and sculptural. Strong, lightweight, and entirely plastic-free — it belongs in every conscious home.', tags: ['Bamboo', 'Sustainable', 'Handwoven', 'Kitchen'], reviews: [{author:'Disha V.',rating:5,date:'January 2025',text:'So sturdy and gorgeous. Use it every day on my kitchen counter.'}] },
  { product_id: '10', name: 'Biodegradable Shampoo Bar',  price: 'AED 45.00',  special: null,        category_id: '4', thumb: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', images: angles(['photo-1631049307264-da0ec9d70304','photo-1556228578-8c89e6adf883','photo-1607613009820-a29f7bb81c04','photo-1556909114-f6e7ad7d3136']), description: 'A sulfate-free, biodegradable shampoo bar infused with neem, hibiscus, and coconut oil — lasting up to 80 washes. Zero plastic packaging, zero harsh chemicals, and 100% manufactured to meet hotel-grade amenity standards. Chosen by premium eco-hotels across the UAE.', tags: ['Zero Plastic', 'Biodegradable', 'Hotel Grade', 'Vegan'], reviews: [{author:'Sophia L.',rating:5,date:'March 2025',text:'My hair has never felt healthier. And zero guilt about plastic!'}] },
  { product_id: '11', name: 'Eco Toiletry Kit',           price: 'AED 160.00', special: null,        category_id: '4', thumb: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80', images: angles(['photo-1556228578-8c89e6adf883','photo-1631049307264-da0ec9d70304','photo-1607613009820-a29f7bb81c04','photo-1556909114-f6e7ad7d3136']), description: 'A curated premium toiletry kit for eco-conscious hospitality. Includes a shampoo bar, a conditioner bar, a body wash bar, and a bamboo toothbrush — all beautifully presented in a recycled cotton travel pouch. The ideal sustainable hotel amenity set.', tags: ['Hotel Kit', 'Eco-Friendly', 'Travel', 'Zero-Waste'], reviews: [{author:'Hassan M.',rating:5,date:'February 2025',text:'We ordered 200 kits for our hotel and the guests loved them. Repeat order incoming.'}] },
  { product_id: '12', name: 'Bamboo Toothbrush Set',      price: 'AED 55.00',  special: 'AED 45.00', category_id: '4', thumb: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80', images: angles(['photo-1607613009820-a29f7bb81c04','photo-1631049307264-da0ec9d70304','photo-1556228578-8c89e6adf883','photo-1556909114-f6e7ad7d3136']), description: 'A set of four FSC-certified bamboo toothbrushes with BPA-free charcoal-infused bristles. The handles compost in under 6 months. Approved for use in eco-certified hotels across the GCC region.', tags: ['Bamboo', 'Charcoal Bristles', 'Compostable', 'Set of 4'], reviews: [{author:'Aisha R.',rating:5,date:'January 2025',text:'Great family pack! Kids love the bamboo look and feel.'}] },
  { product_id: '13', name: 'Leather Kolhapuri Sandals',  price: 'AED 195.00', special: null,        category_id: '5', thumb: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80', images: angles(['photo-1603487742131-4160ec999306','photo-1542291026-7eec264c27ff','photo-1515347619252-60a4bf4fff4f','photo-1560343090-f0409e92791a']), description: 'The iconic Kolhapuri chappals of Maharashtra, handcrafted from vegetable-tanned full-grain leather by GI-certified artisans. No synthetic dyes, no chrome tanning — just heritage craftsmanship that improves with every wear and walk.', tags: ['GI Certified', 'Leather', 'Handcrafted', 'Heritage'], reviews: [{author:'Vikram N.',rating:5,date:'March 2025',text:'Incredibly comfortable and so unique. People always ask where I got them from.'},{author:'Leila K.',rating:5,date:'February 2025',text:'Perfect quality. These will last years.'}] },
  { product_id: '14', name: 'Handstitched Jutis',         price: 'AED 165.00', special: null,        category_id: '5', thumb: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', images: angles(['photo-1542291026-7eec264c27ff','photo-1603487742131-4160ec999306','photo-1515347619252-60a4bf4fff4f','photo-1560343090-f0409e92791a']), description: 'Traditional Punjabi jutis hand-embroidered with silk thread and petit-point needlework. The uppers are crafted from soft leather and adorned with intricate floral motifs. Each pair takes up to three days to complete and is a wearable work of art.', tags: ['Embroidered', 'Silk Thread', 'Handcrafted', 'Heritage'], reviews: [{author:'Pooja S.',rating:5,date:'March 2025',text:'Wore these to a wedding and received so many compliments. Absolutely magnificent.'}] },
  { product_id: '15', name: 'Woven Flat Sandals',         price: 'AED 145.00', special: 'AED 120.00',category_id: '5', thumb: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80', images: angles(['photo-1515347619252-60a4bf4fff4f','photo-1542291026-7eec264c27ff','photo-1603487742131-4160ec999306','photo-1560343090-f0409e92791a']), description: 'Lightweight flat sandals with hand-woven jute straps and a natural cork sole. Breathable, comfortable, and completely biodegradable — the most conscious step you can take this season.', tags: ['Jute Straps', 'Cork Sole', 'Vegan', 'Biodegradable'], reviews: [{author:'Amira T.',rating:4,date:'February 2025',text:'Light and comfortable. Perfect for Dubai summers!'}] },
  { product_id: '16', name: 'Rose Water Toner',           price: 'AED 85.00',  special: null,        category_id: '6', thumb: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80', images: angles(['photo-1600857544200-b2f666a9a2ec','photo-1570194065650-d99fb4bedf0a','photo-1608571423902-eed4a5ad8108','photo-1556909114-f6e7ad7d3136']), description: 'A pure, steam-distilled rose water toner sourced from the Kannauj rose farms of Uttar Pradesh — the fragrance capital of India. Alcohol-free, preservative-free, and bottled in 100% recycled glass. Restores skin\'s pH and imparts a natural glow.', tags: ['Rose Water', 'Alcohol-Free', 'Natural', 'Recycled Glass'], reviews: [{author:'Yasmine B.',rating:5,date:'March 2025',text:'My skin glows instantly after use. The scent is absolutely divine.'},{author:'Chloe D.',rating:5,date:'February 2025',text:'Replaced my chemical toner with this and never looking back.'}] },
  { product_id: '17', name: 'Neem & Tulsi Face Pack',    price: 'AED 70.00',  special: null,        category_id: '6', thumb: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80', images: angles(['photo-1570194065650-d99fb4bedf0a','photo-1600857544200-b2f666a9a2ec','photo-1608571423902-eed4a5ad8108','photo-1556909114-f6e7ad7d3136']), description: 'A potent Ayurvedic face pack blending neem, tulsi (holy basil), and multani mitti. Unblocks pores, controls excess sebum, and reduces blemishes with the power of Ayurveda — no parabens, no sulfates, no synthetic fragrances.', tags: ['Ayurvedic', 'Neem', 'Tulsi', 'Paraben-Free'], reviews: [{author:'Nour A.',rating:4,date:'January 2025',text:'Really helped clear my acne. Gentle and effective.'}] },
  { product_id: '18', name: 'Argan Oil Serum',            price: 'AED 130.00', special: 'AED 110.00',category_id: '6', thumb: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', images: angles(['photo-1608571423902-eed4a5ad8108','photo-1600857544200-b2f666a9a2ec','photo-1570194065650-d99fb4bedf0a','photo-1556909114-f6e7ad7d3136']), description: 'A light, fast-absorbing serum of cold-pressed Moroccan argan oil blended with sea buckthorn and vitamin E. Deeply nourishes, repairs, and illuminates without leaving a greasy finish. Ethically sourced and fairly traded from a women\'s co-operative in Morocco.', tags: ['Argan Oil', 'Vitamin E', 'Fair Trade', 'Womens Co-op'], reviews: [{author:'Mariam S.',rating:5,date:'March 2025',text:'Hydrates deeply without any greasiness. Skin feels like velvet.'},{author:'Ines P.',rating:5,date:'February 2025',text:'Worth every cent. This is now a staple in my skincare.'}] },
  { product_id: '19', name: 'Premium Cotton Bed Sheet',   price: 'AED 250.00', special: null,        category_id: '7', thumb: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', images: angles(['photo-1522771739844-6a9f6d5f14af','photo-1629949009765-40f443586411']), description: '300 thread count organic cotton bed sheet set. Crisp, cool, and sustainable.', tags: ['Organic', 'Cotton', 'Hospitality'], reviews: [] },
  { product_id: '20', name: 'Luxury Hotel Towel Set',     price: 'AED 120.00', special: null,        category_id: '8', thumb: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&q=80', images: angles(['photo-1583947581924-860bda6a26df','photo-1616627561950-9f746bcdce1a']), description: 'Thick, absorbent, and beautifully soft. Made from 100% Turkish cotton.', tags: ['Cotton', 'Premium', 'Hotel Grade'], reviews: [] },
  { product_id: '21', name: 'Stainless Steel Chaffing Dish', price: 'AED 450.00', special: 'AED 380.00', category_id: '9', thumb: 'https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?w=800&q=80', images: angles(['photo-1588675646184-f5b0b0b0b2de']), description: 'Elegant stainless steel chaffing dish for professional catering and hospitality events. Keeps food at perfect temperature.', tags: ['Stainless Steel', 'Catering', 'Professional'], reviews: [] },
  { product_id: '22', name: 'Waffle Weave Bathrobe',      price: 'AED 185.00', special: null,        category_id: '10', thumb: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80', images: angles(['photo-1600334129128-685c5582fd35']), description: 'Lightweight waffle weave bathrobe, used in premium spas and boutique hotels. Quick-drying and stylish.', tags: ['Spaware', 'Cotton', 'Luxury'], reviews: [] },
  { product_id: '23', name: 'Silk Pillow Cover Set',      price: 'AED 95.00',  special: null,        category_id: '11', thumb: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&q=80', images: angles(['photo-1584100936595-c0654b55a2e6']), description: 'Hypoallergenic silk pillow covers for a restful, skin-friendly sleep. Includes 2 covers.', tags: ['Silk', 'Wellness', 'Restful'], reviews: [] },
]

const mockOrders = [
  {
    id: 'ORD-7241',
    date: 'March 15, 2025',
    status: 'delivered',
    total: 'AED 435.00',
    items: [
      { name: 'Clay Cooking Pot', quantity: 1, price: 'AED 85.00' },
      { name: 'Copper Water Bottle', quantity: 2, price: 'AED 110.00' },
      { name: 'Eco Toiletry Kit', quantity: 1, price: 'AED 130.00' },
    ]
  },
  {
    id: 'ORD-8912',
    date: 'March 22, 2025',
    status: 'shipped',
    total: 'AED 195.00',
    items: [
      { name: 'Leather Kolhapuri Sandals', quantity: 1, price: 'AED 195.00' },
    ]
  },
  {
    id: 'ORD-9055',
    date: 'March 24, 2025',
    status: 'processing',
    total: 'AED 250.00',
    items: [
      { name: 'Premium Cotton Bed Sheet', quantity: 1, price: 'AED 250.00' },
    ]
  }
]

export async function fetchProducts({
  categoryId = '',
  search     = '',
  sort       = 'p.date_added',
  order      = 'DESC',
  page       = 1,
  limit      = 24,
} = {}) {
  await new Promise(r => setTimeout(r, 600))
  let results = [...mockProducts]
  if (categoryId) results = results.filter(p => p.category_id === categoryId)
  if (search)     results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
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

export async function fetchProduct(id) {
  await new Promise(r => setTimeout(r, 400))
  const product = mockProducts.find(p => p.product_id === String(id))
  if (!product) return null
  const category = mockCategories.find(c => c.category_id === product.category_id)
  const related = mockProducts.filter(p => p.category_id === product.category_id && p.product_id !== product.product_id).slice(0, 4)
  return { ...product, category, related }
}

export async function fetchCategories() {
  await new Promise(r => setTimeout(r, 300))
  return mockCategories
}

export async function fetchOrders() {
  await new Promise(r => setTimeout(r, 500))
  return mockOrders
}