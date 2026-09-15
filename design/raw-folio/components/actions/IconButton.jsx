import React from 'react';
export function IconButton({glyph='→',variant='primary',size=44,label,onClick,style}){
  const [h,setH]=React.useState(false);
  const v={primary:{background:'var(--acid-500)',color:'var(--ink-950)',border:'2px solid var(--ink-950)'},
    ghost:{background:'transparent',color:'var(--paper-100)',border:'2px solid var(--paper-100)'},
    paper:{background:'var(--paper-100)',color:'var(--ink-950)',border:'2px solid var(--ink-950)'}}[variant];
  const hov=h?(variant==='ghost'?{background:'var(--paper-100)',color:'var(--ink-950)'}:{transform:'rotate(-6deg) scale(1.06)'}):{};
  return <button aria-label={label} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{width:size,height:size,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:size*.5,fontWeight:800,borderRadius:0,cursor:'pointer',transition:'all 120ms cubic-bezier(.2,.9,.2,1)',...v,...hov,...style}}>{glyph}</button>;
}
