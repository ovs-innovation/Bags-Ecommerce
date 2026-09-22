const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Comprehensive luxury leather products across all categories and types for demo seeding
const DEFAULT_PRODUCTS = [
  {
    name: 'Aria Structured Tote',
    category: 'tote',
    gender: 'unisex',
    price: 8499,
    compareAtPrice: 11999,
    stock: 14,
    sku: 'KSH-TOT-1001',
    color: 'Cognac',
    material: 'Full-Grain Vegetable-Tanned Leather',
    dimensions: '38 × 28 × 14 cm',
    weight: '820g',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain vegetable-tanned leather, antique brass hardware',
    description: 'The Aria Tote is the pinnacle of everyday luxury. Crafted from a single hide of full-grain vegetable-tanned cognac leather, the structured silhouette keeps its shape through decades of use. Antique brass rivets and a D-ring strap holder complete the heirloom aesthetic.',
    features: ['Hand-stitched saddle seams', 'Solid brass hardware', 'Internal card pockets × 4', 'Padded laptop sleeve 14"'],
    featured: true,
    bestSeller: true,
    newArrival: false,
  },
  {
    name: 'Diana Bucket Bag',
    category: 'tote',
    gender: 'women',
    price: 7299,
    compareAtPrice: 9499,
    stock: 8,
    sku: 'KSH-TOT-1002',
    color: 'Chestnut',
    material: 'Pull-Up Oil-Tanned Leather',
    dimensions: '28 × 32 × 16 cm',
    weight: '590g',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Supple pull-up leather, drawstring closure',
    description: 'The Diana Bucket is sculptural leather at its finest. Pull-up oil-tanned leather darkens with use at contact points, creating an entirely unique bag with every owner. Brass eyelets and a braided cord cinch the opening in style.',
    features: ['Drawstring closure with brass ring', 'Interior zip pocket', 'Dual shoulder straps', 'Base studs for protection'],
    featured: true,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Luna Crossbody Purse',
    category: 'crossbody',
    gender: 'women',
    price: 5299,
    compareAtPrice: 6999,
    stock: 12,
    sku: 'KSH-CRS-1003',
    color: 'Tan',
    material: 'Pebbled Grain Leather',
    dimensions: '24 × 17 × 8 cm',
    weight: '430g',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Pebbled grain leather, adjustable woven strap',
    description: 'Designed for the modern woman who moves through the city with intent, the Luna Crossbody pairs a compact silhouette with generous organization. Italian-tanned pebbled leather develops a rich patina with everyday carry.',
    features: ['Adjustable 120cm strap', 'Front zip pocket', 'Microfibre lining', 'RFID-blocked card slot'],
    featured: true,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Maya Flap Saddle Bag',
    category: 'crossbody',
    gender: 'women',
    price: 6199,
    compareAtPrice: 7999,
    stock: 9,
    sku: 'KSH-CRS-1004',
    color: 'Olive Green',
    material: 'Full-Grain Saddle Leather',
    dimensions: '22 × 18 × 9 cm',
    weight: '510g',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain saddle leather, magnetic flap closure',
    description: 'Clean lines meet uncompromised function. The Maya Flap Saddle Bag features a sculpted asymmetrical flap secured by a concealed magnetic clasp. The interior is divided into two gusseted sections with a central zip divider.',
    features: ['Concealed magnet flap', 'Dual gusseted chambers', 'Detachable shoulder strap', 'Rear slip pocket for phone'],
    featured: false,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Sophia Evening Clutch',
    category: 'clutch',
    gender: 'women',
    price: 3999,
    compareAtPrice: 4999,
    stock: 15,
    sku: 'KSH-CLU-1005',
    color: 'Espresso',
    material: 'Smooth Nappa Leather',
    dimensions: '28 × 14 × 4 cm',
    weight: '280g',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Smooth nappa leather, gold clasp hardware',
    description: 'A timeless accessory for evenings that demand elegance. The Sophia Evening Clutch is fashioned from buttery-smooth nappa leather and sealed with a polished 24K gold-tone turn-lock clasp.',
    features: ['Gold-tone turn-lock clasp', 'Satin interior', 'Detachable chain strap', 'Card and coin compartment'],
    featured: false,
    bestSeller: true,
    newArrival: false,
  },
  {
    name: 'Atlas Executive Briefcase',
    category: 'briefcase',
    gender: 'men',
    price: 12999,
    compareAtPrice: 16999,
    stock: 6,
    sku: 'KSH-BRF-1006',
    color: 'Dark Mahogany',
    material: 'Harness Leather (4mm thickness)',
    dimensions: '42 × 31 × 11 cm',
    weight: '1.4kg',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain harness leather, double buckle straps',
    description: 'The Atlas Briefcase commands the boardroom. Cut from heavyweight full-grain harness leather that was originally developed for equestrian saddles, it develops a distinguished character with every commute.',
    features: ['Padded 15" laptop sleeve', 'Dual buckle-and-strap closure', 'Antique brass hardware', 'Luggage trolley pass-through'],
    featured: true,
    bestSeller: true,
    newArrival: false,
  },
  {
    name: 'Stratus Zip Document Folio',
    category: 'briefcase',
    gender: 'unisex',
    price: 6499,
    compareAtPrice: 8499,
    stock: 10,
    sku: 'KSH-BRF-1007',
    color: 'British Tan',
    material: 'Vegetable-Tanned Italian Leather',
    dimensions: '35 × 25 × 3 cm',
    weight: '620g',
    images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain veg-tan leather, fits 13" laptop and A4 notepad',
    description: 'Streamline your professional meetings. The Stratus Folio unzips on three sides to lay completely flat, revealing pen loops, card slots, a legal pad sleeve, and a padded slot for tablets or slim 13" laptops.',
    features: ['Lays flat when unzipped', 'Fits 13" MacBook / iPad Pro', 'A4 legal pad pocket', '3 pen loops & 4 business card slots'],
    featured: false,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Orion Bifold Wallet',
    category: 'wallet',
    gender: 'men',
    price: 1899,
    compareAtPrice: 2499,
    stock: 28,
    sku: 'KSH-WAL-1008',
    color: 'Tan',
    material: 'Vegetable-Tanned Cowhide',
    dimensions: '11 × 9 × 1.2 cm',
    weight: '85g',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain veg-tan leather, 8 card slots, RFID shielded',
    description: 'The classic men’s wallet, perfected through twenty hours of bench craftsmanship. Hand-burnished edges, natural beeswax finish, and an ultra-slim profile make the Orion Bifold the ultimate everyday companion.',
    features: ['8 card slots', 'Full-length currency pocket', 'RFID signal shielding', 'Hand-burnished beeswax edges'],
    featured: false,
    bestSeller: true,
    newArrival: false,
  },
  {
    name: 'Amara Zip-Around Continental',
    category: 'wallet',
    gender: 'women',
    price: 2799,
    compareAtPrice: 3499,
    stock: 20,
    sku: 'KSH-WAL-1009',
    color: 'Blush Rose',
    material: 'Pebbled Grain Leather',
    dimensions: '20 × 10 × 2.5 cm',
    weight: '210g',
    images: ['https://images.unsplash.com/photo-1606503825008-909a67e65a50?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Pebbled leather, accordion card organizer, wrist strap',
    description: 'All your essentials, elegantly secured. The Amara Continental opens flat with an accordion interior boasting 12 card slots, two full-length currency sleeves, and a centered zippered change pocket.',
    features: ['12 card slots', '2 currency sleeves', 'Zip coin pocket', 'Detachable leather wristlet strap'],
    featured: false,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Kavach Minimalist Cardholder',
    category: 'wallet',
    gender: 'unisex',
    price: 999,
    compareAtPrice: 1499,
    stock: 40,
    sku: 'KSH-CRD-1010',
    color: 'Onyx Black',
    material: 'Vegetable-Tanned Italian Leather',
    dimensions: '10 × 7 × 0.4 cm',
    weight: '35g',
    images: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Ultra-thin veg-tan leather, 4 card slots, cash sleeve',
    description: 'For the minimalist who travels light. Four exterior card slots flank a central pull-tab compartment for folded banknotes. Just 4mm thin, it slips invisibly into front jacket and trouser pockets.',
    features: ['4 quick-access slots', 'Central folded-cash sleeve', 'Debossed logo stamp', 'Edge-coat finish'],
    featured: false,
    bestSeller: true,
    newArrival: false,
  },
  {
    name: 'Hermes Crossbody Chest Sling',
    category: 'sling',
    gender: 'men',
    price: 5499,
    compareAtPrice: 6999,
    stock: 11,
    sku: 'KSH-SLG-1011',
    color: 'Vintage Cognac',
    material: 'Full-Grain Pebbled Leather',
    dimensions: '30 × 17 × 7 cm',
    weight: '490g',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain pebbled leather, reversible ambidextrous strap',
    description: 'The modern commuter’s dream. The Hermes Chest Sling rides snug against the chest or back, keeping transit passes, passport, and daily essentials within immediate, secure reach.',
    features: ['Reversible left/right D-ring attachments', 'Hidden anti-theft back pocket', 'Cable pass-through', 'YKK metal zippers'],
    featured: false,
    bestSeller: false,
    newArrival: true,
  },
  {
    name: 'Seraphina Camera Sling',
    category: 'sling',
    gender: 'women',
    price: 4499,
    compareAtPrice: 5999,
    stock: 14,
    sku: 'KSH-SLG-1012',
    color: 'Caramel',
    material: 'Full-Grain Cowhide',
    dimensions: '19 × 13 × 6 cm',
    weight: '320g',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Full-grain cowhide, compact camera silhouette',
    description: 'The Seraphina Mini Sling is effortless simplicity incarnate. Perfectly sized for your phone, keys, lip gloss, and cardholder, it rests comfortably cross-body for hands-free freedom all day long.',
    features: ['Adjustable cross-body strap', 'Two-way brass zip', 'Interior slip pocket', 'Exterior easy-access pocket'],
    featured: false,
    bestSeller: false,
    newArrival: true,
  },
];

/**
 * @desc    READ all products with search & filters
 * @route   GET /api/products
 * @access  Public / Admin
 */
const getProducts = async (req, res, next) => {
  try {
    const { search, category, stockStatus, sort = 'newest' } = req.query;
    const query = {};

    // Search filter
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { sku: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { color: { $regex: q, $options: 'i' } },
        { material: { $regex: q, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // Stock status filter
    if (stockStatus === 'in_stock') {
      query.stock = { $gt: 5 };
    } else if (stockStatus === 'low_stock') {
      query.stock = { $gt: 0, $lte: 5 };
    } else if (stockStatus === 'out_of_stock') {
      query.stock = { $lte: 0 };
    }

    // Sort order
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'stock-asc') sortOption = { stock: 1 };
    if (sort === 'name-asc') sortOption = { name: 1 };

    const products = await Product.find(query).sort(sortOption).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    READ single product by ID or slug
 * @route   GET /api/products/:identifier
 * @access  Public / Admin
 */
const getProductById = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }
    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    CREATE a new product
 * @route   POST /api/products
 * @access  Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      compareAtPrice,
      stock,
      sku,
      color,
      material,
      dimensions,
      weight,
      description,
      shortDescription,
      images,
      featured,
      bestSeller,
      newArrival,
      gender,
    } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least a product name, category, and price.',
      });
    }

    let productImages = Array.isArray(images) && images.length > 0
      ? images.filter(img => typeof img === 'string' && img.trim().length > 0)
      : [];

    if (productImages.length === 0) {
      productImages = [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      ];
    }

    const product = new Product({
      name: name.trim(),
      category: category.toLowerCase().trim(),
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : 0,
      stock: stock !== undefined ? Number(stock) : 10,
      sku: sku ? sku.toUpperCase().trim() : undefined,
      color: color ? color.trim() : 'Cognac',
      material: material ? material.trim() : 'Full-Grain Vegetable-Tanned Leather',
      dimensions: dimensions || '',
      weight: weight || '',
      description: description || `${name} - Handcrafted luxury genuine leather bag.`,
      shortDescription: shortDescription || description?.slice(0, 120) || '',
      images: productImages,
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller),
      newArrival: newArrival !== undefined ? Boolean(newArrival) : true,
      gender: gender || 'unisex',
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: `Product "${product.name}" created successfully`,
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A product with this SKU or Name already exists.',
      });
    }
    next(error);
  }
};

