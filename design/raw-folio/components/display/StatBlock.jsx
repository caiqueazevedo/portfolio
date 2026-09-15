import React from 'react';
export function StatBlock({value,label,dark=false,style}){
  return <div style={{display:'flex',flexDirection:'column',gap:4,color:dark?'var(--ink-950)':'var(--paper-100)',...style}}>
    <span style={{fontFamily:'var(--font-display)',fontSize:56,lineHeight:.95,textTransform:'uppercase'}}>{value}</span>
    <span style={{fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'.14em'}}>{label}</span>
  </div>;
}
