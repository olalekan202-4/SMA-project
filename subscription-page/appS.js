// Function to render subscriptions on the page
function renderSubscriptions(subscriptions) {
  const activePlanContainer = document.querySelector("#active-plan");
  activePlanContainer.innerHTML = ""; // Clear current active plans

  // Add table headings
  const headings = `
    <div class="fixed-heading">
      <div class="subscription-heading">Platform</div>
      <div class="subscription-heading">Plan</div>
      <div class="subscription-heading">Amount</div>
      <div class="subscription-heading">Purchase Date</div>
      <div class="subscription-heading">Expire Date</div>
      <div class="subscription-heading">Status</div>
      <div class="subscription-heading">Actions</div>
    </div>
  `;
  activePlanContainer.innerHTML += headings;

  // Populate subscription data
  subscriptions.forEach((subscription, index) => {
    const subscriptionContent = `
      <div class="subscription-row">
        <div>${subscription.platform}</div>
        <div>${subscription.plan}</div>
        <div>${subscription.amount}</div>
        <div>${subscription.purchaseDate}</div>
        <div>${subscription.expireDate}</div>
        <div class="${subscription.status.toLowerCase()}">${subscription.status}</div>
        <div>
          <button class="cancel-btn" data-index="${index}">Cancel</button>
        </div>
      </div>
    `;
    activePlanContainer.innerHTML += subscriptionContent;
  });

  // Add event listeners for cancel buttons
  const cancelButtons = document.querySelectorAll(".cancel-btn");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      cancelSubscription(index);
    });
  });
}

// Function to cancel a subscription
function cancelSubscription(index) {
  const subscriptions = getSubscriptionsFromLocalStorage();
  subscriptions.splice(index, 1); // Remove the subscription at the specified index
  saveSubscriptionsToLocalStorage(subscriptions);
  renderSubscriptions(subscriptions); // Re-render the updated subscriptions
}

// Function to get subscriptions from local storage
function getSubscriptionsFromLocalStorage() {
  const subscriptions = localStorage.getItem("subscriptions");
  return subscriptions ? JSON.parse(subscriptions) : [];
}

// Function to save subscriptions to local storage
function saveSubscriptionsToLocalStorage(subscriptions) {
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

// Handle the Add Subscription form submission
document.querySelector(".add-new-subscription").addEventListener("click", function () {
  const formHtml = `
    <div class="add-subscription-form-overlay">
      <div class="add-subscription-form">
        <h3>Add New Subscription</h3>
        <form id="subscriptionForm">
          <label for="platform">Platform:</label>
          <select id="platform" name="platform" required>
            <option value="Netflix">Netflix</option>
            <option value="Spotify">Spotify</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Disney+">Disney+</option>
          </select>

          <label for="plan">Plan:</label>
          <select id="plan" name="plan" required>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>

          <label for="amount">Amount:</label>
          <input type="text" id="amount" name="amount" placeholder="Enter amount" required>

          <label for="purchaseDate">Purchase Date:</label>
          <input type="date" id="purchaseDate" name="purchaseDate" required>

          <label for="expireDate">Expire Date:</label>
          <input type="date" id="expireDate" name="expireDate" required>

          <label for="status">Status:</label>
          <select id="status" name="status" required>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div class="form-buttons">
            <button type="submit">Add Subscription</button>
            <button type="button" id="cancelBtn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Display the form dynamically
  document.querySelector(".main-section").insertAdjacentHTML("beforeend", formHtml);

  // Handle Cancel button click
  document.getElementById("cancelBtn").addEventListener("click", function () {
    document.querySelector(".add-subscription-form-overlay").remove(); // Remove form when canceled
  });

  // Handle the form submission
  document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the form
    const platform = document.getElementById("platform").value;
    const plan = document.getElementById("plan").value;
    const amount = document.getElementById("amount").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const expireDate = document.getElementById("expireDate").value;
    const status = document.getElementById("status").value;

    // Create a new subscription object
    const newSubscription = {
      platform,
      plan,
      amount,
      purchaseDate,
      expireDate,
      status,
    };

    // Save the subscription to local storage
    const subscriptions = getSubscriptionsFromLocalStorage();
    subscriptions.push(newSubscription);
    saveSubscriptionsToLocalStorage(subscriptions);

    // Render the updated subscriptions
    renderSubscriptions(subscriptions);

    // Close the form
    document.querySelector(".add-subscription-form-overlay").remove();
  });
});

// Fetch all subscriptions when the page loads
window.addEventListener("load", function () {
  const subscriptions = getSubscriptionsFromLocalStorage();
  renderSubscriptions(subscriptions);
});

