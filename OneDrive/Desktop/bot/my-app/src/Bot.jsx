import { useEffect } from 'react';

const BotScriptLoader = () => {
  useEffect(() => {
    // Define the script
    // Select the customerdiv element
let customerDiv = document.getElementById('lynk-jediteck-customer');

// Retrieve the key attribute value
let key = customerDiv?.getAttribute('key');

// Log the key value to the console
console.log("Key value: ", key);
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        // Create and inject styles
        const style = document.createElement('style');
        style.textContent = \`
          .lynk-chatbot-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #0077B5;
            color: white;
            padding: 10px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            z-index: 9999;
          }
          .lynk-chatbot-container {
            position: fixed;
            bottom: 60px;
            right: 60px;
            width: 50vw;
            height:550px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border: 1px solid #ccc;
            border-radius: 12px;
            z-index: 9998;
            display: none;
          }
          .lynk-chatbot-frame {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
          }
        \`;
        document.head.appendChild(style);

        // Create and inject HTML elements
        const button = document.createElement('button');
        button.className = 'lynk-chatbot-btn';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 0 0-2.54-3.8a199.81 199.81 0 0 1-33-110C47.65 139.09 140.73 48 255.83 48C356.21 48 440 117.54 459.58 209.85a199 199 0 0 1 4.42 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 0 0-11.12-2.07a30.71 30.71 0 0 0-12.09 2.43l-67.83 24.48a16 16 0 0 1-4.67 1.22a9.6 9.6 0 0 1-9.57-9.74a15.85 15.85 0 0 1 .6-3.29Z"/></svg>';
        document.body.appendChild(button);

        const container = document.createElement('div');
        container.className = 'lynk-chatbot-container';
        container.innerHTML = '<iframe src="http://localhost:3000/chatbot?apiKey=${key}" class="lynk-chatbot-frame" title="Chatbot"></iframe>';
        document.body.appendChild(container);

        // Toggle chatbot visibility
        let isChatbotVisible = false;
        button.addEventListener('click', () => {
          isChatbotVisible = !isChatbotVisible;
          container.style.display = isChatbotVisible ? 'block' : 'none';
          button.innerHTML = isChatbotVisible
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 0 0-2.54-3.8a199.81 199.81 0 0 1-33-110C47.65 139.09 140.73 48 255.83 48C356.21 48 440 117.54 459.58 209.85a199 199 0 0 1 4.42 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 0 0-11.12-2.07a30.71 30.71 0 0 0-12.09 2.43l-67.83 24.48a16 16 0 0 1-4.67 1.22a9.6 9.6 0 0 1-9.57-9.74a15.85 15.85 0 0 1 .6-3.29Z"/></svg>';
        });
      })();
    `;

    // Append the script to the document
    document.body.appendChild(script);

    return () => {
      // Clean up script on component unmount
      document.body.removeChild(script);
    };
  }, []);

};

export default BotScriptLoader;
