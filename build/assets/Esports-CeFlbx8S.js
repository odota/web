import{c as T,j as $,s as A,B as xe,m as ye,e as re,g as _e,a as Ee,r as _,u as be,b as $e,d as ve,f as Se,T as ke,R as e,h as a,i as h,k as U,L as I,l as J,E as Ce,n as V,o as we,p as ze,G as ne,P as Fe,F as oe,H as Me,q as Be,t as le,v as G,w as se,x as Ie,y as Le}from"./index-BJazTsnb.js";const je=T($.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),Ne=A(xe,{name:"MuiBreadcrumbCollapsed"})(ye(({theme:n})=>({display:"flex",marginLeft:`calc(${n.spacing(1)} * 0.5)`,marginRight:`calc(${n.spacing(1)} * 0.5)`,...n.palette.mode==="light"?{backgroundColor:n.palette.grey[100],color:n.palette.grey[700]}:{backgroundColor:n.palette.grey[700],color:n.palette.grey[100]},borderRadius:2,"&:hover, &:focus":{...n.palette.mode==="light"?{backgroundColor:n.palette.grey[200]}:{backgroundColor:n.palette.grey[600]}},"&:active":{boxShadow:n.shadows[0],...n.palette.mode==="light"?{backgroundColor:re(n.palette.grey[200],.12)}:{backgroundColor:re(n.palette.grey[600],.12)}}}))),He=A(je)({width:24,height:16});function Ge(n){const{slots:r={},slotProps:o={},...u}=n,d=n;return $.jsx("li",{children:$.jsx(Ne,{focusRipple:!0,...u,ownerState:d,children:$.jsx(He,{as:r.CollapsedIcon,ownerState:d,...o.collapsedIcon})})})}function Pe(n){return _e("MuiBreadcrumbs",n)}const Te=Ee("MuiBreadcrumbs",["root","ol","li","separator"]),Re=n=>{const{classes:r}=n;return Se({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},Pe,r)},Ve=A(ke,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(n,r)=>[{[`& .${Te.li}`]:r.li},r.root]})({}),Ae=A("ol",{name:"MuiBreadcrumbs",slot:"Ol"})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),De=A("li",{name:"MuiBreadcrumbs",slot:"Separator"})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function We(n,r,o,u){return n.reduce((d,s,l)=>(l<n.length-1?d=d.concat(s,$.jsx(De,{"aria-hidden":!0,className:r,ownerState:u,children:o},`separator-${l}`)):d.push(s),d),[])}const Oe=_.forwardRef(function(r,o){const u=be({props:r,name:"MuiBreadcrumbs"}),{children:d,className:s,component:l="nav",slots:c={},slotProps:p={},expandText:y="Show path",itemsAfterCollapse:f=1,itemsBeforeCollapse:g=1,maxItems:m=8,separator:x="/",...L}=u,[k,j]=_.useState(!1),E={...u,component:l,expanded:k,expandText:y,itemsAfterCollapse:f,itemsBeforeCollapse:g,maxItems:m,separator:x},b=Re(E),H=$e({elementType:c.CollapsedIcon,externalSlotProps:p.collapsedIcon,ownerState:E}),D=_.useRef(null),R=v=>{const B=()=>{j(!0);const C=D.current.querySelector("a[href],button,[tabindex]");C&&C.focus()};return g+f>=v.length?v:[...v.slice(0,g),$.jsx(Ge,{"aria-label":y,slots:{CollapsedIcon:c.CollapsedIcon},slotProps:{collapsedIcon:H},onClick:B},"ellipsis"),...v.slice(v.length-f,v.length)]},N=_.Children.toArray(d).filter(v=>_.isValidElement(v)).map((v,B)=>$.jsx("li",{className:b.li,children:v},`child-${B}`));return $.jsx(Ve,{ref:o,component:l,color:"textSecondary",className:ve(b.root,s),ownerState:E,...L,children:$.jsx(Ae,{className:b.ol,ref:D,ownerState:E,children:We(k||m&&N.length<=m?N:R(N),b.separator,x,E)})})}),M=T($.jsx("path",{d:"M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2M5 8V7h2v3.82C5.84 10.4 5 9.3 5 8m14 0c0 1.3-.84 2.4-2 2.82V7h2z"})),ie=T($.jsx("path",{d:"m21.58 16.09-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91M11 11H9v2H8v-2H6v-1h2V8h1v2h2zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"})),ce=T($.jsx("path",{d:"M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"})),Ue=T([$.jsx("path",{d:"M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2"},"0"),$.jsx("path",{d:"m15 9 .94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11 4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"},"1")]),qe=h.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 1px solid rgba(100, 160, 210, 0.25);
  border-radius: 4px;
  background: rgba(100, 160, 210, 0.12);
  color: ${a.colorBlue};
  font-family: ${a.fontFamilyFuturistic};
  font-size: ${a.fontSizeSmall};
  font-weight: 600;
  img { width: 100%; height: 100%; object-fit: contain; }
