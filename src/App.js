import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function NecromancerApp() {
  const [person, setPerson] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResponse = async (person, question) => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `
        You are the spirit of a dead celebrity named ${person}. If that person is not dead, reply with something along the lines of "I'm busy being alive right now." 
        Otherwise, Answer the query below in the speaking/writing style of that celebrity.
        
        User Query: ${question}
      `;

      const result = await model.generateContent(prompt);
      return result.response.text();
  };

  const invokeNecromancer = async () => {
    setLoading(true);
    setResponse('Summoning...');

    try {
      const result = await fetchResponse(person, question);
      setResponse(result);
    } catch (error) {
      setResponse('Failed to connect to the spirits: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'deepPurple', textAlign: 'center' }}>Necromancer</h1>
      <p style={{ textAlign: 'center' }}>Summon the wisdom of the dead</p>

      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="person" style={{ display: 'block', marginBottom: '5px' }}>Name of the deceased</label>
          <input
            id="person"
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid gray' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="question" style={{ display: 'block', marginBottom: '5px' }}>Your question</label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid gray' }}
          />
        </div>

        <button
          onClick={invokeNecromancer}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'purple',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Summoning...' : 'Summon'}
        </button>

        {response && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '5px' }}>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default NecromancerApp;
