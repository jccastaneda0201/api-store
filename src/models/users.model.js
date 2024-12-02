const { Schema, model } = require("mongoose");

// Product schema
const userSchema = new Schema(
  {
    username: String,
    email: {
      //esto lo hace mongoose
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["admin", "regular"],
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      }, //Si quiero guardar muchos productos le marco un array [{}]
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
