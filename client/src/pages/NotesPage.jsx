import React, { useState } from 'react';

function NotesPage({ notes, style, onStyleChange, onBack }) {
    const [activeTab, setActiveTab] = useState('notes');
    const [dark, setDark] = useState(false);

    const d = {
        bg: dark ? 'linear-gradient(180deg, #0D1B2A 0%, #1B2A3F 100%)' : 'linear-gradient(180deg, #c9dbe9 0%, #EEF4FF 100%)',
        cloud: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
        notebook: dark ? '#1A2540' : 'white',
        notebookBorder: dark ? 'rgba(100,150,210,0.2)' : 'rgba(147,185,240,0.4)',
        tabBg: dark ? '#0F1E30' : '#EAF2FF',
        tabBorder: dark ? '#1E3A5A' : '#C8DEFF',
        tabActive: dark ? '#1A2540' : 'white',
        tabActiveText: dark ? '#7AABD8' : '#2A5BA8',
        tabInactiveText: dark ? '#3A5A7A' : '#7AAAD8',
        lines: dark ? 'repeating-linear-gradient(transparent, transparent 27px, #1E3A5A 27px, #1E3A5A 28px)' : 'repeating-linear-gradient(transparent, transparent 27px, #DDEEFF 27px, #DDEEFF 28px)',
        margin: dark ? 'rgba(255,100,100,0.15)' : 'rgba(255,160,160,0.3)',
        doodle: dark ? '#3A5A7A' : '#7AABD8',
        title: dark ? '#7AABD8' : '#2A5BA8',
        text: dark ? '#B0C8E0' : '#2A4070',
        termText: dark ? '#7AABD8' : '#2A5BA8',
        termDef: dark ? '#5A7A9A' : '#4A6A9A',
        arrow: dark ? '#3A5A7A' : '#93B9F0',
        sticky: dark ? '#3D3A1A' : '#FFF9C4',
        stickyText: dark ? '#C0B060' : '#5A5020',
        btnBg: dark ? 'rgba(30,58,90,0.7)' : 'rgba(255,255,255,0.7)',
        btnBorder: dark ? '#2A5BA8' : '#93B9F0',
        btnText: dark ? '#7AABD8' : '#3A6DB5',
        pillActive: dark ? '#1E3A5A' : '#C8DEFF',
        pillActiveBorder: dark ? '#7AABD8' : '#4A7CC7',
        pillInactive: dark ? 'rgba(20,40,60,0.6)' : 'rgba(255,255,255,0.6)',
        pillInactiveBorder: dark ? '#2A4A6A' : '#93B9F0',
        pillText: dark ? '#7AABD8' : '#3A6DB5',
        heading: dark ? '#7AABD8' : '#2A5BA8',
    };

    const renderNotes = () => {
        if (!notes?.notes) return null;
        const isQA = notes.notes.includes('Q:');
        if (isQA) {
            return (
                <div style={{ marginBottom: 28 }}>
                    {notes.notes.split(/(?=Q:)/).map((block, i) => {
                        const qMatch = block.match(/Q:\s*(.+?)\s*A:/s);
                        const aMatch = block.match(/A:\s*(.+)/s);
                        const q = qMatch ? qMatch[1].trim() : '';
                        const a = aMatch ? aMatch[1].trim() : block.trim();
                        return (
                            <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: `1px dashed ${dark ? 'rgba(100,150,210,0.2)' : 'rgba(147,185,240,0.3)'}` }}>
                                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: d.title, fontWeight: 600, lineHeight: '28px' }}>Q: {q}</div>
                                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: d.text, lineHeight: '28px', paddingLeft: 12 }}>A: {a}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div style={{ marginBottom: 28 }}>
                {notes.notes.split('. ').map((sentence, i) => (
                    sentence.trim() && (
                        <div key={i} style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: 17,
                            color: d.text,
                            lineHeight: '28px',
                            marginBottom: 14,
                            paddingBottom: 14,
                            borderBottom: `1px dashed ${dark ? 'rgba(100,150,210,0.2)' : 'rgba(147,185,240,0.3)'}`
                        }}>
                            · {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                        </div>
                    )
                ))}
            </div>
        );
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: d.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Nunito', sans-serif",
            padding: '40px 20px',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            transition: 'background 0.4s'
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Nunito:wght@400;500;600&display=swap');
        @keyframes moveclouds {
          0% { margin-left: 1200px; }
          100% { margin-left: -600px; }
        }
      `}</style>

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
                    background: d.cloud,
                    borderRadius: 200,
                    transform: `scale(${c.scale})`,
                    opacity: c.opacity,
                    animation: `moveclouds ${c.duration} linear infinite`,
                    animationDelay: c.delay || '0s',
                    zIndex: 0,
                    transition: 'background 0.4s'
                }} />
            ))}

            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 480 }}>
                {/* header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: d.heading, margin: 0 }}>lazy notes 💤</h1>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setDark(!dark)} style={{
                            background: d.btnBg, border: `1px solid ${d.btnBorder}`,
                            borderRadius: 99, padding: '5px 12px', fontSize: 14,
                            cursor: 'pointer', transition: 'all 0.3s'
                        }}>{dark ? '☀️' : '🌙'}</button>
                        <button onClick={onBack} style={{
                            background: d.btnBg, border: `1px solid ${d.btnBorder}`,
                            borderRadius: 99, padding: '5px 14px', fontSize: 11,
                            color: d.btnText, fontWeight: 600, cursor: 'pointer'
                        }}>+ new note</button>
                    </div>
                </div>

                {/* style switcher */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, justifyContent: 'center' }}>
                    {['concise', 'detailed', 'exam'].map(s => (
                        <div key={s} onClick={() => onStyleChange(s)} style={{
                            background: style === s ? d.pillActive : d.pillInactive,
                            border: `1.5px solid ${style === s ? d.pillActiveBorder : d.pillInactiveBorder}`,
                            borderRadius: 99, padding: '5px 14px', fontSize: 11,
                            color: d.pillText, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}>
                            {s === 'concise' ? '✦ concise' : s === 'detailed' ? '☁️ detailed' : '° exam prep'}
                        </div>
                    ))}
                </div>

                {/* notebook */}
                <div style={{ background: d.notebook, borderRadius: 16, border: `1px solid ${d.notebookBorder}`, boxShadow: '0 4px 24px rgba(42,91,168,0.08)', overflow: 'hidden', transition: 'all 0.4s' }}>
                    {/* tabs */}
                    <div style={{ background: d.tabBg, padding: '12px 16px 0', display: 'flex', borderBottom: `2px solid ${d.tabBorder}`, transition: 'all 0.4s' }}>
                        {['notes', 'terms'].map((tab) => (
                            <div key={tab} onClick={() => setActiveTab(tab)} style={{
                                padding: '7px 16px',
                                fontFamily: "'Caveat', cursive",
                                fontSize: 15, fontWeight: 600,
                                color: activeTab === tab ? d.tabActiveText : d.tabInactiveText,
                                background: activeTab === tab ? d.tabActive : 'transparent',
                                borderRadius: '8px 8px 0 0',
                                border: activeTab === tab ? `1px solid ${d.tabBorder}` : '1px solid transparent',
                                borderBottom: activeTab === tab ? `2px solid ${d.tabActive}` : 'none',
                                marginBottom: activeTab === tab ? -2 : 0,
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}>{tab === 'notes' ? 'my notes' : 'key terms'}</div>
                        ))}
                    </div>

                    {/* lined page */}
                    <div style={{
                        position: 'relative', padding: '16px 16px 16px 48px',
                        backgroundImage: d.lines, backgroundSize: '100% 28px', minHeight: 320
                    }}>
                        <div style={{ position: 'absolute', left: 36, top: 0, bottom: 0, width: 1, background: d.margin }} />
                        <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 20, alignItems: 'center' }}>
                            {['★', '✿', '☁', '★', '♡', '✦', '✿'].map((dd, i) => (
                                <span key={i} style={{ fontSize: 13, opacity: 0.4, transform: 'rotate(-10deg)', color: d.doodle }}>{dd}</span>
                            ))}
                        </div>

                        {activeTab === 'notes' && (
                            <>
                                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: d.title, lineHeight: '28px', marginBottom: 6 }}>{notes?.title}</div>
                                <div style={{ height: 2, width: '60%', background: `linear-gradient(90deg, ${d.title}, transparent)`, borderRadius: 2, marginBottom: 14 }} />
                                {renderNotes()}
                                {notes?.highlight && (
                                    <div style={{
                                        background: d.sticky, borderRadius: 4, padding: '8px 10px',
                                        fontFamily: "'Caveat', cursive", fontSize: 15, color: d.stickyText,
                                        transform: 'rotate(1.5deg)', display: 'inline-block', marginBottom: 28,
                                        boxShadow: '2px 2px 6px rgba(0,0,0,0.08)', lineHeight: 1.5, transition: 'all 0.4s'
                                    }}>
                                        imp!! {notes.highlight}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'terms' && (
                            <>
                                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: d.title, lineHeight: '28px', marginBottom: 6 }}>key terms ✦</div>
                                <div style={{ height: 2, width: '60%', background: `linear-gradient(90deg, ${d.title}, transparent)`, borderRadius: 2, marginBottom: 14 }} />
                                {notes?.terms?.map((t, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline', lineHeight: '28px' }}>
                                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: d.termText, fontWeight: 600, minWidth: 120, flexShrink: 0 }}>{t.term}</span>
                                        <span style={{ color: d.arrow, flexShrink: 0 }}>→</span>
                                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: d.termDef }}>{t.definition}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesPage;