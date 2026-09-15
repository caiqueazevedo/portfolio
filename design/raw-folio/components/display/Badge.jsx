import React from 'react';
export function Badge({children,color='acid',pulse=false,style}){
  const c={acid:{background:'var(--acid-500)',color:'var(--ink-950)'},blue:{background:'var(--blue-500)',color:'#fff'},paper:{background:'var(--paper-100)',color:'var(--ink-950)'}}[color];
  return <span style={{display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'.12em',padding:'6px 12px',...c,...style}}>
    {pulse&&<span style={{width:8,height:8,borderRadius:'50%',background:'currentColor',animation:'rfPulse 1.2s infinite'}}/>}
    <style>{'@keyframes rfPulse{0%,100%{opacity:1}50%{opacity:.25}}'}</style>{children}</span>;
}