`;function Ye({name:n,banner:r,ticket:o}){const[u,d]=_.useState(""),s=[r,o].find(p=>p&&/^https?:\/\//.test(p))||"",l=n.match(/[\p{L}\p{N}]+/gu)||[],c=(l.length>1?l.slice(0,3).map(p=>Array.from(p)[0]).join(""):Array.from(l[0]||"?").slice(0,3).join("")).toUpperCase();return e.createElement(qe,{"aria-hidden":"true",title:n},s&&s!==u?e.createElement("img",{src:s,alt:"",loading:"lazy",onError:()=>d(s)}):c)}const Y=T($.jsx("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"})),Je=h.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  .tournament-art {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 140px;
    border: 1px solid rgba(100, 160, 210, 0.25);
    border-radius: 4px;
    background: rgba(100, 160, 210, 0.1);
    color: ${a.textColorSecondary};
    text-align: center;
    img { width: 100%; max-height: 180px; object-fit: contain; }
    svg { width: 48px; height: 48px; color: ${a.colorGolden}; }
  }
  h2 { margin-bottom: 12px; }
  dl { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 8px 16px; margin: 12px 0; }
  dt { color: ${a.textColorSecondary}; }
  dd { margin: 0; overflow-wrap: anywhere; }
  dd svg { width: 14px; height: 14px; vertical-align: middle; margin-right: 6px; color: ${a.colorBlue}; }
  @media (max-width: ${a.wrapMobile}) { grid-template-columns: minmax(0, 1fr); }
`,Ke=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  a { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid ${a.dividerColor}; border-radius: 3px; }
  img, svg { width: 24px; height: 24px; object-fit: contain; }
`;function Qe({league:n,tier:r,games:o,teams:u,historyReady:d}){const s=U(),[l,c]=_.useState(""),p=[n.banner,n.ticket].find(m=>m&&/^https?:\/\//.test(m))||"",y=o.map(m=>m.start_time),f=m=>new Date(m*1e3).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),g=new Map;return o.forEach(m=>{for(const[x,L]of[[m.radiant_team_id,m.radiant_name],[m.dire_team_id,m.dire_name]]){if(!x||g.has(x))continue;const k=u.find(j=>j.team_id===x);g.set(x,{name:L||k?.name||s.general_unknown,logo_url:k?.logo_url||""})}}),e.createElement(e.Fragment,null,e.createElement(Je,null,e.createElement("div",{className:"tournament-art"},p&&l!==p?e.createElement("img",{src:p,alt:n.name,onError:()=>c(p)}):e.createElement(e.Fragment,null,e.createElement(M,{"aria-hidden":"true"}),e.createElement("span",null,s.esports_no_artwork))),e.createElement("div",null,e.createElement("h2",null,n.name),r,e.createElement("dl",null,e.createElement("dt",null,s.th_league),e.createElement("dd",null,n.leagueid),d&&y.length>0&&e.createElement(e.Fragment,null,e.createElement("dt",null,s.esports_first_recorded_match),e.createElement("dd",null,e.createElement(Y,{"aria-hidden":"true"}),f(Math.min(...y))),e.createElement("dt",null,s.esports_last_recorded_match),e.createElement("dd",null,e.createElement(Y,{"aria-hidden":"true"}),f(Math.max(...y))))))),d&&g.size>0&&e.createElement(e.Fragment,null,e.createElement("h2",{style:{marginBottom:12}},s.esports_participating_teams),e.createElement(Ke,null,Array.from(g,([m,x])=>e.createElement(I,{key:m,to:`/teams/${m}`},e.createElement(J,{teamId:m,src:x.logo_url}),x.name)))))}const Xe=n=>{const r=new Map;return[...n].sort((o,u)=>o.first_match_time-u.first_match_time).forEach(o=>{const u=new Date(o.first_match_time*1e3),d=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}-${String(u.getDate()).padStart(2,"0")}`,s=r.get(d)||[];s.push(o),r.set(d,s)}),Array.from(r,([o,u])=>({date:o,series:u}))},Ze=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  align-items: start;
  gap: 16px;
