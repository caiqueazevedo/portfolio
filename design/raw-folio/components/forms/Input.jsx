import React from 'react';
export function Input({label,placeholder,type='text',value,onChange,error,style}){
  const [f,setF]=React.useState(false);
  return <label style={{display:'flex',flexDirection:'column',gap:8,...style}}>
    {label&&<span style={{fontFamily:'var(--font-condensed)',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'.14em',color:error?'var(--danger)':'var(--paper-100)'}}>{label}</span>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{background:'var(--ink-900)',color:'var(--paper-100)',border:'2px solid '+(error?'var(--danger)':f?'var(--acid-500)':'var(--ink-700)'),borderRadius:0,padding:'12px 14px',fontFamily:'var(--font-sans)',fontSize:15,outline:'none',transition:'border-color 120ms',boxShadow:f?'4px 4px 0 var(--acid-500)':'none'}}/>
    {error&&<span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--danger)'}}>{error}</span>}
  </label>;
}
