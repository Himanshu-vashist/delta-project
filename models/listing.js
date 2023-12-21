const mongoose = require("mongoose");
const reviews = require("./review");
const { types } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
   },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  category:{
      type:String,
      enum: ["mountains", "arctic", "fire", "bed", "mountain-city", "fort-awesome", "person-swimming", "campground", "tractor", "snowflake"],
    required: true,
  }

});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing) {
  await reviews.deleteMany({_id: {$in: listing.reviews}});
} 
}
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;