`,et=h.details`
  border: 1px solid ${a.dividerColor};
  border-radius: 3px;
  overflow: hidden;
  > summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: ${a.tableHeaderSurfaceColor};
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeMedium};
    cursor: pointer;
    list-style: none;
    svg:first-child { color: ${a.colorBlue}; width: 18px; height: 18px; }
    svg:last-child { margin-left: auto; width: 18px; height: 18px; }
    &::-webkit-details-marker { display: none; }
  }
  &[open] > summary > svg:last-child { transform: rotate(180deg); }
  summary:focus-visible { outline: 2px solid ${a.primaryLinkColor}; outline-offset: -2px; }
`,tt=h.details`
  border-top: 1px solid ${a.dividerColor};
  > summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
    align-items: stretch;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker { display: none; }
    &:hover { background: ${a.secondarySurfaceColor}; }
    > a, > span.team {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 10px 8px;
      color: ${a.textColorPrimary};
      font-family: ${a.fontFamilyFuturistic};
      font-size: ${a.fontSizeSmall};
      overflow-wrap: anywhere;
    }
    > :last-child { flex-direction: row-reverse; text-align: right; }
    .winner { background: rgba(90, 180, 110, .14); color: ${a.colorGreen}; }
    img, .team-logo { width: 28px; height: 28px; flex-shrink: 0; object-fit: contain; }
  }
