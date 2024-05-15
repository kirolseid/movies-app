const { Schema, model } = require("mongoose");
const schema = Schema(
  {
    Pos: {
      type: Number,
    },

    2023: {
      type: Number,
    },

    2022: {
      type: Number,
    },  

    Title: {
      type: String,
      required: [true, "Title required"],
      trim: true,
      unique: [true, "Title unique"],
      minlength: [2, "too short Title"],
    },
    Director: {
      type: String,
    },

    Year: {
      type: Number,
      required: [true, "year  required"],
      default: 0,
    },
    Country: {
      type: String,
    },
    Length: {
      type: Number,
    },
    Genre: {
      type: String,
    },
    Colour: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("movies", schema);
