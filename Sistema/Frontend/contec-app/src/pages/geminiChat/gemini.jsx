import { useState } from 'react';
import "../../styles/gemini.css";
import api from "../../services/api";

function Ask() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'Você', text: userInput };
    setConversation([...conversation, userMessage]);

    try {
      const response = await api.post('/gemini-chat', { message: userInput });
      const reply = response.data.reply || "Erro ao obter resposta.";
      const botMessage = { sender: 'Gemini', text: reply };
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao perguntar:", error);
      const botError = { sender: 'Gemini', text: 'Erro ao processar sua pergunta.' };
      setConversation(prev => [...prev, botError]);
    }

    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='layout-container'>
      <header>
        <div className="logo-wrapper">
          <div className="logo-square"></div>
          <div className="logo-text">CONTEC</div>
        </div>
        <div className="page-title">Perguntas gerais - Gemini </div>
      </header>

      <div className="layout-content-container">
        <nav className="sidebar">
          <div className="menu-items">
            <ul>
              <li><a href="/home"><i className="fas fa-arrow-left menu-icon"></i>Voltar</a></li>
            </ul>
          </div>
        </nav>

        <main className="content">
          <div className="chat-box">

           
              {conversation.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender === 'Você' ? 'user' : 'bot'}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            

            <div className='inputask'>
              <input
                id="input-ask"
                placeholder="Pergunte algo"
                name="ask"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                required
              />
              <button id='butaoask' type="button" onClick={handleSend}>Perguntar</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Ask;
