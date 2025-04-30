import {model, models, Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  isPaid: { type: Boolean, default: false },
  paymentId: String,
  orderId: String,
});


export const User = models?.User || model('User', UserSchema);