import React, { useEffect } from 'react';

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Dynamically load Dialogflow Messenger script once component mounts
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.chatbotContainer}>
        <h2 style={styles.heading}>Chat with RetailPro Assistant</h2>

        {/* Dialogflow Messenger Widget */}
        <df-messenger
          intent="WELCOME"
          chat-title="RetailPro"
          agent-id="1c12e60f-dfa2-4f2e-95c5-cb518d999b09"
          language-code="en"
        ></df-messenger>

      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#e6f0ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  chatbotContainer: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '25px',
  },
};

export default Chatbot;