import React, { useState } from 'react';

function UploadPage({ style, setStyle, onGenerate }) {
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped && dropped.type === 'application/pdf') setFile(dropped);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #c9dbe9 0%, #EEF4FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Nunito', sans-serif",
            overflow: 'auto',
            position: 'relative'
        }}>
            {/* clouds */}
            {[
                { top: '5%', duration: '15s', scale: 1, opacity: 1 },
                { top: '20%', duration: '25s', scale: 0.6, opacity: 0.6 },
                { top: '40%', duration: '20s', scale: 0.8, opacity: 0.8, delay: '-5s' },
                { top: '60%', duration: '18s', scale: 0.75, opacity: 0.75, delay: '-8s' },
                { top: '80%', duration: '22s', scale: 0.8, opacity: 0.8, delay: '-3s' },
            ].map((c, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: c.top,
                    width: 200, height: 60,
                    background: 'rgba(255,255,255,0.85)',
                    borderRadius: 200,
                    transform: `scale(${c.scale})`,
                    opacity: c.opacity,
                    animation: `moveclouds ${c.duration} linear infinite`,
                    animationDelay: c.delay || '0s',
                    zIndex: 0
                }} />
            ))}

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Nunito:wght@400;500;600&display=swap');
        @keyframes moveclouds {
          0% { margin-left: 1000px; }
          100% { margin-left: -400px; }
        }
        .btn-cloud {
          position: relative;
          padding: 0.9rem 3rem;
          color: #ffffff;
          background: #2A5BA8;
          border-radius: 100px 100px 100px 0;
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 1px;
          line-height: 2.188rem;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 30px 0 rgba(42,91,168,0.25);
          transition: all 500ms cubic-bezier(0.555, 0.645, 0.310, 1.285);
          z-index: 1;
          overflow: visible;
        }
        .btn-cloud:hover { border-radius: 45px; }
        .btn-cloud:after {
          content: '';
          width: 80px; height: 50px;
          background: #2A5BA8;
          position: absolute;
          margin-top: -10px;
          border-radius: 50px;
          z-index: -1;
          left: 18%;
          top: 0;
          transition: all 500ms cubic-bezier(0.555, 0.645, 0.310, 1.285);
        }
        .btn-cloud:hover:after { margin-top: -35px; height: 80px; }
        .btn-cloud:before {
          content: '';
          width: 60px; height: 50px;
          border-radius: 50px;
          margin-top: -10px;
          background: #2A5BA8;
          position: absolute;
          z-index: -1;
          right: 20%;
          top: 0;
          transition: all 500ms cubic-bezier(0.555, 0.645, 0.310, 1.285);
        }
        .btn-cloud:hover:before { margin-top: -30px; height: 60px; }
      `}</style>

            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 500, padding: '0 40px', textAlign: 'center' }}>
                {/* deco */}
                <div style={{ position: 'absolute', top: -20, right: 0, color: 'rgba(100,150,210,0.35)', fontSize: 13 }}>° ✦ ♡</div>
                <div style={{ position: 'absolute', bottom: -20, left: 0, color: 'rgba(100,150,210,0.35)', fontSize: 12 }}>✦ °</div>

                <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 38, color: '#1d3c6e', margin: '0 0 8px' }}>lazy notes 💤</h1>
                <p style={{ fontSize: 13, color: '#0c2a45', marginBottom: 36, letterSpacing: '0.05em' }}>From PDF to perfect notes, instantly. ☁️💤</p>

                {/* upload area */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{
                        background: dragOver ? 'rgba(200,222,255,0.6)' : 'rgba(255,255,255,0.75)',
                        border: '1.5px dashed #93B9F0',
                        borderRadius: 20,
                        padding: '36px 24px',
                        marginBottom: 24,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    <div style={{ fontSize: 32, marginBottom: 10 }}>☁️</div>
                    <div style={{ fontSize: 14, color: '#3A6DB5', fontWeight: 600, marginBottom: 4 }}>
                        {file ? file.name : 'drop your pdf here'}
                    </div>
                    <div style={{ fontSize: 12, color: '#8AB4D8' }}>
                        {file ? 'ready to drift into notes °' : 'or click to browse'}
                    </div>
                    <input id="fileInput" type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                </div>

                {/* style pills */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 36, justifyContent: 'center' }}>
                    {['concise', 'detailed', 'exam'].map(s => (
                        <div key={s} onClick={() => setStyle(s)} style={{
                            background: style === s ? '#C8DEFF' : 'rgba(255,255,255,0.6)',
                            border: `1.5px solid ${style === s ? '#4A7CC7' : '#93B9F0'}`,
                            borderRadius: 99,
                            padding: '7px 18px',
                            fontSize: 12,
                            color: '#3A6DB5',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}>
                            {s === 'concise' ? '☁️ concise' : s === 'detailed' ? '☁️ detailed' : '☁️ exam prep'}
                        </div>
                    ))}
                </div>

                {/* generate button */}
                <button
                    className="btn-cloud"
                    disabled={!file}
                    onClick={() => file && onGenerate(file)}
                    style={{ opacity: file ? 1 : 0.5 }}
                >
                    generate my notes
                </button>
            </div>
        </div>
    );
}

export default UploadPage;