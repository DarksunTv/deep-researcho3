document.addEventListener('DOMContentLoaded', () => {
  const commandInput = document.getElementById('command-input');
  const executeButton = document.getElementById('execute-command');
  const commandOutput = document.getElementById('command-output');
  const frequentCommandButtons = document.querySelectorAll('.frequent-command');
  const agentLogsDiv = document.getElementById('agent-logs');
  const clearLogsButton = document.getElementById('clear-logs');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const applySettingsButton = document.getElementById('apply-settings');

  // Function to append a log message
  function addLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    agentLogsDiv.textContent += `[${timestamp}] ${message}\n`;
  }

  executeButton.addEventListener('click', async () => {
    const command = commandInput.value.trim();
    if (!command) {
      commandOutput.textContent = 'Please enter a command.';
      return;
    }

    commandOutput.textContent = 'Executing command...';

    try {
      const response = await fetch('/api/chatbot/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      commandOutput.textContent = data.result || 'No result returned.';
      addLog(`Command executed: ${command}`);
    } catch (error) {
      commandOutput.textContent = 'Error executing command: ' + error.message;
      addLog(`Error: ${error.message}`);
    }
  });

  // Add click event listeners to frequent command buttons
  frequentCommandButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cmd = button.getAttribute('data-command');
      commandInput.value = cmd;
      executeButton.click();
    });
  });

  // Clear logs button functionality
  clearLogsButton.addEventListener('click', () => {
    agentLogsDiv.textContent = '';
    addLog('Logs cleared');
  });

  // Apply settings button functionality
  applySettingsButton.addEventListener('click', () => {
    if(darkModeToggle.checked){
      document.body.classList.add('dark-mode');
      addLog('Dark mode enabled');
    } else {
      document.body.classList.remove('dark-mode');
      addLog('Dark mode disabled');
    }
  });
}); 