`,at=h.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-left: 1px solid ${a.dividerColor};
  border-right: 1px solid ${a.dividerColor};
  font-variant-numeric: tabular-nums;
  strong { font-size: ${a.fontSizeMedium}; }
  small { color: ${a.textColorSecondary}; font-size: ${a.fontSizeTiny}; }
`,rt=h.div`
  padding: 12px;
  background: ${a.secondarySurfaceColor};
  .series-meta { display: block; color: ${a.textColorSecondary}; margin-bottom: 8px; }
  > a { display: block; margin-top: 6px; }
`;function nt({series:n,teams:r}){const o=U(),u=n.reduce((s,l)=>!s||l.first_match_time>s.first_match_time?l:s,void 0),d=(s,l,c)=>{const p=e.createElement(e.Fragment,null,e.createElement("span",null,l||o.general_unknown),e.createElement(J,{teamId:s,src:r.find(y=>y.team_id===s)?.logo_url,style:{width:28,height:28,flexShrink:0,objectFit:"contain"}}));return s?e.createElement(I,{className:c?"winner":void 0,to:`/teams/${s}`},p):e.createElement("span",{className:`team ${c?"winner":""}`},p)};return e.createElement(Ze,null,Xe(n).map(({date:s,series:l})=>e.createElement(et,{key:s,open:!0},e.createElement("summary",null,e.createElement(Y,{"aria-hidden":"true"}),e.createElement("time",{dateTime:s},new Date(`${s}T12:00:00`).toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"})),e.createElement(Ce,{"aria-hidden":"true"})),l.map(c=>{const p=c.series_type,y=typeof p=="number"&&Number.isInteger(p)&&p>=0&&p<=2,f=y?`BO${p*2+1}`:o.general_unknown,g=y?p+1:1/0;return e.createElement(tt,{key:c.key,open:c.key===u?.key},e.createElement("summary",{"aria-label":`${c.team1||o.general_unknown} ${c.team1Wins} – ${c.team2Wins} ${c.team2||o.general_unknown}`},d(c.team1Id,c.team1,c.team1Wins>=g),e.createElement(at,{title:o.matches_series_score_tooltip},e.createElement("strong",null,c.team1Wins," – ",c.team2Wins),e.createElement("small",{title:o.esports_format},f," ",e.createElement("span",{"aria-hidden":"true"},"▾"))),d(c.team2Id,c.team2,c.team2Wins>=g)),e.createElement(rt,{className:"series-games"},e.createElement("span",{className:"series-meta"},c.league_name," · ",c.series_id?`#${c.series_id}`:o.esports_standalone_match),e.createElement("span",{className:"series-meta"},o.esports_format,": ",f),c.games.map((m,x)=>e.createElement(V,{key:m.match_id,to:`/matches/${m.match_id}`},o.matches_game," ",x+1," · ",m.match_id))))}))))}function P(n){const[r,o]=_.useState({path:n,data:[],loading:!!n,error:!1}),[u,d]=_.useState(0);return _.useEffect(()=>{if(!n)return;const s=new AbortController;return o({path:n,data:[],loading:!0,error:!1}),fetch(`${we.VITE_API_HOST}/api/${n}`,{credentials:"include",signal:s.signal}).then(l=>{if(!l.ok)throw new Error(String(l.status));return l.json()}).then(l=>{if(!Array.isArray(l))throw new Error("Expected a list");s.signal.aborted||o({path:n,data:l,loading:!1,error:!1})}).catch(()=>{s.signal.aborted||o({path:n,data:[],loading:!1,error:!0})}),()=>s.abort()},[n,u]),{...r.path===n?r:{data:[],loading:!!n,error:!1},retry:()=>d(s=>s+1)}}const ot=h.div`
  padding-bottom: 24px;
  font-family: ${a.fontFamily};
  font-size: ${a.fontSizeSmall};
  color: ${a.textColorPrimary};

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeCommon};
    font-weight: ${a.fontWeightNormal};
    line-height: 1.6;
    svg { width: 20px; height: 20px; flex-shrink: 0; }
  }

  p {
    color: ${a.textColorSecondary};
    font-size: ${a.fontSizeSmall};
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .MuiInputBase-root, .MuiInputLabel-root, .MuiButton-root {
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeSmall};
  }
`,lt=h.div`
  margin-bottom: 16px;
  border-bottom: 1px solid ${a.dividerColor};
`,st=h.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  padding-top: 8px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 0;
    border-bottom: 2px solid transparent;
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeSmall};
    color: ${a.textColorSecondary};
    svg { width: 16px; height: 16px; }
  }

  a:hover, a[aria-current="page"] {
    color: ${a.primaryLinkColor};
    border-bottom-color: ${a.primaryLinkColor};
    text-decoration: none;
  }

  a:focus-visible { outline: 2px solid ${a.primaryLinkColor}; outline-offset: 3px; }
  a[href="/esports/tournaments"] svg { color: ${a.colorGolden}; }
  a[href="/teams"] svg { color: ${a.colorGreen}; }
  a[href="/esports/players"] svg { color: ${a.colorBlue}; }
`,it=h.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  @media (max-width: ${a.wrapTablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
`,S=h.section`
  min-width: 0;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${a.dividerColor};
  border-radius: 3px;
  background: ${a.primarySurfaceColor};
  @media (max-width: ${a.wrapMobile}) { padding: 12px; }
`,ct=h.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  a {
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeSmall};
    color: ${a.primaryLinkColor};
  }
`,mt=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 12px;
`,dt=h(I)`
  display: block;
  padding: 14px;
  border: 1px solid ${a.dividerColor};
  border-left: 3px solid ${a.colorGolden};
  border-radius: 3px;
  background: rgba(100, 160, 210, 0.08);
  color: ${a.textColorPrimary};
  transition: border-color 150ms ease;

  &:hover {
    border-color: ${a.colorGolden};
    color: ${a.textColorPrimary};
    text-decoration: none;
  }
  &:focus-visible { outline: 2px solid ${a.primaryLinkColor}; outline-offset: 3px; }
  > svg { width: 20px; height: 20px; color: ${a.colorGolden}; }
  strong {
    display: block;
    margin: 8px 0;
    font-family: ${a.fontFamilyFuturistic};
    font-size: ${a.fontSizeMedium};
    font-weight: ${a.fontWeightNormal};
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  small {
    display: block;
    font-size: ${a.fontSizeSmall};
    color: ${a.textColorSecondary};
    margin-top: 10px;
  }
`,pt=h.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border: 1px solid ${a.dividerColor};
  border-radius: 3px;
  font-family: ${a.fontFamilyFuturistic};
  font-size: ${a.fontSizeSmall};
  color: ${({$premium:n})=>n?a.colorGolden:a.colorBlue};
  svg { width: 12px; height: 12px; }
`,me=h.span`
  color: ${({$positive:n})=>n?a.colorGreen:a.colorBlue};
  font-variant-numeric: tabular-nums;
`,W=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; }
  > svg { width: 24px; height: 24px; color: ${a.colorGreen}; flex-shrink: 0; }
`,ut=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid ${a.dividerColor};
    border-radius: 3px;
  }
  svg { width: 18px; height: 18px; color: ${a.colorBlue}; }
  strong { color: ${a.colorGolden}; font-size: ${a.fontSizeCommon}; }
  span { color: ${a.textColorSecondary}; }
`,gt=h.div`
  position: relative;
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid ${a.dividerColor};
  border-radius: 4px;
  background-color: ${a.almostBlack};
  background-image: linear-gradient(90deg, rgba(5, 10, 20, .9), rgba(5, 10, 20, .25)), url("/assets/images/esports-arena.jpg");
  background-size: cover;
  background-position: center 46%;

  .top-heading {
    position: relative;
    width: auto;
    min-height: 240px;
    margin: 0;
    left: auto;
    right: auto;
    padding: 32px 28px;
    justify-content: center;
    background: transparent;
    box-sizing: border-box;
  }
  .title { color: #fff; }
  .subtitle { max-width: 560px; margin: 10px 0 0; color: #e2e6ed; line-height: 1.7; }
  @media (max-width: ${a.wrapMobile}) {
    .top-heading { min-height: 200px; padding: 24px 16px 40px; }
  }
`,de=["premium","professional","amateur","excluded","unknown"],O=n=>{const r=de.indexOf(n);return r===-1?de.length:r},F=({resource:n,empty:r})=>{const o=U();return n.loading?e.createElement("p",{role:"status"},o.esports_loading):n.error?e.createElement("div",{role:"alert"},e.createElement("p",null,o.esports_error),e.createElement(Le,{onClick:n.retry},o.esports_retry)):r?e.createElement("p",null,o.esports_empty):null};function ft({match:n}){const r=U(),[o,u]=_.useState(""),[d,s]=_.useState("all"),{leagueId:l,view:c}=n.params,p=c==="tournaments",y=c==="players",f=P("leagues"),g=P("teams"),m=P(l?null:"proMatches"),x=_.useMemo(()=>{const t=new Map;return m.data.forEach(i=>{const z=t.get(i.leagueid)||[];z.push(i),t.set(i.leagueid,z)}),f.data.map(i=>({...i,tier:i.tier||"unknown",matches:(t.get(i.leagueid)||[]).map(z=>({...z,league_name:i.name}))}))},[f.data,m.data]),L=_.useMemo(()=>x.flatMap(t=>t.matches),[x]),k=P(y?"proPlayers":null),j=P(l||p||y?null:"heroStats"),E=P(l?`leagues/${l}/matches`:null),b=f.data.find(t=>String(t.leagueid)===l),H=o.trim().toLowerCase(),D=_.useMemo(()=>[...new Set(x.map(t=>t.tier))].sort((t,i)=>O(t)-O(i)||t.localeCompare(i)),[x]),R=_.useMemo(()=>{const t=new Map;return L.forEach(i=>{const z=t.get(i.leagueid);t.set(i.leagueid,{count:(z?.count||0)+1,latest:Math.max(z?.latest||0,i.start_time)})}),t},[L]),N=_.useMemo(()=>x.map(t=>({...t,latest:R.get(t.leagueid)?.latest||0})).filter(t=>(d==="all"||t.tier===d)&&t.name.toLowerCase().includes(H)).sort((t,i)=>i.latest-t.latest||O(t.tier)-O(i.tier)||i.leagueid-t.leagueid),[x,R,H,d]),v=N.filter(t=>R.has(t.leagueid)).slice(0,6),B=_.useMemo(()=>E.data.map(t=>({...t,league_name:b?.name||"",radiant_name:t.radiant_team_name||t.radiant_name||g.data.find(i=>i.team_id===t.radiant_team_id)?.name||null,dire_name:t.dire_team_name||t.dire_name||g.data.find(i=>i.team_id===t.dire_team_id)?.name||null})),[E.data,b?.name,g.data]),C=ze(l?B:L),K=C.filter(t=>[t.league_name,t.team1,t.team2].some(i=>i?.toLowerCase().includes(H))),Q=[...g.data].filter(t=>t.last_match_time>Date.now()/1e3-180*86400).sort((t,i)=>i.rating-t.rating).slice(0,10),X=[...j.data].sort((t,i)=>i.pro_pick+i.pro_ban-(t.pro_pick+t.pro_ban)).slice(0,10),Z=k.data.filter(t=>[t.name,t.personaname,t.team_name].some(i=>i?.toLowerCase().includes(H))),pe={[r.esports_tournaments]:e.createElement(M,{style:{color:a.colorGolden}}),[r.esports_recent_tournaments]:e.createElement(M,{style:{color:a.colorGolden}}),[r.esports_tournament_details]:e.createElement(M,{style:{color:a.colorGolden}}),[r.esports_players]:e.createElement(Fe,{style:{color:a.colorBlue}}),[r.esports_top_teams]:e.createElement(ne,{style:{color:a.colorGreen}}),[r.esports_contested_heroes]:e.createElement(Ue,{style:{color:a.colorGolden}})},ee=t=>{switch(t){case"premium":return r.tier_premium;case"professional":return r.tier_professional;case"amateur":return r.esports_amateur;case"excluded":return r.esports_excluded;case"unknown":case null:return r.general_unknown;default:return t.charAt(0).toUpperCase()+t.slice(1)}},te=t=>{switch(t){case"premium":return a.colorGolden;case"professional":return a.colorBlue;case"amateur":return a.colorGreen;default:return a.textColorSecondary}},q=t=>e.createElement(pt,{$premium:t==="premium",style:{color:te(t)}},e.createElement(M,{"aria-hidden":"true"}),ee(t)),w=(t,i)=>e.createElement(ct,null,e.createElement("h2",null,pe[t]||e.createElement(ce,{style:{color:a.colorBlue}}),t),i&&e.createElement(I,{to:i},r.esports_view_all," →")),ue=new Set(B.flatMap(t=>[t.radiant_team_id,t.dire_team_id].filter(i=>!!i))).size,ge=[{field:"name",displayName:r.esports_tournaments,displayFn:t=>e.createElement(W,null,e.createElement(M,{"aria-hidden":"true",style:{color:te(t.tier)}}),e.createElement(V,{to:`/esports/leagues/${t.leagueid}`},t.name))},{field:"tier",displayName:r.esports_tier,displayFn:t=>q(t.tier)},{field:"leagueid",displayName:r.th_league,sortFn:!0},{field:"latest",displayName:r.esports_latest_match,sortFn:!0,displayFn:t=>t.latest?e.createElement(oe,{timestamp:t.latest}):"—"}],ae=t=>{const i=f.data.find(z=>z.leagueid===t.leagueid);return e.createElement(Ye,{name:t.league_name,banner:i?.banner,ticket:i?.ticket})},he=[{field:"name",displayName:r.esports_players,displayFn:t=>e.createElement(W,null,e.createElement("img",{src:t.avatar,alt:"",loading:"lazy"}),e.createElement(V,{to:`/players/${t.account_id}`},t.name||t.personaname||t.account_id))},{field:"team_name",displayName:r.th_team_name,sortFn:!0}],fe=e.createElement(Me,{title:l?b?.name||r.esports_tournament_details:r.esports_title,subtitle:l?r.esports_league_description:r.esports_description,icon:e.createElement(M,null),className:"top-heading"});return e.createElement(ot,null,e.createElement(Be,{title:b?.name||r.esports_title}),e.createElement(gt,null,fe),e.createElement(lt,null,e.createElement(st,{"aria-label":r.esports_title},e.createElement(I,{to:"/esports","aria-current":!c&&!l?"page":void 0},e.createElement(ie,null),r.esports_overview),e.createElement(I,{to:"/esports/tournaments","aria-current":p?"page":void 0},e.createElement(M,null),r.esports_tournaments))),e.createElement(Oe,{"aria-label":r.esports_title,sx:{mb:2,fontSize:a.fontSizeSmall,fontFamily:a.fontFamilyFuturistic}},e.createElement(I,{to:"/esports"},r.esports_title),l&&e.createElement(I,{to:"/esports/tournaments"},r.esports_tournaments),e.createElement("span",{"aria-current":"page"},l?b?.name.trim()||l:p?r.esports_tournaments:y?r.esports_players:r.esports_overview)),(p||y||!l)&&e.createElement(S,null,e.createElement(le,{fullWidth:!0,label:y?r.esports_search_players:r.esports_search,value:o,onChange:t=>u(t.target.value),size:"small"})),l?e.createElement(e.Fragment,null,e.createElement(S,null,w(r.esports_tournament_details,"/esports/tournaments"),e.createElement(F,{resource:f,empty:!b}),b&&e.createElement(Qe,{key:b.leagueid,league:b,tier:q(b.tier),games:B,teams:g.data,historyReady:!E.loading&&!E.error}),e.createElement("p",null,r.esports_league_coverage),!E.loading&&!E.error&&e.createElement(ut,null,e.createElement("div",null,e.createElement(ce,null),e.createElement("strong",null,C.length),e.createElement("span",null,r.matches_series)),e.createElement("div",null,e.createElement(ie,null),e.createElement("strong",null,B.length),e.createElement("span",null,r.th_matches)),e.createElement("div",null,e.createElement(ne,null),e.createElement("strong",null,ue),e.createElement("span",null,r.header_teams)))),e.createElement(S,null,w(r.matches_series),e.createElement(F,{resource:E,empty:!C.length}),e.createElement("p",null,r.esports_schedule_hint),!E.loading&&e.createElement(nt,{key:l,series:C,teams:g.data})),e.createElement(S,null,w(r.th_matches),e.createElement(F,{resource:E,empty:!C.length}),e.createElement(G,{key:l,data:C,columns:se(r,g.data,t=>`/esports/leagues/${t.leagueid}`,ae),loading:E.loading,paginated:!0,keyFn:t=>t.key}))):p?e.createElement(S,null,w(r.esports_tournaments),e.createElement("p",null,r.esports_directory_description),e.createElement(le,{select:!0,SelectProps:{native:!0},label:r.esports_tier,value:d,onChange:t=>s(t.target.value),size:"small",style:{marginBottom:20}},e.createElement("option",{value:"all"},r.esports_all_tiers),D.map(t=>e.createElement("option",{key:t,value:t},ee(t)))),e.createElement(F,{resource:f,empty:!N.length}),e.createElement(G,{key:`${o}:${d}`,data:N,columns:ge,loading:f.loading,paginated:!0,keyFn:t=>t.leagueid})):y?e.createElement(S,null,w(r.esports_players),e.createElement(F,{resource:k,empty:!Z.length}),e.createElement(G,{key:o,data:Z,columns:he,loading:k.loading,paginated:!0,keyFn:t=>t.account_id})):e.createElement(e.Fragment,null,e.createElement(S,null,w(r.esports_recent_tournaments,"/esports/tournaments"),e.createElement("p",null,r.esports_recent_coverage),e.createElement(F,{resource:f.error?f:m,empty:!v.length}),e.createElement(mt,null,v.map(t=>e.createElement(dt,{key:t.leagueid,to:`/esports/leagues/${t.leagueid}`},e.createElement(M,{"aria-hidden":"true"}),e.createElement("strong",null,t.name),q(t.tier),e.createElement("small",null,e.createElement(oe,{timestamp:t.latest})))))),e.createElement(S,null,w(r.esports_recent_series,"/matches/series"),e.createElement(F,{resource:m,empty:!K.length}),e.createElement(G,{data:K.slice(0,12),columns:se(r,g.data,t=>`/esports/leagues/${t.leagueid}`,ae),loading:m.loading,keyFn:t=>t.key})),e.createElement(it,null,e.createElement(S,null,w(r.esports_top_teams,"/teams"),e.createElement("p",null,r.esports_team_coverage),e.createElement(F,{resource:g,empty:!Q.length}),e.createElement(G,{data:Q,loading:g.loading,columns:[{field:"name",displayName:r.th_team_name,displayFn:t=>e.createElement(W,null,e.createElement(J,{teamId:t.team_id,src:t.logo_url}),e.createElement(V,{to:`/teams/${t.team_id}`},t.name))},{field:"rating",displayName:r.th_rating,displayFn:t=>e.createElement(me,null,Math.round(t.rating))}]})),e.createElement(S,null,w(r.esports_contested_heroes,"/heroes"),e.createElement("p",null,r.esports_meta_coverage),e.createElement(F,{resource:j,empty:!X.length}),e.createElement(G,{data:X,loading:j.loading,columns:[{field:"localized_name",displayName:r.th_heroes,displayFn:t=>e.createElement(W,null,e.createElement(Ie,{id:String(t.id)}),e.createElement(V,{to:`/heroes/${t.id}`},t.localized_name))},{field:"contested",displayName:r.esports_picks_bans,displayFn:t=>t.pro_pick+t.pro_ban},{field:"winrate",displayName:r.th_winrate,displayFn:t=>e.createElement(me,{$positive:t.pro_pick>0&&t.pro_win/t.pro_pick>=.5},t.pro_pick?`${Math.round(t.pro_win/t.pro_pick*100)}%`:"—")}]})))))}export{ft as default};
