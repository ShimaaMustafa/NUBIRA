import React from 'react'

export default function Logo() {
  return (
    <div>
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="nubiraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a4e;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#6b4c9a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4da6ff;stop-opacity:1" />
    </linearGradient>
    
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect x="32" y="32" width="448" height="448" rx="100" ry="100" fill="#0f0f1a"/>
  
  <g transform="translate(256, 256)" filter="url(#glow)">
    
    <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" 
            fill="url(#nubiraGradient)" opacity="0.9"/>
    
    <circle cx="0" cy="0" r="25" fill="#ffffff" opacity="0.95"/>
    
    
    <circle cx="0" cy="-95" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="0" y1="-60" x2="0" y2="-77" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    <circle cx="82" cy="-47" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="45" y1="-26" x2="64" y2="-39" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    <circle cx="82" cy="47" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="45" y1="26" x2="64" y2="39" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    
    <circle cx="0" cy="95" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="0" y1="60" x2="0" y2="77" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    <circle cx="-82" cy="47" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="-45" y1="26" x2="-64" y2="39" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    <circle cx="-82" cy="-47" r="18" fill="url(#nubiraGradient)" opacity="0.85"/>
    <line x1="-45" y1="-26" x2="-64" y2="-39" stroke="url(#nubiraGradient)" stroke-width="4" opacity="0.6"/>
    
    <circle cx="0" cy="0" r="130" fill="none" stroke="url(#nubiraGradient)" stroke-width="3" opacity="0.3" stroke-dasharray="60 40"/>
    
    <circle cx="0" cy="-130" r="6" fill="#4da6ff" opacity="0.8"/>
    <circle cx="113" cy="-65" r="6" fill="#6b4c9a" opacity="0.8"/>
    <circle cx="113" cy="65" r="6" fill="#4da6ff" opacity="0.8"/>
    <circle cx="0" cy="130" r="6" fill="#6b4c9a" opacity="0.8"/>
    <circle cx="-113" cy="65" r="6" fill="#4da6ff" opacity="0.8"/>
    <circle cx="-113" cy="-65" r="6" fill="#6b4c9a" opacity="0.8"/>
    
  </g>
</svg>
    </div>
  )
}
