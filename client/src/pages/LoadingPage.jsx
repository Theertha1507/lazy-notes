import React, { useState, useEffect } from 'react';

const messages = [
    'reading your pdf...',
    'finding the good stuff...',
    'connecting the dots ✦',
    'almost there ☁️',
    'putting it all together...',
    'your notes are blooming ✦'
];

function LoadingPage() {
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx(i => (i + 1) % messages.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #c9dbe9 0%, #EEF4FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Nunito', sans-serif",
            overflow: 'hidden',
            position: 'relative'
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Nunito:wght@400;500&display=swap');
        @keyframes moveclouds {
          0% { margin-left: 1000px; }
          100% { margin-left: -400px; }
        }
        @keyframes draw {
          0%   { width: 0%;   opacity: 1; }
          70%  { width: 88%;  opacity: 1; }
          85%  { width: 88%;  opacity: 0; }
          100% { width: 0%;   opacity: 0; }
        }
        @keyframes movepen {
          0%   { left: -14px; opacity: 1; }
          70%  { left: calc(100% - 30px); opacity: 1; }
          85%  { left: calc(100% - 30px); opacity: 0; }
          86%  { left: -14px; opacity: 0; }
          100% { left: -14px; opacity: 1; }
        }
        .msg-fade { transition: opacity 0.4s; }
      `}</style>

            {/* clouds */}
            {[
                { top: '5%', duration: '15s', scale: 1, opacity: 1 },
                { top: '20%', duration: '25s', scale: 0.6, opacity: 0.6 },
                { top: '40%', duration: '20s', scale: 0.8, opacity: 0.8, delay: '-5s' },
                { top: '60%', duration: '18s', scale: 0.75, opacity: 0.75, delay: '-8s' },
                { top: '80%', duration: '22s', scale: 0.8, opacity: 0.8, delay: '-3s' },
            ].map((c, i) => (
                <div key={i} style={{
                    position: 'absolute', top: c.top,
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

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: 300 }}>
                <div style={{ position: 'absolute', top: -40, right: 0, color: 'rgba(100,150,210,0.35)', fontSize: 13 }}>☁️ </div>
                <div style={{ position: 'absolute', bottom: -40, left: 0, color: 'rgba(100,150,210,0.35)', fontSize: 12 }}>☁️</div>

                <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 30, color: '#2A5BA8', marginBottom: 8 }}>lazy notes 💤 ☁️</h2>

                <p className="msg-fade" style={{ fontFamily: "'Caveat', cursive", fontSize: 19, color: '#6A9BD4', minHeight: 28, marginBottom: 24 }}>
                    {messages[msgIdx]}
                </p>

                {/* pen animation */}
                <div style={{ width: 260, height: 60, position: 'relative', margin: '0 auto 16px' }}>
                    {/* track */}
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: 2, background: 'rgba(147,185,240,0.25)', borderRadius: 2 }} />
                    {/* fill */}
                    <div style={{ position: 'absolute', top: '50%', height: 2, background: 'linear-gradient(90deg, #93C5FD, #2A5BA8)', borderRadius: 2, animation: 'draw 3s ease-in-out infinite' }} />
                    {/* pen */}
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-30deg)', animation: 'movepen 3s ease-in-out infinite', width: 28, height: 28 }}>
                        <div style={{ position: 'absolute', top: 9, left: -8, width: 8, height: 10, background: '#93C5FD', borderRadius: '2px 2px 0 0' }} />
                        <div style={{ position: 'absolute', top: 9, width: 28, height: 10, background: '#2A5BA8', borderRadius: '2px 0 0 2px' }}>
                            <div style={{ position: 'absolute', top: 3, left: 2, width: 20, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
                        </div>
                        <div style={{ position: 'absolute', top: 9, left: 28, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '10px solid #1a3f7a' }} />
                    </div>
                </div>

                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#A0C0E8' }}>this might take a moment ° hang tight ☁️</p>
            </div>
        </div>
    );
}

export default LoadingPage;