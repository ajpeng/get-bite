import mongoose from "mongoose";
const { Schema } = mongoose;

const modSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    trim: true
  },
  modGroupIds: {
    type: [String],
  },
  price: {
    type: Number,
  }
});

const modGroupSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  modIds: {
    type: [String],
  },
  minMods: {
    type: Number,
    required: false
  },
  maxMods: {
    type: Number,
    required: false
  },
});

const itemSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  price: {
    type: String,
  },
  modGroupIds: {
    type: [String],
  },
  magicCopyKey: {
    type: String,
  },
  imageUrl: {
    type: String,
  }
});

const sectionSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  itemIds: {
    type: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
  },
  magicCopyKey: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
  }
}, {
  timestamps: true
});

const discountSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
    required: false,
  },
  rate: {
    type: Number,
    required: false,
  },
  couponCode: {
    type: String,
    required: false,
  },
});

const orderTypeSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
  },
});

const menuResponseSchema = new Schema({
  sections: [sectionSchema],
  items: [itemSchema],
  modGroups: [modGroupSchema],
  mods: [modSchema],
  discounts: [discountSchema],
  orderTypes: [orderTypeSchema]
}, {
  timestamps: true
});

const MenuResponseModel = mongoose.model('MenuResponse', menuResponseSchema);
const SectionModel = mongoose.model('Section', sectionSchema);
const ItemModel = mongoose.model('Item', itemSchema);
const ModGroupModel = mongoose.model('ModGroup', modGroupSchema);
const ModModel = mongoose.model('Mod', modSchema);
const DiscountModel = mongoose.model('Discount', discountSchema);
const OrderTypeModel = mongoose.model('OrderType', orderTypeSchema);

export {
  MenuResponseModel,
  SectionModel,
  ItemModel,
  ModGroupModel,
  ModModel,
  DiscountModel,
  OrderTypeModel
};