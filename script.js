/* SMOOTH SCROLLING */

let isAnimating = false; // Tracks whether the smoothScroll loop is active
let scrollPosition = window.scrollY; // This variable holds the target scroll position

function smoothScroll() {
  const currentScrollY = window.scrollY;
  const distance = scrollPosition - currentScrollY;
  if (Math.abs(distance) > 1) {
    window.scrollBy(0, distance / 20); // Reduced speed for longer animation
    requestAnimationFrame(smoothScroll);
  } else {
    // Snap to the target to avoid sub-pixel differences
    window.scrollTo(0, scrollPosition);
    isAnimating = false;
  }
}

window.addEventListener("wheel", (event) => {
  // Always prevent default behavior so our custom scrolling takes effect
  event.preventDefault();
  
  const scrollSpeed = 60;
  const scrollDelta = event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
  
  // Update the target position no matter what (even if already animating)
  scrollPosition = Math.max(
    0,
    Math.min(
      document.body.scrollHeight - window.innerHeight,
      scrollPosition + scrollDelta
    )
  );
  
  // If no smooth-scroll animation is running, start it
  if (!isAnimating) {
    isAnimating = true;
    smoothScroll();
  }
}, { passive: false });

window.addEventListener("load", () => {
  // Set the initial target position on page load
  scrollPosition = window.scrollY;
});





// CUSTOM CURSOR






document.addEventListener("DOMContentLoaded", () => {
  // Get or create the custom cursor elements:
  let cursor = document.getElementById("cursor");
  let trail = document.getElementById("trail");

  if (!cursor) {
    cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);
  }

  if (!trail) {
    trail = document.createElement("div");
    trail.id = "trail";
    document.body.appendChild(trail);
  }

  // Restore last saved cursor position (or center if not available)
  const savedX = parseFloat(sessionStorage.getItem("cursorX"));
  const savedY = parseFloat(sessionStorage.getItem("cursorY"));
  let targetX = !isNaN(savedX) ? savedX : window.innerWidth / 2;
  let targetY = !isNaN(savedY) ? savedY : window.innerHeight / 2;
  let trailX = targetX;
  let trailY = targetY;

  // For scaling effect on clickable elements:
  let targetTrailScale = 1;
  let currentTrailScale = 1;
  const scaleEasing = 0.04;

  // Immediately position the small cursor from the start
  cursor.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
  // Position the trailing cursor at the same initial position
  trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;

  // Update cursor position on mousemove and store the value
  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;

    // Instantly update the small cursor
    cursor.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

    // Save the current position for next page load
    sessionStorage.setItem("cursorX", targetX);
    sessionStorage.setItem("cursorY", targetY);
  });

  // Adjust the trailing cursor scale when hovering clickable elements
  document.querySelectorAll("a, button, input, textarea").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      targetTrailScale = 0.4;
    });
    item.addEventListener("mouseleave", () => {
      targetTrailScale = 1;
    });
  });

  // Animate the trailing (big) cursor to smoothly follow the small cursor
  function animateTrail() {
    const easing = 0.025; // <--- Change this value to adjust the trail cursor's follow speed
    trailX += (targetX - trailX) * easing;
    trailY += (targetY - trailY) * easing;

    // Snap if very close (optional)
    if (Math.abs(targetX - trailX) < 0.5) trailX = targetX;
    if (Math.abs(targetY - trailY) < 0.5) trailY = targetY;

    // Smoothly interpolate the scale for hover effect
    currentTrailScale += (targetTrailScale - currentTrailScale) * scaleEasing;

    trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%) scale(${currentTrailScale})`;

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
});







// BACK TO TOP BUTTON





// Back to Top Button Functionality
const backToTopButton = document.querySelector('.arrow-top');

window.addEventListener('scroll', () => {
  // Show the button after scrolling down 550px
  if (window.scrollY > 550) {
    backToTopButton.classList.add('show'); // Show the button
  } else {
    backToTopButton.classList.remove('show'); // Hide the button
  }
});

backToTopButton.addEventListener('click', () => {
  // Smooth scroll to the top
  scrollPosition = 0; // Set the target scroll position to the top
  if (!isAnimating) {
    isAnimating = true;
    smoothScroll(); // Trigger the smooth scrolling animation
  }
});




// HAMBURGER MEN