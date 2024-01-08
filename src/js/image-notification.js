export function createImageNotification(
  imageDesktop1,
  imageDesktop2,
  imageTab1,
  imageTab2,
  imageMob1,
  imageMob2,
  imageText
) {
  return `<div class="image-container">
           <picture class="image">
            <source
            srcset="
              ${imageDesktop1} 1x,
              ${imageDesktop2} 2x
            "
            media="(min-width: 1280px)"
            />  
            <source
            srcset="
              ${imageTab1} 1x,
              ${imageTab2} 2x
            "
            media="(min-width: 768px)"
            />
            <source
            srcset="
              ${imageMob1} 1x,
              ${imageMob2} 2x
            "
            media="(max-width: 767px)"
            />
            <img src="${imageMob1}" alt="alarm button" />
           </picture>
           <p class="notification-text">${imageText}</p>
          </div>`;
}
