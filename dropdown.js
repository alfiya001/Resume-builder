function toggleOptions() {
    var optionsContainer = document.getElementById('options-container');
    optionsContainer.style.display = (optionsContainer.style.display === 'block') ? 'none' : 'block';
  }

  function selectOption(option) {
    var selectedOptions = document.getElementById('selected-options');
    selectedOptions.textContent = option.textContent;
    toggleOptions();
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.custom-select')) {
      var optionsContainer = document.getElementById('options-container');
      if (optionsContainer.style.display === 'block') {
        optionsContainer.style.display = 'none';
      }
    }
  }