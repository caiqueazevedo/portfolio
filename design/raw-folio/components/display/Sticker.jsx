import React from 'react';
export function Sticker({children,color='blue',rotate=-2,marker=false,style}){
  const c={blue:{background:'var(--blue-500)',color:'#fff'},acid:{background:'var(--acid-500)',color:'var(--ink-950)'},paper:{background:'var(--paper-50)',color:'var(--ink-950)'}}[color];
  return <span style={{display:'inline-block',transform:`rotate(${rotate}deg)`,filter:'drop-shadow(4px 4px 0 rgba(0,0,0,.55))',...style}}>
    <span className="paper-tex torn" style={{display:'inline-block',padding:'12px 20px',fontFamily:marker?'var(--font-marker)':'var(--font-condensed)',fontWeight:marker?400:700,fontSize:marker?22:14,textTransform:marker?'lowercase':'uppercase',letterSpacing:marker?0:'.1em',...c}}>{children}</span>
  </span>;
}
