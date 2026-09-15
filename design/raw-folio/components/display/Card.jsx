import React from 'react';
export function Card({surface='ink',shadow=false,rotate=0,children,style}){
  if(surface==='paper'){
    return <div style={{transform:rotate?`rotate(${rotate}deg)`:'none',filter:shadow?'drop-shadow(5px 5px 0 rgba(0,0,0,.6))':'none',...style}}>
      <div className="paper-tex torn" style={{background:'var(--paper-50)',color:'var(--ink-950)',padding:28}}>{children}</div>
    </div>;
  }
  const bg={ink:{background:'var(--ink-800)',color:'var(--paper-100)',border:'2px solid var(--border-strong)'},
    acid:{background:'var(--acid-500)',color:'var(--ink-950)',border:'2px solid var(--ink-950)'}}[surface];
  return <div className={surface==='acid'?'grain':undefined} style={{...bg,borderRadius:0,padding:24,boxShadow:shadow?(surface==='ink'?'var(--shadow-hard-acid)':'var(--shadow-hard)'):'none',transform:rotate?`rotate(${rotate}deg)`:'none',...style}}>{children}</div>;
}
