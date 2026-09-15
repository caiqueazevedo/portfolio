import React from 'react';
export function Textarea({label,placeholder,value,onChange,rows=4,style}){
  const [f,setF]=React.useState(false);
  return <label style={{display:'flex',flexDirection:'column',gap:8,...style}}>
    {label&&<span style={{fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'.14em',color:'var(--paper-100)'}}>{label}</span>}
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
      onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{background:'var(--ink-900)',color:'var(--paper-100)',border:'2px solid '+(f?'var(--acid-500)':'var(--ink-700)'),borderRadius:0,padding:'12px 14px',fontFamily:'var(--font-sans)',fontSize:15,outline:'none',resize:'vertical',transition:'border-color 120ms',boxShadow:f?'4px 4px 0 var(--acid-500)':'none'}}/>
  </label>;
}
