import{c as D,j as w,s as R,B as we,m as ve,e as re,g as $e,a as Se,r as f,u as ke,b as Ce,d as ze,f as Fe,T as Me,h as T,R as e,i as n,L as N,k as q,l as y,n as Be,H as de,o as ue,p as A,A as Ie,q as ge,t as fe,E as Ne,G as ne,P as je,F as le,v as Le,w as Te,S as oe,x as se,y as W}from"./index-DaGqnici.js";const Pe=D(w.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),Ge=R(we,{name:"MuiBreadcrumbCollapsed"})(ve(({theme:a})=>({display:"flex",marginLeft:`calc(${a.spacing(1)} * 0.5)`,marginRight:`calc(${a.spacing(1)} * 0.5)`,...a.palette.mode==="light"?{backgroundColor:a.palette.grey[100],color:a.palette.grey[700]}:{backgroundColor:a.palette.grey[700],color:a.palette.grey[100]},borderRadius:2,"&:hover, &:focus":{...a.palette.mode==="light"?{backgroundColor:a.palette.grey[200]}:{backgroundColor:a.palette.grey[600]}},"&:active":{boxShadow:a.shadows[0],...a.palette.mode==="light"?{backgroundColor:re(a.palette.grey[200],.12)}:{backgroundColor:re(a.palette.grey[600],.12)}}}))),He=R(Pe)({width:24,height:16});function Ae(a){const{slots:r={},slotProps:s={},...c}=a,l=a;return w.jsx("li",{children:w.jsx(Ge,{focusRipple:!0,...c,ownerState:l,children:w.jsx(He,{as:r.CollapsedIcon,ownerState:l,...s.collapsedIcon})})})}function De(a){return $e("MuiBreadcrumbs",a)}const Re=Se("MuiBreadcrumbs",["root","ol","li","separator"]),Ve=a=>{const{classes:r}=a;return Fe({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},De,r)},We=R(Me,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(a,r)=>[{[`& .${Re.li}`]:r.li},r.root]})({}),Oe=R("ol",{name:"MuiBreadcrumbs",slot:"Ol"})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),Ue=R("li",{name:"MuiBreadcrumbs",slot:"Separator"})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function qe(a,r,s,c){return a.reduce((l,i,o)=>(o<a.length-1?l=l.concat(i,w.jsx(Ue,{"aria-hidden":!0,className:r,ownerState:c,children:s},`separator-${o}`)):l.push(i),l),[])}const Ye=f.forwardRef(function(r,s){const c=ke({props:r,name:"MuiBreadcrumbs"}),{children:l,className:i,component:o="nav",slots:E={},slotProps:u={},expandText:h="Show path",itemsAfterCollapse:g=1,itemsBeforeCollapse:d=1,maxItems:p=8,separator:x="/",...S}=c,[$,k]=f.useState(!1),_={...c,component:o,expanded:$,expandText:h,itemsAfterCollapse:g,itemsBeforeCollapse:d,maxItems:p,separator:x},b=Ve(_),P=Ce({elementType:E.CollapsedIcon,externalSlotProps:u.collapsedIcon,ownerState:_}),V=f.useRef(null),H=v=>{const z=()=>{k(!0);const B=V.current.querySelector("a[href],button,[tabindex]");B&&B.focus()};return d+g>=v.length?v:[...v.slice(0,d),w.jsx(Ae,{"aria-label":h,slots:{CollapsedIcon:E.CollapsedIcon},slotProps:{collapsedIcon:P},onClick:z},"ellipsis"),...v.slice(v.length-g,v.length)]},j=f.Children.toArray(l).filter(v=>f.isValidElement(v)).map((v,z)=>w.jsx("li",{className:b.li,children:v},`child-${z}`));return w.jsx(We,{ref:s,component:o,color:"textSecondary",className:ze(b.root,i),ownerState:_,...S,children:w.jsx(Oe,{className:b.ol,ref:V,ownerState:_,children:qe($||p&&j.length<=p?j:H(j),b.separator,x,_)})})}),I=D(w.jsx("path",{d:"M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2M5 8V7h2v3.82C5.84 10.4 5 9.3 5 8m14 0c0 1.3-.84 2.4-2 2.82V7h2z"})),ie=D(w.jsx("path",{d:"M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"})),Je=D([w.jsx("path",{d:"M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2"},"0"),w.jsx("path",{d:"m15 9 .94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11 4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"},"1")]),K=D(w.jsx("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"})),Ke=y.div`
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid color-mix(in srgb, ${n.secondarySurfaceColor} 60%, #6299ba);
  border-radius: 6px;
  background: linear-gradient(120deg, color-mix(in srgb, ${n.secondarySurfaceColor} 65%, #17395c), color-mix(in srgb, ${n.secondarySurfaceColor} 80%, #17395c));
  font-family: ${n.fontFamilyFuturistic};
  .tournament-art {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 160px;
    padding: 16px;
    border: 1px solid color-mix(in srgb, ${n.secondarySurfaceColor} 60%, #6299ba);
    border-radius: 4px;
    background: color-mix(in srgb, ${n.primarySurfaceColor} 85%, #38596d);
    color: ${n.textColorSecondary};
    font-size: 12px;
    text-align: center;
    img { width: 100%; max-height: 180px; object-fit: contain; }
    svg { width: 48px; height: 48px; color: ${n.colorGolden}; }
  }
  .tournament-info { min-width: 0; }
  h2 { margin: 0 0 10px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.2; overflow-wrap: anywhere; }
  dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 20px 0 0; padding-top: 18px; border-top: 0; }
  dl > div { min-width: 0; }
  dt { color: ${n.textColorSecondary}; font-size: 11px; line-height: 1.5; margin-bottom: 6px; }
  dd { margin: 0; overflow-wrap: anywhere; color: ${n.textColorPrimary}; font-size: 14px; font-variant-numeric: tabular-nums; }
  dd svg { width: 15px; height: 15px; vertical-align: middle; margin-right: 6px; color: ${n.colorBlue}; }
  .league-id { color: ${n.colorGolden}; }
  @media (max-width: ${n.wrapMobile}) {
    padding: 18px;
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 16px;
    .tournament-art { min-height: 100px; padding: 10px; align-self: start; }
    .tournament-art svg { width: 32px; height: 32px; }
    dl { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  }
  @media (max-width: 420px) { grid-template-columns: minmax(0, 1fr); .tournament-art { max-width: 140px; } }

`,Qe=y.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr));
  gap: 10px;
  margin-bottom: 24px;
  font-family: ${n.fontFamilyFuturistic};
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    min-width: 0;
    border: 1px solid color-mix(in srgb, ${n.secondarySurfaceColor} 60%, #6299ba);
    border-radius: 4px;
    background: color-mix(in srgb, ${n.secondarySurfaceColor} 75%, #17395c);
    color: ${n.textColorPrimary};
    font-size: 13px;
    transition: background .15s, border-color .15s;
    &:hover { background: color-mix(in srgb, ${n.secondarySurfaceColor} 65%, #244d75); border-color: ${n.colorBlue}; }
    &:focus-visible { outline: 2px solid ${n.colorBlue}; outline-offset: 3px; }
    span { overflow-wrap: anywhere; }
  }
  img, svg { width: 30px; height: 30px; flex-shrink: 0; object-fit: contain; }

`;function Xe({league:a,tier:r,games:s,teams:c,historyReady:l}){const i=T(),[o,E]=f.useState(""),u=[a.banner,a.ticket].find(p=>p&&/^https?:\/\//.test(p))||"",h=s.map(p=>p.start_time),g=p=>new Date(p*1e3).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),d=new Map;return s.forEach(p=>{for(const[x,S]of[[p.radiant_team_id,p.radiant_name],[p.dire_team_id,p.dire_name]]){if(!x||d.has(x))continue;const $=c.find(k=>k.team_id===x);d.set(x,{name:S||$?.name||i.general_unknown,logo_url:$?.logo_url||""})}}),e.createElement(e.Fragment,null,e.createElement(Ke,null,e.createElement("div",{className:"tournament-art"},u&&o!==u?e.createElement("img",{src:u,alt:a.name,onError:()=>E(u)}):e.createElement("img",{src:"/assets/tournament-placeholder.svg",alt:i.esports_no_artwork})),e.createElement("div",{className:"tournament-info"},e.createElement("h2",null,a.name),r,e.createElement("dl",null,e.createElement("div",null,e.createElement("dt",null,i.th_league),e.createElement("dd",{className:"league-id"},"#",a.leagueid)),l&&h.length>0&&e.createElement(e.Fragment,null,e.createElement("div",null,e.createElement("dt",null,i.esports_first_recorded_match),e.createElement("dd",null,e.createElement(K,{"aria-hidden":"true"}),g(Math.min(...h)))),e.createElement("div",null,e.createElement("dt",null,i.esports_last_recorded_match),e.createElement("dd",null,e.createElement(K,{"aria-hidden":"true"}),g(Math.max(...h)))))))),l&&d.size>0&&e.createElement(e.Fragment,null,e.createElement("h2",{style:{marginBottom:14,fontFamily:n.fontFamilyFuturistic,fontSize:16}},i.esports_participating_teams),e.createElement(Qe,null,Array.from(d,([p,x])=>e.createElement(N,{key:p,to:`/teams/${p}`},e.createElement(q,{teamId:p,src:x.logo_url}),e.createElement("span",null,x.name))))))}const J=new Map;function Ze(a){let r=J.get(a);return r||(r=fetch(`${ue.VITE_API_HOST}/api/matches/${a}`,{credentials:"include"}).then(async s=>{if(!s.ok)throw new Error(String(s.status));return(await s.json()).players||[]}).catch(s=>{throw J.delete(a),s}),J.set(a,r)),r}function et({game:a,teams:r}){const s=a.match_id,c=T(),[l,i]=f.useState(null),[o,E]=f.useState(!1);return f.useEffect(()=>{let u=!0;return i(null),E(!1),Ze(s).then(h=>{u&&i(h)}).catch(()=>{u&&E(!0)}),()=>{u=!1}},[s]),e.createElement("span",{className:"game-heroes","aria-busy":!l&&!o},[{id:a.radiant_team_id,name:a.radiant_name,won:a.radiant_win===!0},{id:a.dire_team_id,name:a.dire_name,won:a.radiant_win===!1}].map((u,h)=>e.createElement("span",{className:"hero-lineup",key:h},e.createElement("span",{className:`game-team${u.won?" game-winner":""}`},e.createElement(q,{teamId:u.id,src:r.find(g=>g.team_id===u.id)?.logo_url,style:{width:22,height:22,flexShrink:0,objectFit:"contain"}}),e.createElement("span",null,u.name||c.general_unknown),u.won&&e.createElement("small",{className:"winner-label",title:c.th_winner},"✓ ",c.th_winner)),e.createElement("span",{className:"hero-portraits"},l?l.filter(g=>g.player_slot<128==(h===0)).sort((g,d)=>g.player_slot-d.player_slot).map(g=>{const d=Be[g.hero_id];return d?e.createElement(de,{key:g.player_slot,id:String(g.hero_id),alt:d.localized_name,heroImageEventProps:{title:d.localized_name}}):null}):o?e.createElement("small",null,c.general_unknown):Array.from({length:5},(g,d)=>e.createElement("span",{className:"hero-placeholder",key:d}))))))}const tt=y.div`
  padding: 14px;
  font-family: ${n.fontFamilyFuturistic};
  border-top: 1px solid rgba(53, 217, 204, .3);
  background: linear-gradient(135deg, #0b2428, #091519);
  .series-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px 12px;
    margin-bottom: 12px;
    color: #c3dbdc;
    font-size: 12px;
    line-height: 1.5;
    > span:last-child { color: #8ba9ac; font-variant-numeric: tabular-nums; }
  }
  .game-links {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    > a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid rgba(53, 217, 204, .25);
      border-radius: 3px;
      background: rgba(53, 217, 204, .05);
      color: #edffff;
      text-decoration: none;
      transition: background .15s, border-color .15s;
      &:hover { background: rgba(53, 217, 204, .14); border-color: #35d9cc; }
      &:focus-visible { outline: 2px solid #71fff0; outline-offset: 2px; }
      > .game-preview { display: grid; gap: 10px; min-width: 0; flex: 1; }
      .game-heading { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; }
      .game-team { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 12px; }
      .game-team, .game-team > span { font-family: ${n.fontFamilyFuturistic}; }
      .game-team > span { overflow-wrap: anywhere; }
      .game-team small { margin-left: auto; flex-shrink: 0; }
      .game-winner { color: #71fff0; }
      .game-team .winner-label { margin-left: 0; color: #75d890; }
      .game-heroes { display: grid; gap: 12px; }
      .hero-lineup { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; }
      .hero-lineup > .game-team { order: 1; justify-content: flex-end; text-align: right; }
      .hero-portraits { display: flex; gap: 4px; min-width: 0; }
      .hero-portraits img, .hero-placeholder { width: clamp(28px, 3vw, 44px); aspect-ratio: 16 / 9; object-fit: cover; border-radius: 2px; }
      .hero-placeholder { background: rgba(169, 194, 197, .12); }
      .game-info { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11px; color: #a9c2c5; }
      .game-duration { display: inline-flex; align-items: center; gap: 5px; color: #73bfff; }
      .game-duration svg { width: 14px; height: 14px; }
      .game-info time { margin-left: auto; color: #73bfff; }
      strong { font-size: 12px; color: #71fff0; }
      small { font-size: 11px; color: #a9c2c5; overflow-wrap: anywhere; }
      > svg { margin-left: auto; flex-shrink: 0; }
    }
  }
`;function at({series:a,teams:r,expanded:s}){const c=T();return e.createElement(tt,{className:"series-games"},e.createElement("div",{className:"series-meta"},e.createElement("span",null,a.league_name),e.createElement("span",null,a.series_id?`#${a.series_id}`:c.esports_standalone_match)),e.createElement("div",{className:"game-links"},a.games.map((l,i)=>e.createElement(A,{key:l.match_id,to:`/matches/${l.match_id}`},e.createElement("span",{className:"game-preview"},e.createElement("span",{className:"game-heading"},e.createElement("strong",null,c.matches_game," ",i+1),e.createElement("small",null,"#",l.match_id)),s&&e.createElement(et,{game:l,teams:r}),e.createElement("span",{className:"game-info"},e.createElement("span",{className:"game-duration",title:c.heading_duration,"aria-label":`${c.heading_duration}: ${Math.floor(l.duration/60)}:${String(Math.floor(l.duration%60)).padStart(2,"0")}`},e.createElement(Ie,{"aria-hidden":"true"}),Math.floor(l.duration/60),":",String(Math.floor(l.duration%60)).padStart(2,"0")),e.createElement("time",{dateTime:new Date(l.start_time*1e3).toISOString()},new Date(l.start_time*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}))))))))}const rt=y.details`
  margin-top: 8px;
  border: 1px solid #35d9cc;
  background: linear-gradient(180deg, #06302f 0%, #061719 55%, #050e12 100%);
  box-shadow: 0 4px 18px rgba(0, 0, 0, .22), inset 0 1px 0 rgba(53, 217, 204, .12);
  color: #f4ffff;
  > summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 94px minmax(0, 1fr);
    align-items: stretch;
    min-height: 76px;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker { display: none; }
    &:hover { background: rgba(53, 217, 204, .07); }
    &:focus-visible { outline: 2px solid #71fff0; outline-offset: 4px; }
    > a, > span.team {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 12px;
      color: #f4ffff;
      font-family: ${n.fontFamilyFuturistic};
      font-size: clamp(13px, 1.2vw, 17px);
      line-height: 1.2;
      text-align: right;
      text-transform: uppercase;
      overflow-wrap: anywhere;
      min-width: 0;
    }
    > .opponent { flex-direction: row-reverse; text-align: left; }
    .winner { color: #71fff0; }
    img, .team-logo { width: 40px; height: 40px; flex-shrink: 0; object-fit: contain; }
    a:focus-visible { outline: 2px solid #71fff0; outline-offset: -4px; }
  }
  @media (max-width: 680px) {
    > summary {
      grid-template-columns: minmax(0, 1fr) 90px minmax(0, 1fr);
      min-height: 72px;
      > a, > span.team { gap: 8px; padding: 10px 8px; font-size: 13px; }
      img, .team-logo { width: 40px; height: 40px; }
    }
  }
  @media (max-width: 420px) {
    > summary > a, > summary > span.team { flex-direction: column-reverse; justify-content: center; text-align: center; }
  }
`,nt=y.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-variant-numeric: tabular-nums;
  font-family: ${n.fontFamilyFuturistic};
  strong { font-size: 24px; font-weight: 600; line-height: 1; white-space: nowrap; }
  small {
    border: 1px solid rgba(240, 198, 108, .25);
    padding: 3px 6px;
    border-radius: 3px;
    background: rgba(240, 198, 108, .07);
    color: #c4b38f;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .3px;
    line-height: 1.2;
    white-space: nowrap;
  }
  @media (max-width: 680px) {
    strong { font-size: 24px; }
    small { font-size: 10px; padding: 3px 6px; }
  }
`,lt=y.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px 0;
  color: #8ba9ac;
  font-family: ${n.fontFamilyFuturistic};
  font-size: 12px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  time { color: #8ba9ac; }
  time { margin-left: auto; }
`;function he({series:a,teams:r,defaultOpen:s=!1,showMetadata:c=!1}){const l=T(),[i,o]=f.useState(s),E=(p,x,S,$=!1)=>{const k=e.createElement(e.Fragment,null,e.createElement("span",null,x||l.general_unknown),e.createElement(q,{teamId:p,src:r.find(_=>_.team_id===p)?.logo_url,style:{width:"clamp(28px, 3vw, 40px)",height:"clamp(28px, 3vw, 40px)",flexShrink:0,objectFit:"contain"}}));return p?e.createElement(N,{className:`${S?"winner":""}${$?" opponent":""}`,to:`/teams/${p}`},k):e.createElement("span",{className:`team ${S?"winner":""}${$?" opponent":""}`},k)},u=a.series_type,h=typeof u=="number"&&Number.isInteger(u)&&u>=0&&u<=2,g=h?`BEST OF ${u*2+1}`:l.general_unknown,d=h?u+1:1/0;return e.createElement(rt,{key:a.key,open:i,onToggle:p=>{const x=p.currentTarget.open;o(x)}},e.createElement("summary",{"aria-label":`${a.team1||l.general_unknown} ${a.team1Wins} – ${a.team2Wins} ${a.team2||l.general_unknown}`},c&&e.createElement(lt,null,e.createElement("span",null,a.series_id&&a.series_id>0?`${a.league_name||l.general_unknown} #${a.series_id}`:l.esports_standalone_match),e.createElement("time",{dateTime:new Date(a.first_match_time*1e3).toISOString()},new Date(a.first_match_time*1e3).toLocaleString(void 0,{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}))),E(a.team1Id,a.team1,a.team1Wins>=d),e.createElement(nt,{title:l.matches_series_score_tooltip},e.createElement("small",{title:l.esports_format},g," ",e.createElement("span",{"aria-hidden":"true"},"▾")),e.createElement("strong",null,a.team1Wins," : ",a.team2Wins)),E(a.team2Id,a.team2,a.team2Wins>=d,!0)),e.createElement(at,{series:a,teams:r,expanded:i}))}function ot({games:a,teams:r}){const s=T(),[c,l]=f.useState(20),i=ge(a);return e.createElement(e.Fragment,null,i.slice(0,c).map(o=>e.createElement(he,{key:o.key,series:o,teams:r,showMetadata:!0})),c<i.length&&e.createElement(fe,{onClick:()=>l(o=>o+20)},s.general_show," ",Math.min(20,i.length-c)," ",s.matches_series))}const st=(a,r=!1)=>{const s=new Map;return[...a].sort((c,l)=>(r?-1:1)*(c.first_match_time-l.first_match_time)).forEach(c=>{const l=new Date(c.first_match_time*1e3),i=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,o=s.get(i)||[];o.push(c),s.set(i,o)}),Array.from(s,([c,l])=>({date:c,series:l}))},it=y.div`
  display: grid;
  grid-template-columns: ${({$singleColumn:a})=>a?"minmax(0, 1fr)":"repeat(2, minmax(0, 1fr))"};
  align-items: start;
  gap: 16px;
  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,ct=y.details`
  min-width: 0;
  > summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    margin-bottom: 4px;
    border-bottom: 0;
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeMedium};
    cursor: pointer;
    list-style: none;
    svg:first-child { color: ${n.colorBlue}; width: 18px; height: 18px; }
    svg:last-child { margin-left: auto; width: 18px; height: 18px; }
    &::-webkit-details-marker { display: none; }
  }
  &[open] > summary > svg:last-child { transform: rotate(180deg); }
  summary:focus-visible { outline: 2px solid ${n.primaryLinkColor}; outline-offset: -2px; }
`;function ce({series:a,teams:r,singleColumn:s=!1,newestFirst:c=!1}){const l=a.reduce((i,o)=>!i||o.first_match_time>i.first_match_time?o:i,void 0);return e.createElement(it,{$singleColumn:s},st(a,c).map(({date:i,series:o})=>e.createElement(ct,{key:i,open:!0},e.createElement("summary",null,e.createElement(K,{"aria-hidden":"true"}),e.createElement("time",{dateTime:i},new Date(`${i}T12:00:00`).toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"})),e.createElement(Ne,{"aria-hidden":"true"})),o.map(E=>e.createElement(he,{key:E.key,series:E,teams:r,showMetadata:!0,defaultOpen:E.key===l?.key})))))}function G(a){const[r,s]=f.useState({path:a,data:[],loading:!!a,error:!1}),[c,l]=f.useState(0);return f.useEffect(()=>{if(!a)return;const i=new AbortController;return s({path:a,data:[],loading:!0,error:!1}),fetch(`${ue.VITE_API_HOST}/api/${a}`,{credentials:"include",signal:i.signal}).then(o=>{if(!o.ok)throw new Error(String(o.status));return o.json()}).then(o=>{if(!Array.isArray(o))throw new Error("Expected a list");i.signal.aborted||s({path:a,data:o,loading:!1,error:!1})}).catch(()=>{i.signal.aborted||s({path:a,data:[],loading:!1,error:!0})}),()=>i.abort()},[a,c]),{...r.path===a?r:{data:[],loading:!!a,error:!1},retry:()=>l(i=>i+1)}}const mt=y.div`
  padding-bottom: 24px;
  font-family: ${n.fontFamily};
  font-size: ${n.fontSizeSmall};
  color: ${n.textColorPrimary};

  .innerContainer { border: 0; }
  table thead, table th, table td { border: 0 !important; }

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeCommon};
    font-weight: ${n.fontWeightNormal};
    line-height: 1.6;
    svg { width: 20px; height: 20px; flex-shrink: 0; }
  }

  p {
    color: ${n.textColorSecondary};
    font-size: ${n.fontSizeSmall};
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .MuiInputBase-root, .MuiInputLabel-root, .MuiButton-root {
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeSmall};
  }
`,pt=y.div`
  margin-bottom: 16px;
  border-bottom: 0;
`,dt=y.nav`
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
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeSmall};
    color: ${n.textColorSecondary};
    svg { width: 16px; height: 16px; }
  }

  a:hover, a[aria-current="page"] {
    color: ${n.primaryLinkColor};
    border-bottom-color: ${n.primaryLinkColor};
    text-decoration: none;
  }

  a:focus-visible { outline: 2px solid ${n.primaryLinkColor}; outline-offset: 3px; }
  a[href="/esports/tournaments"] svg { color: ${n.colorGolden}; }
  a[href="/teams"] svg { color: ${n.colorGreen}; }
  a[href="/esports/players"] svg { color: ${n.colorBlue}; }
`,ut=y.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  @media (max-width: ${n.wrapTablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
`,C=y.section`
  min-width: 0;
  padding: 16px;
  margin-bottom: 16px;
  border: 0;
  border-radius: 3px;
  background: ${n.primarySurfaceColor};
  @media (max-width: ${n.wrapMobile}) { padding: 12px; }
`,gt=y.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  a {
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeSmall};
    color: ${n.primaryLinkColor};
  }
`,ft=y.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 12px;
`,ht=y(N)`
  display: block;
  padding: 14px;
  border: 0;
  border-left: 3px solid ${n.colorGolden};
  border-radius: 3px;
  background: rgba(100, 160, 210, 0.08);
  color: ${n.textColorPrimary};
  transition: border-color 150ms ease;

  &:hover {
    border-color: ${n.colorGolden};
    color: ${n.textColorPrimary};
    text-decoration: none;
  }
  &:focus-visible { outline: 2px solid ${n.primaryLinkColor}; outline-offset: 3px; }
  > svg { width: 20px; height: 20px; color: ${n.colorGolden}; }
  strong {
    display: block;
    margin: 8px 0;
    font-family: ${n.fontFamilyFuturistic};
    font-size: ${n.fontSizeMedium};
    font-weight: ${n.fontWeightNormal};
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  small {
    display: block;
    font-size: ${n.fontSizeSmall};
    color: ${n.textColorSecondary};
    margin-top: 10px;
  }
`,xt=y.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border: 0;
  border-radius: 3px;
  font-family: ${n.fontFamilyFuturistic};
  font-size: ${n.fontSizeSmall};
  color: ${({$premium:a})=>a?n.colorGolden:n.colorBlue};
  svg { width: 12px; height: 12px; }
`,me=y.span`
  color: ${({$positive:a})=>a?n.colorGreen:n.colorBlue};
  font-variant-numeric: tabular-nums;
`,O=y.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; }
  > svg { width: 24px; height: 24px; color: ${n.colorGreen}; flex-shrink: 0; }
`,yt=y.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 0;
    border-radius: 3px;
    font-family: ${n.fontFamilyFuturistic};
  }
  svg { width: 18px; height: 18px; color: ${n.colorBlue}; }
  strong { color: ${n.colorGolden}; font-size: ${n.fontSizeCommon}; }
  span { color: ${n.textColorSecondary}; }
`,_t=y.div`
  position: relative;
  margin-top: 16px;
  overflow: hidden;
  border: 0;
  border-radius: 4px;
  background-color: ${n.almostBlack};
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
  @media (max-width: ${n.wrapMobile}) {
    .top-heading { min-height: 200px; padding: 24px 16px 40px; }
  }
`,pe=["premium","professional","amateur","excluded","unknown"],U=a=>{const r=pe.indexOf(a);return r===-1?pe.length:r},M=({resource:a,empty:r})=>{const s=T();return a.loading?e.createElement("p",{role:"status"},s.esports_loading):a.error?e.createElement("div",{role:"alert"},e.createElement("p",null,s.esports_error),e.createElement(fe,{onClick:a.retry},s.esports_retry)):r?e.createElement("p",null,s.esports_empty):null};function bt({match:a}){const r=T(),[s,c]=f.useState(""),[l,i]=f.useState("all"),{leagueId:o,view:E}=a.params,u=E==="tournaments",h=E==="players",g=G("leagues"),d=G("teams"),p=G(o?null:"proMatches"),x=f.useMemo(()=>{const t=new Map;return p.data.forEach(m=>{const L=t.get(m.leagueid)||[];L.push(m),t.set(m.leagueid,L)}),g.data.map(m=>({...m,tier:m.tier||"unknown",matches:(t.get(m.leagueid)||[]).map(L=>({...L,league_name:m.name}))}))},[g.data,p.data]),S=f.useMemo(()=>x.flatMap(t=>t.matches),[x]),$=G(h?"proPlayers":null),k=G(o||u||h?null:"heroStats"),_=G(o?`leagues/${o}/matches`:null),b=g.data.find(t=>String(t.leagueid)===o),P=s.trim().toLowerCase(),V=f.useMemo(()=>[...new Set(x.map(t=>t.tier))].sort((t,m)=>U(t)-U(m)||t.localeCompare(m)),[x]),H=f.useMemo(()=>{const t=new Map;return S.forEach(m=>{const L=t.get(m.leagueid);t.set(m.leagueid,{count:(L?.count||0)+1,latest:Math.max(L?.latest||0,m.start_time)})}),t},[S]),j=f.useMemo(()=>x.map(t=>({...t,latest:H.get(t.leagueid)?.latest||0})).filter(t=>(l==="all"||t.tier===l)&&t.name.toLowerCase().includes(P)).sort((t,m)=>m.latest-t.latest||U(t.tier)-U(m.tier)||m.leagueid-t.leagueid),[x,H,P,l]),v=j.filter(t=>H.has(t.leagueid)).slice(0,6),z=f.useMemo(()=>_.data.map(t=>({...t,league_name:b?.name||"",radiant_name:t.radiant_team_name||t.radiant_name||d.data.find(m=>m.team_id===t.radiant_team_id)?.name||null,dire_name:t.dire_team_name||t.dire_name||d.data.find(m=>m.team_id===t.dire_team_id)?.name||null})),[_.data,b?.name,d.data]),B=ge(o?z:S),Q=B.filter(t=>[t.league_name,t.team1,t.team2].some(m=>m?.toLowerCase().includes(P))),X=[...d.data].filter(t=>t.last_match_time>Date.now()/1e3-180*86400).sort((t,m)=>m.rating-t.rating).slice(0,10),Z=[...k.data].sort((t,m)=>m.pro_pick+m.pro_ban-(t.pro_pick+t.pro_ban)).slice(0,10),ee=$.data.filter(t=>[t.name,t.personaname,t.team_name].some(m=>m?.toLowerCase().includes(P))),xe={[r.esports_tournaments]:e.createElement(I,{style:{color:n.colorGolden}}),[r.esports_recent_tournaments]:e.createElement(I,{style:{color:n.colorGolden}}),[r.esports_tournament_details]:e.createElement(I,{style:{color:n.colorGolden}}),[r.esports_players]:e.createElement(je,{style:{color:n.colorBlue}}),[r.esports_top_teams]:e.createElement(ne,{style:{color:n.colorGreen}}),[r.esports_contested_heroes]:e.createElement(Je,{style:{color:n.colorGolden}})},te=t=>{switch(t){case"premium":return r.tier_premium;case"professional":return r.tier_professional;case"amateur":return r.esports_amateur;case"excluded":return r.esports_excluded;case"unknown":case null:return r.general_unknown;default:return t.charAt(0).toUpperCase()+t.slice(1)}},ae=t=>{switch(t){case"premium":return n.colorGolden;case"professional":return n.colorBlue;case"amateur":return n.colorGreen;default:return n.textColorSecondary}},Y=t=>e.createElement(xt,{$premium:t==="premium",style:{color:ae(t)}},e.createElement(I,{"aria-hidden":"true"}),te(t)),F=(t,m)=>e.createElement(gt,null,e.createElement("h2",null,xe[t]||e.createElement(ie,{style:{color:n.colorBlue}}),t),m&&e.createElement(N,{to:m},r.esports_view_all," →")),ye=new Set(z.flatMap(t=>[t.radiant_team_id,t.dire_team_id].filter(m=>!!m))).size,_e=[{field:"name",displayName:r.esports_tournaments,displayFn:t=>e.createElement(O,null,e.createElement(I,{"aria-hidden":"true",style:{color:ae(t.tier)}}),e.createElement(A,{to:`/esports/leagues/${t.leagueid}`},t.name))},{field:"tier",displayName:r.esports_tier,displayFn:t=>Y(t.tier)},{field:"leagueid",displayName:r.th_league,sortFn:!0},{field:"latest",displayName:r.esports_latest_match,sortFn:!0,displayFn:t=>t.latest?e.createElement(le,{timestamp:t.latest}):"—"}],Ee=[{field:"name",displayName:r.esports_players,displayFn:t=>e.createElement(O,null,e.createElement("img",{src:t.avatar,alt:"",loading:"lazy"}),e.createElement(A,{to:`/players/${t.account_id}`},t.name||t.personaname||t.account_id))},{field:"team_name",displayName:r.th_team_name,sortFn:!0}],be=e.createElement(Le,{title:o?b?.name||r.esports_tournament_details:r.esports_title,subtitle:o?r.esports_league_description:r.esports_description,icon:e.createElement(I,null),className:"top-heading"});return e.createElement(mt,null,e.createElement(Te,{title:b?.name||r.esports_title}),e.createElement(_t,null,be),e.createElement(pt,null,e.createElement(dt,{"aria-label":r.esports_title},e.createElement(N,{to:"/esports","aria-current":!E&&!o?"page":void 0},e.createElement(oe,null),r.esports_overview),e.createElement(N,{to:"/esports/tournaments","aria-current":u?"page":void 0},e.createElement(I,null),r.esports_tournaments))),e.createElement(Ye,{"aria-label":r.esports_title,sx:{mb:2,fontSize:n.fontSizeSmall,fontFamily:n.fontFamilyFuturistic}},e.createElement(N,{to:"/esports"},r.esports_title),o&&e.createElement(N,{to:"/esports/tournaments"},r.esports_tournaments),e.createElement("span",{"aria-current":"page"},o?b?.name.trim()||o:u?r.esports_tournaments:h?r.esports_players:r.esports_overview)),(u||h||!o)&&e.createElement(C,null,e.createElement(se,{fullWidth:!0,label:h?r.esports_search_players:r.esports_search,value:s,onChange:t=>c(t.target.value),size:"small"})),o?e.createElement(e.Fragment,null,e.createElement(C,null,F(r.esports_tournament_details,"/esports/tournaments"),e.createElement(M,{resource:g,empty:!b}),b&&e.createElement(Xe,{key:b.leagueid,league:b,tier:Y(b.tier),games:z,teams:d.data,historyReady:!_.loading&&!_.error}),e.createElement("p",null,r.esports_league_coverage),!_.loading&&!_.error&&e.createElement(yt,null,e.createElement("div",null,e.createElement(ie,null),e.createElement("strong",null,B.length),e.createElement("span",null,r.matches_series)),e.createElement("div",null,e.createElement(oe,null),e.createElement("strong",null,z.length),e.createElement("span",null,r.th_matches)),e.createElement("div",null,e.createElement(ne,null),e.createElement("strong",null,ye),e.createElement("span",null,r.header_teams)))),e.createElement(C,null,F(r.matches_series),e.createElement(M,{resource:_,empty:!B.length}),e.createElement("p",null,r.esports_schedule_hint),!_.loading&&e.createElement(ce,{key:o,series:B,teams:d.data})),e.createElement(C,null,F(r.th_matches),e.createElement(M,{resource:_,empty:!B.length}),!_.loading&&!_.error&&e.createElement(ot,{key:o,games:z,teams:d.data}))):u?e.createElement(C,null,F(r.esports_tournaments),e.createElement("p",null,r.esports_directory_description),e.createElement(se,{select:!0,SelectProps:{native:!0},label:r.esports_tier,value:l,onChange:t=>i(t.target.value),size:"small",style:{marginBottom:20}},e.createElement("option",{value:"all"},r.esports_all_tiers),V.map(t=>e.createElement("option",{key:t,value:t},te(t)))),e.createElement(M,{resource:g,empty:!j.length}),e.createElement(W,{key:`${s}:${l}`,data:j,columns:_e,loading:g.loading,paginated:!0,keyFn:t=>t.leagueid})):h?e.createElement(C,null,F(r.esports_players),e.createElement(M,{resource:$,empty:!ee.length}),e.createElement(W,{key:s,data:ee,columns:Ee,loading:$.loading,paginated:!0,keyFn:t=>t.account_id})):e.createElement(e.Fragment,null,e.createElement(C,null,F(r.esports_recent_tournaments,"/esports/tournaments"),e.createElement("p",null,r.esports_recent_coverage),e.createElement(M,{resource:g.error?g:p,empty:!v.length}),e.createElement(ft,null,v.map(t=>e.createElement(ht,{key:t.leagueid,to:`/esports/leagues/${t.leagueid}`},e.createElement(I,{"aria-hidden":"true"}),e.createElement("strong",null,t.name),Y(t.tier),e.createElement("small",null,e.createElement(le,{timestamp:t.latest})))))),e.createElement(C,null,F(r.esports_recent_series,"/matches/series"),e.createElement(M,{resource:p,empty:!Q.length}),!p.loading&&!p.error&&e.createElement(ce,{series:Q.slice(0,12),teams:d.data,singleColumn:!0,newestFirst:!0})),e.createElement(ut,null,e.createElement(C,null,F(r.esports_top_teams,"/teams"),e.createElement("p",null,r.esports_team_coverage),e.createElement(M,{resource:d,empty:!X.length}),e.createElement(W,{data:X,loading:d.loading,columns:[{field:"name",displayName:r.th_team_name,displayFn:t=>e.createElement(O,null,e.createElement(q,{teamId:t.team_id,src:t.logo_url}),e.createElement(A,{to:`/teams/${t.team_id}`},t.name))},{field:"rating",displayName:r.th_rating,displayFn:t=>e.createElement(me,null,Math.round(t.rating))}]})),e.createElement(C,null,F(r.esports_contested_heroes,"/heroes"),e.createElement("p",null,r.esports_meta_coverage),e.createElement(M,{resource:k,empty:!Z.length}),e.createElement(W,{data:Z,loading:k.loading,columns:[{field:"localized_name",displayName:r.th_heroes,displayFn:t=>e.createElement(O,null,e.createElement(de,{id:String(t.id)}),e.createElement(A,{to:`/heroes/${t.id}`},t.localized_name))},{field:"contested",displayName:r.esports_picks_bans,displayFn:t=>t.pro_pick+t.pro_ban},{field:"winrate",displayName:r.th_winrate,displayFn:t=>e.createElement(me,{$positive:t.pro_pick>0&&t.pro_win/t.pro_pick>=.5},t.pro_pick?`${Math.round(t.pro_win/t.pro_pick*100)}%`:"—")}]})))))}export{bt as default};
