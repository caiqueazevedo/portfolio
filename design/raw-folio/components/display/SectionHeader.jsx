import React from 'react';
export function SectionHeader({title,glyph='✱',action,style}){
  return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,...style}}>
    <h2 style={{fontFamily:'var(--font-display)',fontSize:34,textTransform:'uppercase',lineHeight:.9,color:'var(--paper-100)',margin:0,display:'flex',alignItems:'center',gap:14}}>{title}<span style={{color:'var(--acid-500)',fontFamily:'var(--font-sans)',fontWeight:800}}>{glyph}</span></h2>
    {action}
  </div>;
}
