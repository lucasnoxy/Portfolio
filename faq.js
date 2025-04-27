document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const icon = item.querySelector(".faq-icon");
  
      question.addEventListener("click", function () {
        // Close any other open FAQ item
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherIcon = otherItem.querySelector(".faq-icon");
            if (otherIcon) {
              otherIcon.textContent = "+";
            }
          }
        });
  
        // Toggle current FAQ item
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          icon.textContent = "+";
        } else {
          item.classList.add("active");
          icon.textContent = "–"; // Use the en dash or minus sign
        }
      });
    });
  });
  