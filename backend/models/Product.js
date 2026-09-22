const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    gender: {
      type: String,
      enum: ['women', 'men', 'unisex'],
      default: 'unisex',
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      default: 0,
      min: [0, 'Compare price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    images: {
      type: [String],
      default: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      ],
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      min: [0, 'Stock cannot be negative'],
      default: 10,
    },
    color: {
      type: String,
      trim: true,
      default: 'Cognac',
    },
    material: {
      type: String,
      trim: true,
      default: 'Full-Grain Vegetable-Tanned Leather',
    },
    weight: {
      type: String,
      trim: true,
      default: '',
    },
    dimensions: {
      type: String,
      trim: true,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    bestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },
    newArrival: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug, SKU, and discount
productSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    const clean = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    this.slug = `${clean}-${Date.now().toString().slice(-4)}`;
  }

  if (!this.sku) {
    const prefix = this.category ? this.category.slice(0, 3).toUpperCase() : 'KSH';
    const rand = Math.floor(1000 + Math.random() * 9000);
    this.sku = `KSH-${prefix}-${rand}`;
  }

  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    this.discount = Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  } else {
    this.discount = 0;
  }

  next();
});

// Search indexing
productSchema.index({
  name: 'text',
  description: 'text',
  sku: 'text',
  color: 'text',
  material: 'text',
  tags: 'text',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
