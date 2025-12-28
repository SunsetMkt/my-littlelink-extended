// Import avatar images with multiple format outputs (webp and jpg)
// vite-imagetools will process these images during build
import avatarWebp from "../images/my-avatar-pride.png?format=webp&quality=85&w=200;400&imagetools";
import avatarJpg from "../images/my-avatar-pride.png?format=jpg&quality=85&w=200;400&imagetools";

// Function to update the avatar image with optimized sources
function loadOptimizedAvatar() {
  const avatarImg = document.querySelector(".avatar");
  if (!avatarImg) return;

  // Create a picture element
  const picture = document.createElement("picture");

  // Add WebP source with srcset for different sizes
  const webpSource = document.createElement("source");
  webpSource.type = "image/webp";
  webpSource.srcset = `${avatarWebp[0]} 200w, ${avatarWebp[1]} 400w`;
  webpSource.sizes = "(max-width: 200px) 200px, 400px";
  picture.appendChild(webpSource);

  // Add JPG fallback source with srcset
  const jpgSource = document.createElement("source");
  jpgSource.type = "image/jpeg";
  jpgSource.srcset = `${avatarJpg[0]} 200w, ${avatarJpg[1]} 400w`;
  jpgSource.sizes = "(max-width: 200px) 200px, 400px";
  picture.appendChild(jpgSource);

  // Add img element as final fallback
  const img = document.createElement("img");
  img.src = avatarJpg[1]; // Use the larger JPG as fallback
  img.alt = avatarImg.alt;
  img.className = avatarImg.className;
  picture.appendChild(img);

  // Replace the original img with the picture element
  avatarImg.parentNode.replaceChild(picture, avatarImg);
}

// Load optimized images when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadOptimizedAvatar);
} else {
  loadOptimizedAvatar();
}