/**
 * @desc    UPDATE an existing product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const updates = req.body;
    const allowed = [
      'name',
      'category',
      'price',
      'compareAtPrice',
      'stock',
      'sku',
      'color',
      'material',
      'dimensions',
      'weight',
      'description',
      'shortDescription',
      'images',
      'featured',
      'bestSeller',
      'newArrival',
      'gender',
      'isActive',
    ];

    allowed.forEach((field) => {
      if (updates[field] !== undefined) {
        if (field === 'price' || field === 'compareAtPrice' || field === 'stock') {
          product[field] = Number(updates[field]);
        } else if (field === 'category') {
          product[field] = updates[field].toLowerCase().trim();
        } else if (field === 'sku') {
          product[field] = updates[field].toUpperCase().trim();
        } else if (field === 'images' && Array.isArray(updates[field])) {
          const validImgs = updates[field].filter(img => typeof img === 'string' && img.trim().length > 0);
          if (validImgs.length > 0) product.images = validImgs;
        } else {
          product[field] = updates[field];
        }
      }
    });

    if (product.compareAtPrice && product.compareAtPrice > product.price) {
      product.discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    } else {
      product.discount = 0;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: `Product "${product.name}" updated successfully`,
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Another product with this SKU or slug already exists',
      });
    }
    next(error);
  }
};

/**
 * @desc    DELETE a product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Product "${product.name}" removed from inventory`,
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    1-Click Seed default luxury products into MongoDB
 * @route   POST /api/products/seed
 * @access  Admin
 */
const seedProducts = async (req, res, next) => {
  try {
    // Only seed if empty or overwrite explicitly requested
    const count = await Product.countDocuments();
    if (count > 0 && !req.query.force) {
      return res.status(200).json({
        success: true,
        message: `Database already contains ${count} products. Use ?force=true to reset.`,
        count,
      });
    }

    if (req.query.force) {
      await Product.deleteMany({});
    }

    const productsToInsert = DEFAULT_PRODUCTS.map((p, idx) => {
      const clean = (p.name || 'product')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const discount =
        p.compareAtPrice && p.compareAtPrice > p.price
          ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
          : 0;

      return {
        ...p,
        slug: p.slug || `${clean}-${idx + 101}`,
        discount,
        isActive: true,
      };
    });

    const seeded = await Product.insertMany(productsToInsert);

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${seeded.length} luxury products into MongoDB`,
      count: seeded.length,
      products: seeded,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};
