import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://images.ctfassets.net/h67z7i6sbjau/5SXZBTVpjrUkioSmfkwMGh/168f2379b27583297e8e9ce1ecc7c913/Cannes_blog_post_thumb.jpg?fm=webp&q=85&w=2880&h=2880",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Post=  mongoose.model('Post', postSchema);
export default Post;
