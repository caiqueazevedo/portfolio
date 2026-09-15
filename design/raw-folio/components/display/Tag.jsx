import React from 'react';
export function Tag({children,active=false,onClick,style}){
  const [h,setH]=React.useState(false);
  const on=active||h;
  return <span onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:'inline-block',fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'.1em',padding:'6px 12px',border:'2px solid '+(on?'var(--acid-500)':'var(--ink-700)'),background:on?'var(--acid-500)':'transparent',color:on?'var(--ink-950)':'var(--paper-100)',cursor:onClick?'pointer':'default',transition:'all 120ms',...style}}>{children}</span>;
}
