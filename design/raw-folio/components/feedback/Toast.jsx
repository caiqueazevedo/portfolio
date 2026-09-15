import React from 'react';
export function Toast({message,glyph='✱',color='acid',visible=true,style}){
  const c={acid:{background:'var(--acid-500)',color:'var(--ink-950)'},paper:{background:'var(--paper-50)',color:'var(--ink-950)'},danger:{background:'var(--danger)',color:'#fff'}}[color];
  return <div style={{display:visible?'inline-flex':'none',alignItems:'center',gap:12,padding:'12px 18px',border:'2px solid var(--ink-950)',boxShadow:'4px 4px 0 rgba(0,0,0,.6)',fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:13,textTransform:'uppercase',letterSpacing:'.08em',...c,...style}}>
    <span style={{fontWeight:800,fontSize:16}}>{glyph}</span>{message}</div>;
}
