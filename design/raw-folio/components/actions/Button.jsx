import React from 'react';
const base={fontFamily:'var(--font-condensed)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',border:'2px solid var(--ink-950)',borderRadius:0,cursor:'pointer',transition:'transform 120ms cubic-bezier(.2,.9,.2,1),box-shadow 120ms cubic-bezier(.2,.9,.2,1),background 120ms,color 120ms',display:'inline-flex',alignItems:'center',gap:8,lineHeight:1};
const sizes={sm:{fontSize:12,padding:'8px 14px'},md:{fontSize:14,padding:'12px 20px'},lg:{fontSize:16,padding:'16px 28px'}};
const variants={
primary:{background:'var(--acid-500)',color:'var(--ink-950)',boxShadow:'var(--shadow-hard-paper)'},
secondary:{background:'var(--paper-100)',color:'var(--ink-950)',boxShadow:'var(--shadow-hard-acid)'},
ghost:{background:'transparent',color:'var(--paper-100)',border:'2px solid var(--paper-100)',boxShadow:'none'},
blue:{background:'var(--blue-500)',color:'#fff',boxShadow:'var(--shadow-hard-paper)'}
};
export function Button({variant='primary',size='md',disabled=false,children,onClick,style}){
  const [st,setSt]=React.useState('idle');
  const hasShadow=variant!=='ghost';
  const dyn=disabled?{opacity:.4,cursor:'not-allowed'}:st==='press'?{transform:'translate(3px,3px)',boxShadow:hasShadow?'0 0 0 var(--paper-100)':'none'}:st==='hover'?{transform:'translate(-2px,-2px)',boxShadow:hasShadow?'7px 7px 0 '+(variant==='secondary'?'var(--acid-500)':'var(--paper-100)'):'none',...(variant==='ghost'?{background:'var(--paper-100)',color:'var(--ink-950)'}:{})}:{};
  return <button style={{...base,...sizes[size],...variants[variant],...dyn,...style}} disabled={disabled} onClick={onClick}
    onMouseEnter={()=>!disabled&&setSt('hover')} onMouseLeave={()=>setSt('idle')} onMouseDown={()=>!disabled&&setSt('press')} onMouseUp={()=>!disabled&&setSt('hover')}>{children}</button>;
}
