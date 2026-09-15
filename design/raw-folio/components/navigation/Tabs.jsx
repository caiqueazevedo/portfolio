import React from 'react';
export function Tabs({items=[],value,onChange,style}){
  const [internal,setInternal]=React.useState(items[0]);
  const cur=value!==undefined?value:internal;
  const set=v=>{setInternal(v);onChange&&onChange(v);};
  return <div style={{display:'flex',border:'2px solid var(--paper-100)',width:'max-content',...style}}>
    {items.map((it,i)=><button key={it} onClick={()=>set(it)}
      style={{fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:13,textTransform:'uppercase',letterSpacing:'.1em',padding:'10px 18px',cursor:'pointer',border:'none',borderLeft:i?'2px solid var(--paper-100)':'none',background:cur===it?'var(--acid-500)':'transparent',color:cur===it?'var(--ink-950)':'var(--paper-100)',transition:'all 120ms'}}>{it}</button>)}
  </div>;
}
