import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // Check if the Botpress WebChat is loaded
    const scriptExists = document.querySelector(
      'script[src*="https://cdn.botpress.cloud/webchat"]'
    );

    if (!scriptExists) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/30/17/20250130173356-SAH13N07.json";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Botpress WebChat loaded");
      };
    }
  }, []);

  const openChat = () => {
    if (window.BotpressWebChat) {
      window.BotpressWebChat.toggle();
    } else {
      console.error("BotpressWebChat is not initialized yet!");
    }
  };

  return (
    <div>
      <button
        onClick={openChat}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Chat with Us
      </button>
    </div>
  );
};

export default ChatBot;
