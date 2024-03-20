import mongoose from "mongoose";
import autoIncrement from "@alec016/mongoose-autoincrement";

const connection = mongoose.connection;
autoIncrement.initialize(connection);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    mini_title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(autoIncrement.plugin, "PostID");

export default mongoose.model("Post", PostSchema);
