(function(){
'use strict';
var reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
var COARSE = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
var NS = 'http://www.w3.org/2000/svg';
function S(tag, attrs, parent){ var e=document.createElementNS(NS,tag); if(attrs){ for(var k in attrs) e.setAttribute(k, attrs[k]); } if(parent) parent.appendChild(e); return e; }
function $(id){ return document.getElementById(id); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function lerp(a,b,t){ return a+(b-a)*t; }
function ease(t){ return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function A(o){ var r={'vector-effect':'non-scaling-stroke'}; for(var j in o) r[j]=o[j]; return r; }

/* ---------- language ---------- */
var lang = 'ko';
try { var saved = localStorage.getItem('nehemiah-lang'); if(saved==='en'||saved==='ko') lang = saved; } catch(err){}
if(location.hash==='#en' || location.hash==='#ko') lang = location.hash.slice(1);
var UI = {
 en:{
  docTitle:'Nehemiah and the Wall',
  eyebrow:'The Book of Nehemiah · New International Version',
  h1:'Nehemiah and the Wall',
  lede:'Follow Nehemiah from the Persian palace at Susa to the broken walls of Jerusalem: where he went, who he met, and what he did. Drag the timeline left and right, or use the arrow keys, and the map follows the story.',
  source:'Built from Nehemiah 1–13 in the NIV, read free on <a href="https://www.biblegateway.com/passage/?search=Nehemiah+1&amp;version=NIV" target="_blank" rel="noopener noreferrer">BibleGateway</a>. Each scene is retold in plain words and links to the full NIV passage.',
  langGroup:'Language',
  mapAria:'Map', regionAria:'Map of the Persian Empire from Susa to Jerusalem', cityAria:'Schematic plan of Jerusalem’s walls and gates',
  tabsAria:'Map view', tabEmpire:'Empire', tabJudah:'Judah', tabCity:'Jerusalem',
  gcClose:'Close gate details',
  whatH:'What happened', peopleH:'People in this scene',
  tlTitle:'Timeline', tlHint:'Drag, scroll, or tap a card', tlAria:'Timeline of Nehemiah. Use the left and right arrow keys to move.', scrubAria:'Scrub through the timeline',
  prev:'Previous scene', next:'Next scene', barAria:'Scene navigation',
  castH:'Who’s who', castP:'Everyone Nehemiah dealt with, friend or foe. Tap a name to highlight their scenes on the timeline, or jump straight to a scene.',
  notesH:'About this map',
  n1h:'The text', n1:'Scenes are retold in plain words from the NIV, with one short phrase quoted (8:10). Use the button on each scene to read the full passage on BibleGateway.',
  n2h:'The dates', n2:'Nehemiah dates events by the reign of Artaxerxes I. His 20th year falls around 445 BC. Month conversions are approximate, and the dates in chapters 11–13 are not given.',
  n3h:'The places', n3:'Coastlines are simplified. The Bible does not name Nehemiah’s route. The Jerusalem plan is a sketch: scholars still debate the exact line of his wall and where each gate stood.',
  scene:'Scene {i} of {n}', note:'Note', noPeople:'No named people in this scene.',
  read:'Read {ref} in the NIV', alt:'Read in Korean (개역개정)',
  keyNeh:'Nehemiah', cityNote:'Schematic plan of Jerusalem in Nehemiah’s day.',
  filter1:'Showing {name} · 1 scene', filter:'Showing {name} · {n} scenes', clear:'Clear highlight',
  gateAria:'{name}: who rebuilt it', gateRead:'Read Nehemiah {r} (NIV) ↗',
  bandEzra:'Before Nehemiah (Ezra)', band:'Nehemiah {c}', tickEzra:'Ezra', tick1:'Ch. 1',
  noRoom:'no room to ride', turned:'turned back', ezraChoir:'Ezra’s choir', nehChoir:'Nehemiah’s choir', start:'choirs start', refused:'refused'
 },
 ko:{
  docTitle:'느헤미야와 예루살렘 성벽',
  eyebrow:'느헤미야서 · 개역개정',
  h1:'느헤미야와 예루살렘 성벽',
  lede:'페르시아의 수산 궁에서 무너진 예루살렘 성벽까지 느헤미야를 따라가 보세요. 그가 어디로 갔고, 누구를 만났고, 무엇을 했는지 볼 수 있습니다. 타임라인을 좌우로 끌거나 화살표 키를 누르면 지도가 이야기를 따라 움직입니다.',
  source:'느헤미야 1–13장을 바탕으로 만들었습니다. 각 장면은 쉬운 말로 풀어 썼고, 대한성서공회가 무료로 제공하는 <a href="https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&amp;book=neh&amp;chap=1" target="_blank" rel="noopener noreferrer">개역개정</a> 본문으로 연결됩니다.',
  langGroup:'언어',
  mapAria:'지도', regionAria:'수산에서 예루살렘까지 페르시아 제국 지도', cityAria:'예루살렘 성벽과 성문 개략도',
  tabsAria:'지도 보기', tabEmpire:'제국', tabJudah:'유다', tabCity:'예루살렘',
  gcClose:'성문 정보 닫기',
  whatH:'무슨 일이 있었나', peopleH:'이 장면의 인물',
  tlTitle:'타임라인', tlHint:'끌거나 스크롤하거나 카드를 누르세요', tlAria:'느헤미야 타임라인. 좌우 화살표 키로 이동하세요.', scrubAria:'타임라인 이동',
  prev:'이전 장면', next:'다음 장면', barAria:'장면 이동',
  castH:'등장인물', castP:'느헤미야가 만난 사람들입니다. 친구도 있고 대적도 있습니다. 이름을 누르면 타임라인에서 그 사람이 나오는 장면이 강조되고, 장면 이름을 누르면 바로 그 장면으로 이동합니다.',
  notesH:'이 지도에 대하여',
  n1h:'본문', n1:'각 장면은 성경 본문을 쉬운 말로 풀어 쓴 것입니다. 장면마다 있는 버튼을 누르면 대한성서공회 웹사이트에서 개역개정 해당 장을 무료로 읽을 수 있습니다.',
  n2h:'연대', n2:'느헤미야는 아닥사스다 1세의 통치 연수로 날짜를 기록합니다. 왕의 제20년은 주전 445년경입니다. 월 환산은 대략적인 것이며, 11–13장의 날짜는 성경에 나오지 않습니다.',
  n3h:'장소', n3:'해안선은 단순화했습니다. 성경은 느헤미야의 여행 경로를 밝히지 않습니다. 예루살렘 지도는 개략도이며, 성벽의 정확한 위치와 각 문의 자리는 학자들 사이에서도 의견이 갈립니다.',
  scene:'장면 {i} / {n}', note:'참고', noPeople:'이 장면에 이름이 나오는 인물은 없습니다.',
  read:'개역개정으로 {ref} 읽기', alt:'영어 NIV로 읽기',
  keyNeh:'느헤미야', cityNote:'느헤미야 시대 예루살렘의 개략도입니다.',
  filter1:'{name} 등장 장면 1개', filter:'{name} 등장 장면 {n}개', clear:'강조 해제',
  gateAria:'{name}: 누가 중수했나', gateRead:'느헤미야 {r} 읽기 (개역개정) ↗',
  bandEzra:'느헤미야 이전 (에스라서)', band:'느헤미야 {c}장', tickEzra:'에스라', tick1:'1장',
  noRoom:'지나갈 곳 없음', turned:'돌아섬', ezraChoir:'에스라의 찬양대', nehChoir:'느헤미야의 찬양대', start:'찬양대 출발', refused:'거절'
 }
};
function u(key, vars){ var s = UI[lang][key]; if(s==null) s = UI.en[key]; if(vars){ for(var k in vars) s = s.split('{'+k+'}').join(vars[k]); } return s; }
function tx(obj, key){ return (lang==='ko' && obj.ko && obj.ko[key]!=null) ? obj.ko[key] : obj[key]; }

/* ---------- projection ---------- */
var KX = 50*Math.cos(33*Math.PI/180);
function P(ll){ return [(ll[0]-30.5)*KX, (40-ll[1])*50]; }
var EXT = {w:20*KX, h:700};
var CEXT = {w:1100, h:640};
function dpath(pts, close){ return 'M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join('L')+(close?'Z':''); }
function spline(pts, seg){
  seg = seg||10; if(pts.length<3) return pts.slice();
  var out=[];
  for(var i=0;i<pts.length-1;i++){
    var p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||pts[i+1];
    for(var s=0;s<seg;s++){
      var t=s/seg, t2=t*t, t3=t2*t;
      var f=function(a,b,c,d){ return 0.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3); };
      out.push([f(p0[0],p1[0],p2[0],p3[0]), f(p0[1],p1[1],p2[1],p3[1])]);
    }
  }
  out.push(pts[pts.length-1]); return out;
}
function cum(pts){ var L=[0]; for(var i=1;i<pts.length;i++) L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1])); return L; }
function partial(pts, L, d){
  var tot=L[L.length-1]; if(d>=tot) return pts.slice(); if(d<=0) return [pts[0], pts[0]];
  var k=1; while(k<L.length && L[k]<d) k++;
  var t=(d-L[k-1])/((L[k]-L[k-1])||1);
  return pts.slice(0,k).concat([[lerp(pts[k-1][0],pts[k][0],t), lerp(pts[k-1][1],pts[k][1],t)]]);
}
function fit(rect, core, ext, Ar){
  var x0=rect[0], y0=rect[1], x1=rect[2], y1=rect[3];
  var w=x1-x0, h=y1-y0, cx=(x0+x1)/2, cy=(y0+y1)/2;
  if(w/h > Ar) h=w/Ar; else w=h*Ar;
  if(h>ext.h){ h=ext.h; w=h*Ar; }
  if(w>ext.w){ w=ext.w; h=w/Ar; }
  var x=cx-w/2, y=cy-h/2;
  if(core){ x=Math.min(x, core[0]); x=Math.max(x, core[2]-w); y=Math.min(y, core[1]); y=Math.max(y, core[3]-h); }
  x=clamp(x, 0, Math.max(0, ext.w-w)); y=clamp(y, 0, Math.max(0, ext.h-h));
  return {x:x, y:y, w:w, h:h};
}

/* ---------- geography (lon, lat) ---------- */
var SEAS = [
  [[30.5,31.47],[30.8,31.53],[31.05,31.58],[31.4,31.55],[31.85,31.52],[32.3,31.27],[32.6,31.1],[33.0,31.12],[33.4,31.14],[33.8,31.13],[34.25,31.3],[34.45,31.52],[34.55,31.67],[34.64,31.8],[34.75,32.05],[34.85,32.33],[34.89,32.5],[34.94,32.7],[34.96,32.83],[35.05,32.82],[35.07,32.93],[35.1,33.09],[35.19,33.27],[35.37,33.56],[35.47,33.9],[35.6,33.98],[35.64,34.12],[35.65,34.25],[35.8,34.45],[35.88,34.89],[35.94,35.18],[35.92,35.36],[35.77,35.52],[35.85,35.85],[35.95,36.05],[35.89,36.41],[36.17,36.59],[36.2,36.85],[35.79,36.77],[35.38,36.56],[34.63,36.8],[34.3,36.6],[33.88,36.32],[33.4,36.15],[32.83,36.02],[32.4,36.3],[32.0,36.54],[31.4,36.77],[30.7,36.88],[30.57,36.6],[30.5,36.45]],
  [[32.55,29.97],[32.6,29.6],[32.7,29.15],[33.0,28.6],[33.25,28.2],[33.55,27.85],[33.83,27.25],[33.94,26.75],[34.28,26.1],[34.35,25.8],[36.8,25.8],[36.47,26.23],[35.69,27.35],[35.25,27.94],[34.75,28.05],[34.85,28.6],[34.95,29.28],[35.0,29.53],[34.92,29.5],[34.67,28.98],[34.52,28.5],[34.33,27.9],[34.25,27.73],[33.9,27.95],[33.6,28.24],[33.1,29.04],[32.7,29.6],[32.6,29.92]],
  [[48.53,29.97],[48.2,29.75],[47.9,29.55],[47.72,29.38],[48.0,29.36],[48.2,29.0],[48.5,28.42],[48.9,27.8],[49.3,27.4],[49.65,27.0],[50.16,26.65],[50.05,26.2],[50.1,25.8],[50.8,25.8],[50.8,29.3],[50.5,29.6],[50.17,30.05],[49.5,30.05],[49.0,30.15]],
  [[48.87,38.43],[48.83,38.8],[49.0,39.1],[49.3,39.5],[49.5,40.2],[50.8,40.2],[50.8,36.9],[50.2,37.15],[49.8,37.38],[49.47,37.47],[49.0,37.75],[48.9,38.1]],
  [[35.47,31.77],[35.56,31.76],[35.6,31.55],[35.57,31.3],[35.52,31.1],[35.45,31.02],[35.38,31.1],[35.4,31.4],[35.42,31.6]],
  [[35.52,32.88],[35.6,32.9],[35.65,32.83],[35.62,32.72],[35.57,32.71],[35.51,32.8]],
  [[45.3,38.2],[45.7,38.25],[45.9,37.8],[45.75,37.3],[45.45,37.15],[45.25,37.6]],
  [[42.25,38.55],[42.55,38.9],[43.0,38.95],[43.4,38.7],[43.2,38.35],[42.8,38.45]]
];
var ISLANDS = [
  [[32.27,35.06],[32.55,35.17],[32.92,35.17],[33.2,35.36],[33.66,35.37],[34.08,35.48],[34.59,35.69],[34.1,35.38],[33.95,35.12],[34.08,34.96],[33.63,34.92],[33.6,34.82],[33.04,34.67],[32.95,34.57],[32.4,34.75],[32.3,34.9]]
];
var RIVERS = [
  [[38.8,38.8],[38.3,38.3],[38.48,37.6],[38.0,37.05],[38.02,36.6],[38.05,36.05],[38.6,35.85],[39.05,35.95],[40.1,35.33],[40.9,34.5],[41.95,34.45],[42.4,34.1],[42.85,33.62],[43.3,33.42],[43.8,33.33],[44.28,32.8],[44.42,32.54],[44.6,32.1],[45.3,31.32],[46.25,31.05],[47.0,31.0],[47.43,31.0]],
  [[40.23,37.91],[41.4,37.7],[42.19,37.33],[42.6,36.9],[43.13,36.34],[43.4,35.5],[43.68,34.6],[43.9,34.2],[44.38,33.33],[45.0,33.0],[45.83,32.5],[46.6,32.2],[47.16,31.84],[47.43,31.0],[47.82,30.5],[48.2,30.2],[48.53,29.97]],
  [[49.8,32.4],[49.2,32.2],[48.85,32.05],[48.7,31.6],[48.68,31.32],[48.4,30.9],[48.18,30.43]],
  [[47.2,33.8],[47.7,33.2],[48.0,32.7],[48.17,32.3],[48.0,31.9],[47.7,31.6]],
  [[35.62,33.2],[35.6,32.92]],
  [[35.57,32.71],[35.58,32.5],[35.55,32.3],[35.55,32.05],[35.53,31.77]],
  [[32.72,25.8],[32.5,26.1],[31.7,26.56],[31.18,27.18],[30.75,28.1],[31.1,29.07],[31.25,30.05]],
  [[31.25,30.05],[30.9,30.6],[30.6,31.1],[30.4,31.47]],
  [[31.25,30.05],[31.3,30.5],[31.55,31.0],[31.82,31.5]]
];
var RL = [
  {t:['Mediterranean','Sea'], ko:['지중해'], ll:[32.9,33.15], c:'sea-l', v:'e'},
  {t:['TRANS-EUPHRATES'], ko:['강 서쪽 지방'], sub:'Beyond the River', koSub:'유브라데 강 건너편', ll:[38.4,32.3], v:'e'},
  {t:['SYRIAN DESERT'], ko:['시리아 사막'], ll:[40.9,31.2], v:'e', minor:1},
  {t:['BABYLONIA'], ko:['바벨로니아'], ll:[45.9,31.72], v:'e'},
  {t:['ELAM'], ko:['엘람'], ll:[47.45,33.15], v:'e', minor:1},
  {t:['ZAGROS MOUNTAINS'], ko:['자그로스 산맥'], ll:[46.75,34.5], rot:-38, v:'e', minor:1},
  {t:['ASSYRIA'], ko:['앗수르'], ll:[43.0,36.75], v:'e', minor:1},
  {t:['ARABIA'], ko:['아라비아'], ll:[40.0,28.9], v:'e'},
  {t:['EGYPT'], ko:['애굽'], ll:[31.9,28.9], v:'e'},
  {t:['Persian Gulf'], ko:['페르시아만'], ll:[49.5,28.35], c:'sea-l', v:'e'},
  {t:['Euphrates'], ko:['유브라데 강'], ll:[41.9,34.12], c:'riv', v:'e'},
  {t:['Tigris'], ko:['티그리스 강'], ll:[43.95,35.3], rot:-72, c:'riv', v:'e'},
  {t:['CYPRUS'], ko:['구브로'], ll:[33.25,35.08], c:'sm', v:'e', minor:1},
  {t:['Mediterranean','Sea'], ko:['지중해'], ll:[34.28,32.5], c:'sea-l', v:'j'},
  {t:['JUDAH'], ko:['유다'], ll:[35.0,31.4], v:'j'},
  {t:['SAMARIA'], ko:['사마리아'], ll:[35.38,32.52], v:'j'},
  {t:['Dead Sea'], ko:['사해'], ll:[35.66,31.6], c:'sea-l', anchor:'start', v:'j'}
];
var PL = {
  susa:{n:'Susa', ko:{n:'수산'}, ll:[48.26,32.19], tier:'empire', lab:[0,-11,'middle']},
  babylon:{n:'Babylon', ko:{n:'바벨론'}, ll:[44.42,32.54], tier:'empire', lab:[-9,-7,'end']},
  jerusalem:{n:'Jerusalem', ko:{n:'예루살렘'}, ll:[35.23,31.78], tier:'all', lab:[-10,4,'end'], labJ:[10,4,'start']},
  damascus:{n:'Damascus', ko:{n:'다메섹'}, ll:[36.29,33.51], tier:'route', lab:[8,-6,'start'], town:1},
  tadmor:{n:'Tadmor', ko:{n:'다드몰'}, ll:[38.27,34.56], tier:'route', lab:[0,-10,'middle'], town:1},
  mari:{n:'Mari', ko:{n:'마리'}, ll:[40.89,34.55], tier:'route', lab:[0,-10,'middle'], town:1},
  samaria:{n:'Samaria (city)', ko:{n:'사마리아 성'}, ll:[35.19,32.28], tier:'judah', lab:[9,4,'start']},
  ammon:{n:'Rabbah (Ammon)', ko:{n:'랍바 (암몬)'}, ll:[35.93,31.95], tier:'judah', lab:[9,4,'start']},
  ashdod:{n:'Ashdod', ko:{n:'아스돗'}, ll:[34.66,31.76], tier:'judah', lab:[-9,4,'end']},
  moab:{n:'MOAB', ko:{n:'모압'}, ll:[35.82,31.38], tier:'judah', region:1},
  arabs:{n:'ARABS (KEDAR)', ko:{n:'아라비아 사람 (게달)'}, ll:[35.3,30.98], tier:'judah', region:1},
  ono:{n:'Ono', ko:{n:'오노'}, ll:[34.87,32.04], tier:'minor', lab:[-9,4,'end']},
  tyre:{n:'Tyre', ko:{n:'두로'}, ll:[35.2,33.27], tier:'minor', lab:[9,4,'start']},
  hebron:{n:'Kiriath Arba (Hebron)', ko:{n:'기럇 아르바 (헤브론)'}, ll:[35.1,31.53], tier:'minor', lab:[9,4,'start']},
  beersheba:{n:'Beersheba', ko:{n:'브엘세바'}, ll:[34.8,31.25], tier:'minor', lab:[9,4,'start']},
  lachish:{n:'Lachish', ko:{n:'라기스'}, ll:[34.85,31.56], tier:'minor', lab:[-9,4,'end']},
  bethel:{n:'Bethel', ko:{n:'벧엘'}, ll:[35.22,31.93], tier:'minor', lab:[9,4,'start']},
  lod:{n:'Lod', ko:{n:'로드'}, ll:[34.89,31.95], tier:'minor', lab:[-9,4,'end']}
};
var MAINLL = [[48.26,32.19],[47.2,32.45],[44.42,32.54],[43.6,33.15],[42.83,33.64],[41.9,34.2],[40.89,34.55],[39.6,34.75],[38.27,34.56],[37.3,34.05],[36.29,33.51],[35.85,32.85],[35.45,32.2],[35.23,31.78]];
var ROUTE_MAIN = spline(MAINLL.map(P), 10);
var ROUTE_BJ = spline(MAINLL.slice(2).map(P), 10);
var ROUTE_JB = ROUTE_BJ.slice().reverse();
var VIEWS = {
  empire:{rect:[46,150,818,550], core:[172,140,772,420]},
  judah:{rect:[159,330,243,457], core:[166,326,236,452]}
};

/* ---------- Jerusalem plan (schematic, 1100 x 640 canvas) ---------- */
var GATES = [
  {id:'sheep', n:'Sheep Gate', x:598,y:62, lab:[14,4,'start'], r:'3:1, 32', q:'Nehemiah 3:1-2', ch:3,
   b:'Rebuilt and dedicated by Eliashib the high priest and his fellow priests. Goldsmiths and merchants repaired the last stretch back to it.',
   ko:{n:'양문', b:'대제사장 엘리아십과 형제 제사장들이 건축하여 성별했다. 금장색과 상인들이 마지막 구간을 이 문까지 중수했다.'}},
  {id:'hundred', n:'Tower of the Hundred', tw:1, x:558,y:46, lab:[6,-11,'start'], r:'3:1', q:'Nehemiah 3:1', ch:3,
   b:'Built and dedicated by Eliashib and the priests as part of their section.',
   ko:{n:'함메아 망대', b:'엘리아십과 제사장들이 자기 구역의 일부로 건축하여 성별했다.'}},
  {id:'hananel', n:'Tower of Hananel', tw:1, x:515,y:42, lab:[-6,-11,'end'], r:'3:1–2', q:'Nehemiah 3:1-2', ch:3,
   b:'The priests built as far as this tower. The men of Jericho and Zakkur son of Imri built the next sections.',
   ko:{n:'하나넬 망대', b:'제사장들이 이 망대까지 건축했다. 그 다음 구간은 여리고 사람들과 이므리의 아들 삭굴이 맡았다.'}},
  {id:'fish', n:'Fish Gate', x:470,y:56, lab:[-13,4,'end'], r:'3:3–5', q:'Nehemiah 3:3-5', ch:3,
   b:'The sons of Hassenaah laid its beams and hung its doors. Meremoth, Meshullam and Zadok repaired next to it, then the men of Tekoa, whose nobles refused to work.',
   ko:{n:'어문', b:'하스나아의 자손들이 들보를 얹고 문짝을 달았다. 그 옆은 므레못, 므술람, 사독이 중수했고, 이어서 드고아 사람들이 일했지만 그 귀족들은 공사를 돕지 않았다.'}},
  {id:'jeshanah', n:'Jeshanah Gate', x:445,y:100, lab:[-13,4,'end'], r:'3:6–8', q:'Nehemiah 3:6-8', ch:3,
   b:'Repaired by Joiada son of Paseah and Meshullam son of Besodeiah. Men of Gibeon and Mizpah, Uzziel the goldsmith and Hananiah the perfume-maker worked next to them.',
   ko:{n:'옛 문', b:'바세아의 아들 요야다와 브소드야의 아들 므술람이 중수했다. 그 옆에서는 기브온과 미스바 사람들, 금장색 웃시엘, 향품 장사 하나냐가 일했다.'}},
  {id:'ephraim', n:'Gate of Ephraim', x:432,y:140, lab:[-13,4,'end'], r:'8:16; 12:39', q:'Nehemiah 12:38-39', ch:12,
   b:'Not listed in chapter 3. Festival shelters filled the square here (8:16), and Nehemiah’s choir passed over it at the dedication (12:39).',
   ko:{n:'에브라임 문', b:'3장에는 나오지 않는다. 이 문 앞 광장에 초막이 세워졌고(8:16), 봉헌식 때 느헤미야의 찬양대가 이 문 위를 지나갔다(12:39).'}},
  {id:'broad', n:'Broad Wall', tw:1, x:428,y:182, lab:[-13,4,'end'], r:'3:8–10', q:'Nehemiah 3:8-10', ch:3,
   b:'Restored as far as here by Uzziel and Hananiah. Rephaiah, ruler of half of Jerusalem’s district, then Jedaiah and Hattush repaired the next sections.',
   ko:{n:'넓은 성벽', b:'웃시엘과 하나냐가 여기까지 중수했다. 그 다음은 예루살렘 지방 절반을 다스리는 르바야, 이어서 여다야와 핫두스가 맡았다.'}},
  {id:'ovens', n:'Tower of the Ovens', tw:1, x:438,y:232, lab:[-13,4,'end'], r:'3:11–12', q:'Nehemiah 3:11-12', ch:3,
   b:'Repaired by Malkijah son of Harim and Hasshub. Next to them, Shallum, ruler of the other half of Jerusalem’s district, worked with his daughters.',
   ko:{n:'화덕 망대', b:'하림의 아들 말기야와 핫숩이 중수했다. 그 옆에서는 예루살렘 지방의 나머지 절반을 다스리는 살룸이 딸들과 함께 일했다.'}},
  {id:'valley', n:'Valley Gate', x:470,y:330, lab:[-13,4,'end'], r:'3:13; 2:13–15', q:'Nehemiah 3:13', ch:3,
   b:'Rebuilt by Hanun and the people of Zanoah, who also repaired 1,000 cubits (about 1,500 feet) of wall down to the Dung Gate. Nehemiah’s night ride began and ended here.',
   ko:{n:'골짜기 문', b:'하눈과 사노아 주민들이 중수했고, 분문까지 이어지는 성벽 천 규빗(약 450m)도 함께 고쳤다. 느헤미야의 밤 순찰이 이 문에서 시작되고 끝났다.'}},
  {id:'dung', n:'Dung Gate', x:528,y:550, lab:[-12,15,'end'], r:'3:14', q:'Nehemiah 3:14', ch:3,
   b:'Rebuilt by Malkijah son of Rekab, ruler of the district of Beth Hakkerem.',
   ko:{n:'분문', b:'벧학게렘 지방을 다스리는 레갑의 아들 말기야가 중수했다.'}},
  {id:'fountain', n:'Fountain Gate', x:566,y:526, lab:[12,16,'start'], r:'3:15–16', q:'Nehemiah 3:15-16', ch:3,
   b:'Rebuilt and roofed by Shallun son of Kol-Hozeh, ruler of Mizpah, who also repaired the wall of the Pool of Siloam. Beyond him, a different Nehemiah, son of Azbuk, repaired toward the tombs of David.',
   ko:{n:'샘문', b:'미스바 지방을 다스리는 골호세의 아들 살룬이 중수하고 지붕을 덮었으며, 셀라 못 가의 성벽도 고쳤다. 그 다음은 이름이 같은 다른 사람, 아스북의 아들 느헤미야가 다윗의 묘실 쪽으로 중수했다.'}},
  {id:'water', n:'Water Gate', x:608,y:330, lab:[14,4,'start'], r:'3:17–27; 8:1', q:'Nehemiah 3:17-27', ch:3,
   b:'On the stretch leading here worked Levites, district rulers from Keilah and Mizpah, Baruch who worked with zeal, priests, and temple servants living on Ophel. Ezra later read the Law in the square before this gate.',
   ko:{n:'수문', b:'이곳으로 이어지는 구간에서 레위 사람들, 그일라와 미스바의 지도자들, 힘써 일한 바룩, 제사장들, 오벨에 사는 느디님 사람들이 일했다. 훗날 에스라가 이 문 앞 광장에서 율법을 낭독했다.'}},
  {id:'horse', n:'Horse Gate', x:628,y:205, lab:[14,4,'start'], r:'3:28', q:'Nehemiah 3:28', ch:3,
   b:'Above this gate the priests made repairs, each in front of his own house.',
   ko:{n:'마문', b:'이 문 위쪽에서 제사장들이 각자 자기 집 앞을 중수했다.'}},
  {id:'east', n:'East Gate', x:640,y:150, lab:[14,4,'start'], r:'3:29–30', q:'Nehemiah 3:29-30', ch:3,
   b:'Shemaiah son of Shekaniah, the guard of the East Gate, repaired near it, with Zadok son of Immer, Hananiah, Hanun and Meshullam close by.',
   ko:{n:'동문', b:'동문지기 스가냐의 아들 스마야가 그 근처를 중수했고, 임멜의 아들 사독과 하나냐, 하눈, 므술람이 가까이에서 일했다.'}},
  {id:'inspection', n:'Inspection Gate', x:634,y:100, lab:[14,4,'start'], r:'3:31', q:'Nehemiah 3:31-32', ch:3,
   b:'Malkijah the goldsmith repaired opposite this gate, up to the room above the corner.',
   ko:{n:'함밉갓 문', b:'금장색 말기야가 이 문 맞은편을 중수하여 성 모퉁이 성루까지 이르렀다.'}}
];
var GI = {}; GATES.forEach(function(g){ GI[g.id]=g; });
function gp(id){ return [GI[id].x, GI[id].y]; }
var WALL = [gp('sheep'),gp('hundred'),gp('hananel'),gp('fish'),gp('jeshanah'),gp('ephraim'),gp('broad'),gp('ovens'),[450,280],gp('valley'),[488,400],[505,470],[519,520],gp('dung'),[546,546],gp('fountain'),[580,490],[592,440],[601,390],gp('water'),[612,285],[618,245],gp('horse'),[636,178],gp('east'),[640,122],gp('inspection'),[626,74]];
var VALLEYS = [
  [[668,-20],[672,150],[660,300],[632,450],[592,560],[560,660]],
  [[392,10],[404,200],[430,330],[482,478],[548,575]],
  [[255,40],[268,290],[322,462],[425,568],[548,610],[560,660]]
];
var CLABELS = [
  {t:'TEMPLE', ko:'성전', x:557,y:172},
  {t:'OPHEL', ko:'오벨', x:588,y:262, c:'sm'},
  {t:'CITY OF DAVID', ko:'다윗 성', x:553,y:420, rot:-77},
  {t:'WESTERN HILL', ko:'서쪽 언덕', x:360,y:390},
  {t:'outside the wall', ko:'성벽 밖', x:360,y:406, c:'sub'},
  {t:'Kidron Valley', ko:'기드론 골짜기', x:684,y:452, rot:76, c:'valley-l'},
  {t:'Hinnom Valley', ko:'힌놈 골짜기', x:352,y:532, rot:42, c:'valley-l'}
];
var CPOINTS = [
  {t:'Gihon Spring', ko:'기혼 샘', x:655,y:366, lab:[9,4,'start']},
  {t:'Pool of Siloam', ko:'셀라 못 (실로암)', x:541,y:512, lab:[-9,4,'end']},
  {t:'Jackal Well?', ko:'용정?', x:448,y:466, lab:[-9,4,'end']}
];
var SPOTS = { center:[534,300], temple:[557,127], watersq:[588,338], valley:[470,330] };
var NIGHT_OUT = [[470,330],[452,356],[438,410],[448,466],[478,522],[512,566],[548,574],[582,552],[598,534],[616,492],[636,430],[652,370],[662,300],[668,246]];
var NIGHT_BACK = [[668,246],[678,300],[670,372],[652,440],[630,505],[602,568],[556,594],[506,588],[464,548],[430,486],[420,414],[436,356],[470,330]];
var CHOIR1 = [[462,300],[470,330],[488,400],[505,470],[519,520],[528,550],[546,546],[566,526],[580,490],[592,440],[601,390],[608,330],[612,285],[618,245],[600,205],[572,160]];
var CHOIR2 = [[462,300],[450,280],[438,232],[428,182],[432,140],[445,100],[470,56],[515,42],[558,46],[598,62],[626,74],[630,96],[600,112],[572,128]];
var CITY_FOCUS = {rect:[235,12,795,600], core:[240,12,790,600]};

/* ---------- story data ---------- */
var PH = {
  bg:{n:'Background', ko:{n:'배경'}, c:'var(--ph-bg)'},
  susa:{n:'In Susa', ko:{n:'수산에서'}, c:'var(--ph-susa)'},
  journey:{n:'The journey', ko:{n:'여정'}, c:'var(--ph-journey)'},
  wall:{n:'Rebuilding', ko:{n:'성벽 재건'}, c:'var(--ph-wall)'},
  opp:{n:'Opposition', ko:{n:'방해'}, c:'var(--ph-opp)'},
  renew:{n:'Renewal', ko:{n:'영적 회복'}, c:'var(--ph-renew)'},
  reform:{n:'Second term', ko:{n:'두 번째 임기'}, c:'var(--ph-reform)'}
};
var PEOPLE = {
  artaxerxes:{n:'King Artaxerxes I', r:'Ruler of the Persian Empire (465–424 BC). Nehemiah served as his cupbearer, and the king sent him to rebuild Jerusalem.',
    ko:{n:'아닥사스다 1세 왕', r:'페르시아 제국의 왕(주전 465–424년). 느헤미야는 그의 술 맡은 관원이었고, 왕은 그를 보내 예루살렘을 재건하게 했다.'}},
  queen:{n:'The queen', r:'Sat beside the king when he agreed to send Nehemiah to Judah.',
    ko:{n:'왕후', r:'왕이 느헤미야를 유다로 보내기로 허락할 때 왕 곁에 앉아 있었다.'}},
  hanani:{n:'Hanani', r:'Nehemiah’s brother. Brought the news from Judah, and later helped govern Jerusalem.',
    ko:{n:'하나니', r:'느헤미야의 형제. 유다에서 소식을 가져왔고, 나중에 예루살렘을 함께 다스렸다.'}},
  asaph:{n:'Asaph', r:'Keeper of the king’s park, ordered by royal letter to supply timber for the gates and wall.',
    ko:{n:'아삽', r:'왕의 삼림 감독. 왕의 조서를 받고 성문과 성벽에 쓸 목재를 내주었다.'}},
  governors:{n:'Governors of Trans-Euphrates', r:'Persian officials west of the Euphrates who received the king’s letters of safe passage.',
    ko:{n:'강 서쪽 총독들', r:'유브라데 강 서쪽 지방의 페르시아 관리들. 안전한 통행을 보장하는 왕의 조서를 받았다.'}},
  sanballat:{n:'Sanballat the Horonite', r:'Nehemiah’s chief opponent, backed by the army of Samaria. A letter from 407 BC found at Elephantine in Egypt calls him governor of Samaria.',
    ko:{n:'호론 사람 산발랏', r:'사마리아 군대를 등에 업은 느헤미야의 가장 큰 대적. 이집트 엘레판틴에서 발견된 주전 407년의 편지는 그를 사마리아 총독이라고 부른다.'}},
  tobiah:{n:'Tobiah the Ammonite', r:'An official tied by oaths and marriage to leading families in Judah. He mocked, plotted, and later moved into a temple room.',
    ko:{n:'암몬 사람 도비야', r:'맹세와 혼인으로 유다의 유력한 가문들과 얽힌 관리. 조롱하고 음모를 꾸몄으며, 나중에는 성전의 방까지 차지했다.'}},
  geshem:{n:'Geshem the Arab', r:'An Arab leader who joined the mockery and the plots. Inscriptions from the period mention a Gashmu linked to the Arab kingdom of Kedar.',
    ko:{n:'아라비아 사람 게셈', r:'조롱과 음모에 가담한 아라비아의 지도자. 당시 비문들에 게달 왕국과 관련된 가스무(Gashmu)라는 인물이 나온다.'}},
  nobles:{n:'Nobles and officials of Judah', r:'Judah’s leading men. Sometimes partners in the work, sometimes part of the problem.',
    ko:{n:'유다의 귀족과 관리들', r:'유다의 지도층. 때로는 일의 동역자였고, 때로는 문제의 원인이었다.'}},
  eliashib:{n:'Eliashib the high priest', r:'Rebuilt the Sheep Gate with the priests. A priest named Eliashib, probably the same man, later gave Tobiah a temple room.',
    ko:{n:'대제사장 엘리아십', r:'제사장들과 함께 양문을 건축했다. 같은 사람으로 보이는 제사장 엘리아십은 나중에 도비야에게 성전의 방을 내주었다.'}},
  shallum:{n:'Shallum and his daughters', r:'Ruler of half of Jerusalem’s district, who repaired his section of wall with his daughters.',
    ko:{n:'살룸과 그의 딸들', r:'예루살렘 지방의 절반을 다스리던 사람으로, 딸들과 함께 자기 구역의 성벽을 중수했다.'}},
  poor:{n:'Families in debt', r:'Ordinary people who lost their fields, and even their children, to debt during a famine.',
    ko:{n:'빚진 가정들', r:'흉년에 빚 때문에 밭을 잃고 자녀까지 종으로 넘겨야 했던 평범한 백성들.'}},
  shemaiah:{n:'Shemaiah son of Delaiah', r:'A prophet paid by Tobiah and Sanballat to scare Nehemiah into hiding in the temple.',
    ko:{n:'들라야의 아들 스마야', r:'도비야와 산발랏에게 매수되어 느헤미야를 겁주고 성전에 숨게 하려던 선지자.'}},
  noadiah:{n:'Noadiah the prophetess', r:'One of the prophets who tried to intimidate Nehemiah.',
    ko:{n:'여선지 노아댜', r:'느헤미야를 두렵게 하려던 선지자 중 한 사람.'}},
  hananiah:{n:'Hananiah', r:'Commander of the citadel, trusted with Jerusalem because he was honest and feared God more than most.',
    ko:{n:'하나냐', r:'영문의 관원. 충성스럽고 누구보다 하나님을 경외했기에 예루살렘을 맡았다.'}},
  ezra:{n:'Ezra', r:'Priest and teacher of the Law. He read the Law to the whole city and led one of the dedication choirs.',
    ko:{n:'에스라', r:'제사장이자 율법 학사. 온 백성에게 율법을 읽어 주었고, 봉헌식 때 한 찬양대를 이끌었다.'}},
  levites:{n:'The Levites', r:'Temple assistants, among them Jeshua, Bani and Sherebiah, who explained the Law, led worship and guarded the gates.',
    ko:{n:'레위 사람들', r:'예수아, 바니, 세레뱌 등 성전 일을 맡은 사람들. 율법을 풀어 주고, 예배를 인도하고, 성문을 지켰다.'}},
  treasurers:{n:'Shelemiah, Zadok, Pedaiah and Hanan', r:'Four trustworthy men put in charge of the temple storerooms.',
    ko:{n:'셀레먀, 사독, 브다야, 하난', r:'성전 곳간을 맡은 충직한 네 사람.'}},
  tyrians:{n:'Merchants from Tyre', r:'Traders living in Jerusalem who sold fish and goods on the Sabbath.',
    ko:{n:'두로 상인들', r:'예루살렘에 살면서 안식일에 물고기와 물건을 팔던 두로 사람들.'}},
  joiadason:{n:'Joiada’s son', r:'A grandson of Eliashib the high priest who married into Sanballat’s family. Nehemiah drove him away.',
    ko:{n:'요야다의 아들', r:'대제사장 엘리아십의 손자로, 산발랏의 사위가 되었다. 느헤미야가 그를 쫓아냈다.'}}
};
var EV = [
{id:'b1', ph:'bg', ch:'Ezra', kc:['ezr',1], ds:'538 BC', dl:'538 BC, about 90 years before Nehemiah', t:'The exiles go home', pl:'Babylon → Jerusalem', ref:'Ezra 1–2; 6:15', q:'Ezra 1', pp:[],
 did:'Persia’s King Cyrus lets the Jewish exiles in Babylon return to Judah. A first group goes back under Zerubbabel and Joshua and rebuilds the temple, which is finished in 516 BC. Jerusalem’s walls stay in ruins for decades. Nehemiah later finds this group’s family list and copies it into chapter 7.',
 met:'Background. Nehemiah has not been born yet.', note:'This part of the story is told in the book of Ezra.',
 m:{v:'empire', f:'jerusalem', rt:'bj'}, cap:'Dotted line: a likely route. The Bible does not name it.'},
{id:'b2', ph:'bg', ch:'Ezra', kc:['ezr',7], ds:'458 BC', dl:'458 BC, 7th year of Artaxerxes', t:'Ezra comes to teach', pl:'Babylon → Jerusalem', ref:'Ezra 7:1–10', q:'Ezra 7:1-10', pp:['ezra'],
 did:'Thirteen years before Nehemiah arrives, Ezra, a priest and teacher of the Law of Moses, leads another group from Babylon to Jerusalem. The journey takes about four months. Ezra will later stand beside Nehemiah and read the Law to the whole city.',
 note:'Ezra 7:9 gives the travel time: he left on the first day of the first month and arrived on the first day of the fifth month.',
 m:{v:'empire', f:'jerusalem', rt:'bj'}, cap:'Dotted line: a likely route. The Bible does not name it.'},
{id:'b3', ph:'bg', ch:'Ezra', kc:['ezr',4], ds:'Before 445 BC', dl:'Sometime before 445 BC (exact date unknown)', t:'Wall work is stopped', pl:'Samaria and Jerusalem', ref:'Ezra 4:7–23', q:'Ezra 4:7-23', pp:[],
 did:'Officials in Samaria write to King Artaxerxes warning that if Jerusalem’s walls are rebuilt, the city will rebel and stop paying taxes. The king orders the work stopped, and they force the Jews to quit. This may be the recent damage behind the news that reaches Nehemiah.',
 met:'Background. Nehemiah is not yet involved.', note:'Ezra places this letter in Artaxerxes’ reign but gives no year.',
 m:{v:'judah', f:'jerusalem', mk:['samaria'], ln:[['samaria','jerusalem','threat']]}, cap:'Arrow: pressure from officials in Samaria.'},
{id:'n1', ph:'susa', ch:'1', kc:['neh',1], ds:'446 BC · Kislev', dl:'Month of Kislev, 20th year of Artaxerxes (about Nov–Dec 446 BC)', t:'Bad news from Jerusalem', pl:'Citadel of Susa', ref:'Nehemiah 1:1–3', q:'Nehemiah 1:1-3', pp:['hanani'],
 did:'Nehemiah son of Hakaliah is at the Persian royal city of Susa when his brother Hanani arrives from Judah with some other men. Nehemiah asks about the Jews who survived the exile and about Jerusalem. The answer is grim: the people are in great trouble and disgrace, the wall is broken down, and the gates have been burned.',
 note:'Susa was a royal capital of the Persian Empire, in what is now southwest Iran.',
 m:{v:'empire', f:'susa'}, cap:'Roughly 900 miles from Jerusalem by the caravan roads.'},
{id:'n2', ph:'susa', ch:'1', kc:['neh',1], ds:'446 BC · Kislev', dl:'Kislev, and the days that followed', t:'Nehemiah weeps and prays', pl:'Susa', ref:'Nehemiah 1:4–11', q:'Nehemiah 1:4-11', pp:[],
 did:'Nehemiah sits down and weeps. For days he mourns, fasts and prays. He praises God for keeping his covenant, confesses Israel’s sins and his own family’s, and reminds God of his promise through Moses to gather scattered people who return to him. He asks for success when he goes before the king. Only then do we learn his job: cupbearer to the king.',
 met:'No one new. This scene is Nehemiah alone in prayer.', note:'A cupbearer served the king’s wine and guarded it against poison. It was a post of great trust with daily access to the king.',
 m:{v:'empire', f:'susa'}},
{id:'n3', ph:'susa', ch:'2', kc:['neh',2], ds:'445 BC · Nisan', dl:'Month of Nisan, 20th year of Artaxerxes (about Mar–Apr 445 BC)', t:'Before the king', pl:'Royal court, Susa', ref:'Nehemiah 2:1–8', q:'Nehemiah 2:1-8', pp:['artaxerxes','queen','asaph'],
 did:'About four months later, Nehemiah serves wine to Artaxerxes. The king notices his sad face and asks why, and Nehemiah is very afraid. He explains that the city where his ancestors are buried lies in ruins. When the king asks what he wants, Nehemiah prays silently, then asks to be sent to rebuild it. With the queen beside him, the king agrees and they set a time. Nehemiah also asks for letters of safe passage and a letter to Asaph, keeper of the royal park, for timber. The king grants it all, and Nehemiah credits God’s gracious hand on him.',
 note:'Looking sad in front of a Persian king could be dangerous, which is why Nehemiah was afraid.',
 m:{v:'empire', f:'susa'}},
{id:'n4', ph:'journey', ch:'2', kc:['neh',2], ds:'445 BC · spring', dl:'Spring to summer 445 BC', t:'The road west', pl:'Susa → Trans-Euphrates → Jerusalem', ref:'Nehemiah 2:9–10', q:'Nehemiah 2:9-10', pp:['governors','sanballat','tobiah'],
 did:'Nehemiah sets out with army officers and cavalry sent by the king. He presents the royal letters to the governors of Trans-Euphrates, the Persian province west of the Euphrates River. Two local officials, Sanballat the Horonite and Tobiah the Ammonite, hear about it and are very disturbed that someone has come to help the Israelites.',
 note:'The Bible does not give the route. The line follows a common caravan road up the Euphrates and across to Damascus, roughly 900 miles (1,450 km). Ezra’s similar trip took about four months.',
 m:{v:'empire', f:'jerusalem', rt:'main'}, cap:'Dotted line: a likely route. The Bible does not name it.'},
{id:'n5', ph:'wall', ch:'2', kc:['neh',2], ds:'445 BC · summer', dl:'Three days after arriving (summer 445 BC)', t:'The night ride', pl:'Around the walls of Jerusalem', ref:'Nehemiah 2:11–16', q:'Nehemiah 2:11-16', pp:[],
 did:'After three days in Jerusalem, Nehemiah slips out at night with a few men. He alone is riding, and he has told no one his plan. He leaves by the Valley Gate, passes the Jackal Well and the Dung Gate, and reaches the Fountain Gate and the King’s Pool, where there is no room for his animal to pass. He goes up the valley in the dark, examining the wall, then turns back and comes in again through the Valley Gate. The officials have no idea where he went.',
 met:'Only the few men who went out with him.', note:'No one knows exactly where the Jackal Well and the King’s Pool were. The map shows likely spots.',
 m:{v:'city', f:'valley', g:['valley','dung','fountain'], cr:'night', wall:'ruined'}, cap:'Solid line: the ride out. Dashed line: the way back.'},
{id:'n6', ph:'wall', ch:'2', kc:['neh',2], ds:'445 BC · summer', dl:'Summer 445 BC', t:'The call to rebuild', pl:'Jerusalem', ref:'Nehemiah 2:17–20', q:'Nehemiah 2:17-20', pp:['nobles','sanballat','tobiah','geshem'],
 did:'Nehemiah gathers the priests, nobles and officials. He points to the ruins and the disgrace, tells them how God has helped him and what the king said, and urges them to rebuild the wall. They agree and begin. Sanballat, Tobiah and Geshem the Arab mock them and ask if they are rebelling against the king. Nehemiah answers that the God of heaven will give success, and that these men have no share, claim or historic right in Jerusalem.',
 m:{v:'city', f:'center', wall:'ruined'}, cap:'The wall still lies in ruins.'},
{id:'n7', ph:'wall', ch:'3', kc:['neh',3], ds:'445 BC · Aug', dl:'During the 52 days of building (about Aug–Sep 445 BC)', t:'Everyone takes a section', pl:'All around the wall', ref:'Nehemiah 3', q:'Nehemiah 3', pp:['eliashib','shallum','nobles'],
 did:'The wall is divided into about 40 sections, each repaired by a family, guild, town or group of priests. Eliashib the high priest and the priests rebuild the Sheep Gate. Goldsmiths, perfume-makers, merchants, Levites, temple servants and district rulers all work, many right beside their own houses. Shallum repairs his section with his daughters. Only the nobles of Tekoa refuse to help, though the men of Tekoa repair two sections.',
 note:'Tap any gate or tower on the Jerusalem map to see who rebuilt it.',
 m:{v:'city', f:'center', g:'all', wall:'building'}, cap:'Tap a gate to see who rebuilt it.'},
{id:'n8', ph:'opp', ch:'4', kc:['neh',4], ds:'445 BC · Aug', dl:'While the wall was going up (445 BC)', t:'Mocked from Samaria', pl:'Jerusalem, threatened from Samaria', ref:'Nehemiah 4:1–6', q:'Nehemiah 4:1-6', pp:['sanballat','tobiah'],
 did:'Sanballat is furious. In front of his associates and the army of Samaria, he ridicules the Jews as weak and mocks their burned, rubble-heap stones. Tobiah adds that even a fox climbing on their wall would knock it down. Nehemiah answers with prayer, asking God to turn the insults back on their own heads. The building goes on until the whole wall reaches half its height, because the people work with all their heart.',
 m:{v:'judah', f:'jerusalem', mk:['samaria'], ln:[['samaria','jerusalem','threat']]}, cap:'Arrow: Sanballat and the army of Samaria.'},
{id:'n9', ph:'opp', ch:'4', kc:['neh',4], ds:'445 BC · Aug', dl:'As the gaps in the wall were closing (445 BC)', t:'Surrounded on every side', pl:'Jerusalem', ref:'Nehemiah 4:7–23', q:'Nehemiah 4:7-23', pp:['sanballat','tobiah','nobles'],
 did:'Sanballat, Tobiah, the Arabs, the Ammonites and the people of Ashdod plot a surprise attack. The workers are worn out, and Jews living nearby warn them ten times. Nehemiah prays, posts guards day and night, and stations families with swords, spears and bows at the lowest points. He tells the people not to be afraid but to remember the Lord. From then on, half the men build while half stand guard, and those carrying loads work with one hand and hold a weapon in the other. A trumpeter stays beside Nehemiah to call everyone together, and no one takes off their clothes, even at night.',
 m:{v:'judah', f:'jerusalem', mk:['samaria','ammon','ashdod','arabs'], ln:[['samaria','jerusalem','threat'],['ammon','jerusalem','threat'],['ashdod','jerusalem','threat'],['arabs','jerusalem','threat']]}, cap:'Arrows: the four groups that plotted to attack.'},
{id:'n10', ph:'wall', ch:'5', kc:['neh',5], ds:'445 BC', dl:'During the building (445 BC)', t:'Justice for the poor', pl:'Jerusalem', ref:'Nehemiah 5:1–13', q:'Nehemiah 5:1-13', pp:['poor','nobles'],
 did:'During a famine, ordinary families raise an outcry. Some have mortgaged their fields, vineyards and homes for grain; others borrowed to pay the king’s tax; some have had to sell their children into slavery. Nehemiah is very angry. He calls a large meeting and confronts the nobles and officials for charging interest to their own people. They agree to give back the fields, vineyards, olive groves, houses and interest. Nehemiah makes them take an oath before the priests and shakes out the folds of his robe as a warning to anyone who breaks it. The whole assembly answers with an amen and praises the Lord.',
 m:{v:'city', f:'center', wall:'building'}},
{id:'n11', ph:'wall', ch:'5', kc:['neh',5], ds:'445–433 BC', dl:'20th to 32nd year of Artaxerxes (445–433 BC)', t:'Twelve years as governor', pl:'Province of Judah', ref:'Nehemiah 5:14–19', q:'Nehemiah 5:14-19', pp:['artaxerxes'],
 did:'Artaxerxes makes Nehemiah governor of Judah for twelve years. Earlier governors had loaded the people with taxes, but Nehemiah and his relatives never take the governor’s food allowance. He buys no land, keeps his men working on the wall, and feeds 150 Jews and officials at his table every day, plus visitors from nearby nations, all at his own expense.',
 note:'These verses look ahead across his whole first term.',
 m:{v:'judah', f:'jerusalem'}, cap:'Nehemiah governs the Persian province of Judah (Yehud).'},
{id:'n12', ph:'opp', ch:'6', kc:['neh',6], ds:'445 BC · Sep', dl:'When the wall was closed but the doors not yet hung (445 BC)', t:'The trap at Ono', pl:'Plain of Ono (invitation refused)', ref:'Nehemiah 6:1–4', q:'Nehemiah 6:1-4', pp:['sanballat','geshem'],
 did:'The wall has no gaps left, though the gate doors are not hung yet. Sanballat and Geshem invite Nehemiah to meet them in a village on the plain of Ono. Nehemiah sees they mean to harm him. He replies that he is doing a great work and cannot come down, because the work would stop while he was gone. They send the same message four times, and each time he gives the same answer.',
 note:'Ono lay about 30 miles (45 km) northwest of Jerusalem, far from the work and from help.',
 m:{v:'judah', f:'jerusalem', mk:['ono'], ln:[['jerusalem','ono','refused']]}, cap:'Dashed line: the trip Nehemiah refused to make.'},
{id:'n13', ph:'opp', ch:'6', kc:['neh',6], ds:'445 BC · Sep', dl:'445 BC, the fifth message', t:'The open letter', pl:'Jerusalem', ref:'Nehemiah 6:5–9', q:'Nehemiah 6:5-9', pp:['sanballat','geshem'],
 did:'The fifth time, Sanballat’s aide arrives carrying an unsealed letter, meant to be read by others. It claims, with Geshem as the source, that the Jews are planning a revolt and that Nehemiah means to make himself king, even appointing prophets to announce it. Nehemiah answers that none of it is true and that Sanballat has made it up. He sees they want to frighten the builders into quitting, and he prays for God to strengthen his hands.',
 m:{v:'judah', f:'jerusalem', mk:['samaria'], ln:[['samaria','jerusalem','msg']]}, cap:'Dotted arrow: Sanballat’s messenger and the open letter.'},
{id:'n14', ph:'opp', ch:'6', kc:['neh',6], ds:'445 BC · Sep', dl:'445 BC', t:'A hired prophet', pl:'House of Shemaiah, Jerusalem', ref:'Nehemiah 6:10–14', q:'Nehemiah 6:10-14', pp:['shemaiah','noadiah','tobiah','sanballat'],
 did:'Nehemiah visits Shemaiah son of Delaiah, who is shut in at home. Shemaiah urges him to hide inside the temple and close the doors, because men are coming to kill him at night. Nehemiah refuses: a man like him should not run away, or go into the temple to save his life. He realizes God did not send Shemaiah. Tobiah and Sanballat paid him to frighten Nehemiah into sinning and ruin his name. Nehemiah also names the prophetess Noadiah and other prophets who tried to intimidate him.',
 note:'Only priests could enter the temple building (Numbers 18:7), so hiding there would have been a sin for Nehemiah.',
 m:{v:'city', f:'temple', wall:'building'}, cap:'Shemaiah wanted Nehemiah to hide inside the temple.'},
{id:'n15', ph:'wall', ch:'6', kc:['neh',6], ds:'445 BC · 25 Elul', dl:'25th of Elul, 52 days after work began (about Sep–Oct 445 BC)', t:'Finished in 52 days', pl:'Jerusalem', ref:'Nehemiah 6:15–19', q:'Nehemiah 6:15-19', pp:['tobiah','nobles'],
 did:'The wall is completed on the 25th of Elul, just 52 days after the work began. The surrounding nations are afraid and lose their confidence, because they see that God helped get it done. Even so, many of Judah’s nobles keep writing to Tobiah, bound to him by oaths and marriages. They praise him to Nehemiah and report Nehemiah’s words back to him, and Tobiah keeps sending letters to intimidate him.',
 m:{v:'city', f:'center', g:'all', wall:'complete'}, cap:'The wall is complete. Tap a gate to see who rebuilt it.'},
{id:'n16', ph:'wall', ch:'7', kc:['neh',7], ds:'445 BC · autumn', dl:'After the doors were hung (autumn 445 BC)', t:'Guards, gates and a census', pl:'Jerusalem', ref:'Nehemiah 7', q:'Nehemiah 7', pp:['hanani','hananiah','nobles'],
 did:'Gatekeepers, musicians and Levites are appointed. Nehemiah puts his brother Hanani in charge of Jerusalem along with Hananiah, commander of the citadel, a man of integrity who fears God more than most. The gates stay shut until the sun is hot, and residents take turns on guard. The city is large but nearly empty, so Nehemiah gathers the people to register by families. He finds the record of the first returnees: 42,360 people, plus 7,337 servants and 245 singers. Leaders give gold, silver and garments for the priests, and the governor gives 1,000 gold darics.',
 m:{v:'city', f:'center', wall:'complete'}},
{id:'n17', ph:'renew', ch:'8', kc:['neh',8], ds:'445 BC · 1 Tishri', dl:'1st day of the 7th month, Tishri (about Oct 445 BC)', t:'Ezra reads the Law', pl:'Square before the Water Gate', ref:'Nehemiah 8:1–12', q:'Nehemiah 8:1-12', pp:['ezra','levites'],
 did:'All the people gather as one in the square before the Water Gate. Ezra stands on a high wooden platform and reads the Book of the Law of Moses from daybreak until noon, while Levites explain the meaning so everyone understands. The people weep as they listen. Nehemiah the governor, Ezra and the Levites tell them the day is holy: go eat and drink, share with those who have nothing, and do not grieve, “for the joy of the LORD is your strength.”',
 m:{v:'city', f:'watersq', g:['water'], wall:'complete'}, cap:'The square before the Water Gate.'},
{id:'n18', ph:'renew', ch:'8', kc:['neh',8], ds:'445 BC · Tishri', dl:'2nd to 22nd days of the 7th month', t:'The Festival of Shelters', pl:'Rooftops, courtyards and squares', ref:'Nehemiah 8:13–18', q:'Nehemiah 8:13-18', pp:['ezra','levites'],
 did:'The next day, the family heads, priests and Levites study the Law with Ezra and find the command to live in temporary shelters during the festival of the seventh month. The people bring olive, myrtle and palm branches from the hills and build shelters on their roofs, in courtyards, in the temple courts, and in the squares by the Water Gate and the Gate of Ephraim. It has not been celebrated like this since the days of Joshua. Ezra reads from the Law every day of the seven-day festival.',
 m:{v:'city', f:'center', g:['water','ephraim'], wall:'complete'}, cap:'Shelters filled the squares by the Water Gate and the Gate of Ephraim.'},
{id:'n19', ph:'renew', ch:'9', kc:['neh',9], ds:'445 BC · 24 Tishri', dl:'24th day of the 7th month', t:'A day of confession', pl:'Jerusalem', ref:'Nehemiah 9:1–37', q:'Nehemiah 9:1-37', pp:['levites'],
 did:'The people gather fasting, in sackcloth, with dust on their heads. For a quarter of the day they read from the Law, and for another quarter they confess their sins and worship. Levites on the stairs lead a long prayer that retells Israel’s whole story: creation, Abraham, Egypt and the Red Sea, Mount Sinai, the wilderness, the promised land, the judges, the prophets and the exile. It ends with an honest admission that they still serve foreign kings in their own land.',
 m:{v:'city', f:'temple', wall:'complete'}},
{id:'n20', ph:'renew', ch:'10', kc:['neh',10], ds:'445 BC', dl:'After the day of confession', t:'Signing the covenant', pl:'Jerusalem', ref:'Nehemiah 9:38–10:39', q:'Nehemiah 9:38-10:39', pp:['levites','nobles'],
 did:'The people write a binding agreement, and Nehemiah the governor puts his seal on it first, followed by priests, Levites and leaders. Everyone promises not to intermarry with the surrounding peoples, not to buy on the Sabbath, to rest the land and cancel debts every seventh year, to give a third of a shekel each year for the temple, to take turns supplying wood for the altar, and to bring firstfruits and tithes. They close with a pledge not to neglect the house of their God.',
 m:{v:'city', f:'temple', wall:'complete'}},
{id:'n21', ph:'renew', ch:'11', kc:['neh',11], ds:'After 445 BC', dl:'After the wall was finished', t:'One in ten moves in', pl:'Jerusalem and the towns of Judah', ref:'Nehemiah 11', q:'Nehemiah 11', pp:[],
 did:'The leaders settle in Jerusalem, and the rest of the people cast lots so that one family in ten moves into the holy city. The people praise everyone who volunteers. The others live on their family land in towns across Judah and Benjamin, from Beersheba in the south to Bethel, Lod and Ono in the north.',
 met:'The people of Judah and Benjamin: leaders, volunteers, and families chosen by lot.',
 m:{v:'judah', f:'jerusalem', mk:['beersheba','lachish','hebron','bethel','lod','ono']}, cap:'Green: some of the towns listed in chapter 11.'},
{id:'n22', ph:'renew', ch:'12', kc:['neh',12], ds:'Date not given', dl:'Soon after the wall was finished (no date given)', t:'Dedicating the wall', pl:'On top of the wall', ref:'Nehemiah 12:27–47', q:'Nehemiah 12:27-47', pp:['ezra','levites'],
 did:'Levites and musicians are brought in from the villages around Jerusalem, and the priests and Levites purify themselves, the people, the gates and the wall. Nehemiah sends two large thanksgiving choirs up onto the wall in opposite directions. Ezra leads one south toward the Dung Gate and around to the Water Gate. Nehemiah follows the other north past the Fish Gate and the towers to the Sheep Gate. Both choirs meet at the temple, where great sacrifices are offered, and the rejoicing can be heard far away.',
 m:{v:'city', f:'temple', g:['valley','dung','fountain','water','ovens','broad','ephraim','jeshanah','fish','hananel','hundred','sheep'], cr:'ded', wall:'complete'}, cap:'Green: Ezra’s choir. Red: Nehemiah’s choir.'},
{id:'n23', ph:'reform', ch:'13', kc:['neh',13], ds:'433 BC', dl:'32nd year of Artaxerxes (about 433 BC), then some time later', t:'Back to the king', pl:'Jerusalem → the king’s court → Jerusalem', ref:'Nehemiah 13:6–7', q:'Nehemiah 13:6-7', pp:['artaxerxes'],
 did:'After twelve years as governor, Nehemiah goes back to Artaxerxes, whom he calls king of Babylon, one of the Persian king’s titles. While he is away, things in Jerusalem slip. Some time later he asks the king’s permission and returns to Jerusalem.',
 note:'The Bible does not say how long he was gone or exactly where the king was staying.',
 m:{v:'empire', f:'babylon', rt:'jbj'}, cap:'There and back again, along a likely route.'},
{id:'n24', ph:'reform', ch:'13', kc:['neh',13], ds:'c. 430 BC', dl:'After his return (year unknown)', t:'Tobiah thrown out', pl:'Temple storerooms', ref:'Nehemiah 13:4–9', q:'Nehemiah 13:4-9', pp:['eliashib','tobiah'],
 did:'Nehemiah learns that Eliashib the priest, who was in charge of the temple storerooms and close to Tobiah, has given Tobiah a large room in the temple courts. That room had held grain offerings, incense, temple articles and the tithes for the Levites. Nehemiah is furious. He throws all of Tobiah’s household goods out, has the rooms purified, and puts the temple supplies back.',
 m:{v:'city', f:'temple', wall:'complete'}, cap:'A storeroom in the temple courts.'},
{id:'n25', ph:'reform', ch:'13', kc:['neh',13], ds:'c. 430 BC', dl:'After his return', t:'Paying the Levites', pl:'Temple storerooms', ref:'Nehemiah 13:10–14', q:'Nehemiah 13:10-14', pp:['levites','nobles','treasurers'],
 did:'The Levites and musicians had gone home to farm because no one was giving them their portions. Nehemiah rebukes the officials for neglecting God’s house and puts the Levites back at their posts. All Judah brings in tithes of grain, wine and oil, and Nehemiah puts four trustworthy men in charge of the storerooms: Shelemiah the priest, Zadok the scribe, Pedaiah the Levite, and Hanan as their assistant.',
 m:{v:'city', f:'temple', wall:'complete'}},
{id:'n26', ph:'reform', ch:'13', kc:['neh',13], ds:'c. 430 BC', dl:'After his return', t:'Guarding the Sabbath', pl:'The gates of Jerusalem', ref:'Nehemiah 13:15–22', q:'Nehemiah 13:15-22', pp:['nobles','tyrians','levites'],
 did:'Nehemiah sees people treading winepresses on the Sabbath and hauling grain, wine, grapes and figs into Jerusalem, and men from Tyre selling fish and goods. He rebukes the nobles, reminding them that breaking the Sabbath helped bring disaster on their ancestors. He orders the gates shut from dusk before the Sabbath until it ends and posts his own men there. When merchants camp outside the wall, he threatens to arrest them, and they stop coming. Then he assigns Levites to guard the gates.',
 m:{v:'judah', f:'jerusalem', mk:['tyre'], ln:[['tyre','jerusalem','trade']]}, cap:'Dashed arrow: traders from Tyre.'},
{id:'n27', ph:'reform', ch:'13', kc:['neh',13], ds:'c. 430 BC', dl:'After his return', t:'Confronting mixed marriages', pl:'Judah', ref:'Nehemiah 13:23–29', q:'Nehemiah 13:23-29', pp:['joiadason','sanballat'],
 did:'Some men of Judah have married women from Ashdod, Ammon and Moab, and half their children cannot speak the language of Judah. Nehemiah rebukes them fiercely, even beating some and pulling out their hair, and makes them swear not to intermarry, pointing out that foreign wives led even Solomon into sin. He also drives away a grandson of Eliashib the high priest who had married into Sanballat’s family.',
 m:{v:'judah', f:'jerusalem', mk:['ashdod','ammon','moab'], ln:[['ashdod','jerusalem','link'],['ammon','jerusalem','link'],['moab','jerusalem','link']]}, cap:'Lines: the peoples named in 13:23.'},
{id:'n28', ph:'reform', ch:'13', kc:['neh',13], ds:'c. 430 BC', dl:'The end of the book', t:'A last prayer', pl:'Jerusalem', ref:'Nehemiah 13:30–31', q:'Nehemiah 13:30-31', pp:[],
 did:'Nehemiah purifies the priests and Levites of everything foreign, gives each his duties, and arranges the wood offering and the firstfruits. The book ends with his short prayer for God to remember him with favor, a prayer he has offered again and again in his memoir (5:19; 13:14, 22, 31).',
 met:'No one new. The book closes with Nehemiah’s prayer.',
 m:{v:'city', f:'temple', wall:'complete'}}
];

/* Korean text for each scene (names follow 개역개정) */
var KO = {
b1:{ds:'주전 538', dl:'주전 538년, 느헤미야보다 약 90년 전', t:'포로들의 귀환', pl:'바벨론 → 예루살렘', ref:'에스라 1–2장; 6:15',
 did:'페르시아의 고레스 왕이 바벨론에 있던 유다 포로들에게 고국으로 돌아가도록 허락한다. 첫 무리가 스룹바벨과 예수아와 함께 돌아가 성전을 다시 짓고, 성전은 주전 516년에 완공된다. 그러나 예루살렘 성벽은 수십 년 동안 무너진 채로 남는다. 느헤미야는 훗날 이 무리의 명단을 찾아 7장에 옮겨 적는다.',
 met:'배경. 느헤미야는 아직 태어나지 않았다.', note:'이 부분의 이야기는 에스라서에 나온다.', cap:'점선: 추정 경로 (성경에는 경로가 나오지 않음)'},
b2:{ds:'주전 458', dl:'주전 458년, 아닥사스다 왕 제7년', t:'에스라가 가르치러 오다', pl:'바벨론 → 예루살렘', ref:'에스라 7:1–10',
 did:'느헤미야가 오기 13년 전, 제사장이자 모세의 율법에 정통한 학자 에스라가 또 한 무리를 이끌고 바벨론에서 예루살렘으로 올라간다. 여행은 약 넉 달이 걸린다. 에스라는 훗날 느헤미야 곁에서 온 백성에게 율법을 읽어 준다.',
 note:'에스라 7:9에 여행 기간이 나온다. 첫째 달 초하루에 떠나 다섯째 달 초하루에 도착했다.', cap:'점선: 추정 경로 (성경에는 경로가 나오지 않음)'},
b3:{ds:'주전 445 이전', dl:'주전 445년 이전 (정확한 연도는 알 수 없음)', t:'성벽 공사가 중단되다', pl:'사마리아와 예루살렘', ref:'에스라 4:7–23',
 did:'사마리아의 관리들이 아닥사스다 왕에게 편지를 보내, 예루살렘 성벽이 재건되면 그 성이 반역하고 세금을 바치지 않을 것이라고 경고한다. 왕은 공사를 멈추라고 명령하고, 그들은 유다 사람들을 힘으로 막아 일을 그치게 한다. 느헤미야에게 전해진 소식은 이때 생긴 최근의 피해였을 수 있다.',
 met:'배경. 느헤미야는 아직 이 일에 관여하지 않았다.', note:'에스라서는 이 편지를 아닥사스다 시대의 일로 기록하지만 연도는 밝히지 않는다.', cap:'화살표: 사마리아 관리들의 압력'},
n1:{ds:'주전 446 · 기슬르월', dl:'아닥사스다 왕 제20년 기슬르월 (주전 446년 11–12월경)', t:'예루살렘에서 온 나쁜 소식', pl:'수산 궁', ref:'느헤미야 1:1–3',
 did:'하가랴의 아들 느헤미야가 페르시아의 왕도 수산에 있을 때, 그의 형제 하나니가 몇 사람과 함께 유다에서 온다. 느헤미야가 포로 생활에서 살아남은 유다 사람들과 예루살렘의 형편을 묻자 암울한 대답이 돌아온다. 백성은 큰 환난과 수치 속에 있고, 성벽은 무너졌으며, 성문들은 불에 탔다는 것이다.',
 note:'수산은 페르시아 제국의 왕도 가운데 하나로, 지금의 이란 남서부에 있었다.', cap:'대상로를 따라 예루살렘까지 약 1,450km'},
n2:{ds:'주전 446 · 기슬르월', dl:'기슬르월과 그 뒤 여러 날', t:'울며 기도하는 느헤미야', pl:'수산', ref:'느헤미야 1:4–11',
 did:'느헤미야는 주저앉아 운다. 여러 날 동안 슬퍼하며 금식하고 기도한다. 언약을 지키시는 하나님을 찬양하고, 이스라엘의 죄와 자기 집안의 죄를 고백하며, 흩어진 백성이라도 돌아오면 다시 모으시겠다고 모세를 통해 하신 약속을 기억해 달라고 구한다. 그리고 왕 앞에 나아갈 때 형통하게 해 달라고 기도한다. 그제야 그의 직책이 드러난다. 그는 왕의 술 맡은 관원이었다.',
 met:'새로 만나는 사람은 없다. 느헤미야 홀로 기도하는 장면이다.', note:'술 맡은 관원은 왕의 포도주를 받들고 독이 들지 않았는지 지키는 사람이었다. 날마다 왕을 가까이에서 섬기는, 큰 신임을 받는 자리였다.'},
n3:{ds:'주전 445 · 니산월', dl:'아닥사스다 왕 제20년 니산월 (주전 445년 3–4월경)', t:'왕 앞에 선 느헤미야', pl:'수산 왕궁', ref:'느헤미야 2:1–8',
 did:'넉 달쯤 지나, 느헤미야가 아닥사스다 왕에게 포도주를 올린다. 왕은 그의 근심 어린 얼굴을 보고 까닭을 묻고, 느헤미야는 몹시 두려워한다. 그는 조상들이 묻힌 성읍이 폐허가 되었다고 대답한다. 왕이 무엇을 원하느냐고 묻자, 느헤미야는 속으로 하나님께 기도한 뒤 그 성을 다시 세우도록 자신을 보내 달라고 청한다. 왕후가 곁에 앉아 있는 가운데 왕은 허락하고 돌아올 기한을 정한다. 느헤미야는 안전한 통행을 위한 조서와, 목재를 얻기 위해 왕의 삼림 감독 아삽에게 보낼 조서도 구한다. 왕은 모두 들어주고, 느헤미야는 하나님의 선하신 도우심 덕분이라고 고백한다.',
 note:'페르시아 왕 앞에서 슬픈 얼굴을 보이는 것은 위험할 수 있었다. 그래서 느헤미야가 두려워했다.'},
n4:{ds:'주전 445 · 봄', dl:'주전 445년 봄에서 여름', t:'서쪽으로 가는 길', pl:'수산 → 강 서쪽 지방 → 예루살렘', ref:'느헤미야 2:9–10',
 did:'느헤미야는 왕이 보낸 군대 장관들과 마병들과 함께 길을 떠난다. 그는 유브라데 강 서쪽의 페르시아 속주인 강 서쪽 지방의 총독들에게 왕의 조서를 전한다. 그 지역의 두 관리, 호론 사람 산발랏과 암몬 사람 도비야는 이스라엘 자손을 도우려는 사람이 왔다는 소식을 듣고 몹시 언짢아한다.',
 note:'성경은 경로를 밝히지 않는다. 지도의 선은 유브라데 강을 따라 올라가 다메섹으로 건너가는 대표적인 대상로를 따른 것으로, 약 1,450km이다. 에스라의 비슷한 여행은 넉 달쯤 걸렸다.', cap:'점선: 추정 경로 (성경에는 경로가 나오지 않음)'},
n5:{ds:'주전 445 · 여름', dl:'도착한 지 사흘 뒤 (주전 445년 여름)', t:'밤의 순찰', pl:'예루살렘 성벽 둘레', ref:'느헤미야 2:11–16',
 did:'예루살렘에 온 지 사흘 뒤, 느헤미야는 몇 사람만 데리고 밤에 몰래 나간다. 짐승을 탄 사람은 그 혼자이고, 자기 계획은 아무에게도 말하지 않았다. 그는 골짜기 문으로 나가 용정을 지나 분문에 이르고, 샘문과 왕의 못에 다다르지만 그곳에서는 탄 짐승이 지나갈 자리가 없다. 그는 어둠 속에서 시내를 따라 올라가며 성벽을 살핀 뒤, 돌아서서 다시 골짜기 문으로 들어온다. 관리들은 그가 어디에 다녀왔는지 전혀 모른다.',
 met:'함께 나간 몇 사람뿐이다.', note:'용정과 왕의 못이 정확히 어디였는지는 알 수 없다. 지도에는 가능성이 높은 위치를 표시했다.', cap:'실선: 나간 길 · 점선: 돌아온 길'},
n6:{ds:'주전 445 · 여름', dl:'주전 445년 여름', t:'다시 세우자는 부름', pl:'예루살렘', ref:'느헤미야 2:17–20',
 did:'느헤미야는 제사장들과 귀족들과 관리들을 모은다. 폐허와 수치를 가리키며 하나님이 자신을 도우신 일과 왕이 한 말을 전하고, 성벽을 다시 세우자고 권한다. 그들은 뜻을 모아 일을 시작한다. 산발랏과 도비야와 아라비아 사람 게셈은 그들을 비웃으며 왕을 배반하려는 것이냐고 묻는다. 느헤미야는 하늘의 하나님이 일을 이루게 하실 것이며, 그들에게는 예루살렘에 아무 몫도 권리도 남길 이름도 없다고 대답한다.',
 cap:'성벽은 아직 무너진 채로 있다.'},
n7:{ds:'주전 445 · 8월', dl:'52일간의 공사 기간 (주전 445년 8–9월경)', t:'모두가 한 구간씩', pl:'성벽 전체', ref:'느헤미야 3장',
 did:'성벽은 약 40개 구간으로 나뉘고, 가문과 동업자들과 마을과 제사장 무리가 저마다 한 구간씩 맡아 중수한다. 대제사장 엘리아십과 제사장들은 양문을 건축한다. 금장색, 향품 장사, 상인, 레위 사람, 느디님 사람, 지방 관리들이 모두 일하고, 많은 이들이 자기 집 바로 앞을 고친다. 살룸은 딸들과 함께 자기 구간을 중수한다. 드고아의 귀족들만 일을 돕지 않았지만, 드고아 사람들은 두 구간을 맡아 고친다.',
 note:'예루살렘 지도에서 문이나 망대를 누르면 누가 중수했는지 볼 수 있다.', cap:'문을 누르면 누가 중수했는지 볼 수 있습니다.'},
n8:{ds:'주전 445 · 8월', dl:'성벽이 올라가던 때 (주전 445년)', t:'사마리아에서 들려온 조롱', pl:'예루살렘 (사마리아의 위협)', ref:'느헤미야 4:1–6',
 did:'산발랏은 크게 분노한다. 그는 동료들과 사마리아 군대 앞에서 유다 사람들을 약하다고 비웃고, 불탄 돌무더기로 무엇을 하겠느냐고 조롱한다. 도비야는 여우 한 마리만 올라가도 그 성벽이 무너질 것이라고 거든다. 느헤미야는 기도로 응답하며, 그들의 모욕을 그들 머리로 돌려 달라고 하나님께 구한다. 백성이 마음을 다해 일했기 때문에 공사는 계속되어 성벽 전체가 절반 높이까지 올라간다.',
 cap:'화살표: 산발랏과 사마리아 군대'},
n9:{ds:'주전 445 · 8월', dl:'성벽의 틈이 메워지던 때 (주전 445년)', t:'사방에서 에워싸이다', pl:'예루살렘', ref:'느헤미야 4:7–23',
 did:'산발랏, 도비야, 아라비아 사람들, 암몬 사람들, 아스돗 사람들이 함께 기습 공격을 꾸민다. 일꾼들은 지쳤고, 가까이 사는 유다 사람들은 열 번이나 와서 경고한다. 느헤미야는 기도하고, 밤낮으로 파수꾼을 세우며, 성벽의 낮은 곳에 가족 단위로 칼과 창과 활을 든 사람들을 배치한다. 그는 백성에게 두려워하지 말고 주님을 기억하라고 말한다. 그때부터 절반은 일하고 절반은 무장하여 지키며, 짐을 나르는 사람은 한 손으로 일하고 다른 손에는 무기를 든다. 나팔 부는 사람이 느헤미야 곁에 있어 모두를 불러 모으고, 밤에도 옷을 벗는 사람이 없다.',
 cap:'화살표: 공격을 꾸민 네 무리'},
n10:{ds:'주전 445', dl:'공사 기간 중 (주전 445년)', t:'가난한 이들을 위한 정의', pl:'예루살렘', ref:'느헤미야 5:1–13',
 did:'흉년이 들자 평범한 가정들이 부르짖는다. 어떤 이들은 곡식을 얻으려고 밭과 포도원과 집을 저당 잡혔고, 어떤 이들은 왕에게 바칠 세금 때문에 돈을 빌렸으며, 어떤 이들은 자녀를 종으로 넘겨야 했다. 느헤미야는 몹시 화가 난다. 그는 큰 모임을 열어 자기 동족에게 이자를 받는 귀족들과 관리들을 꾸짖는다. 그들은 밭과 포도원과 감람원과 집과 이자를 돌려주겠다고 약속한다. 느헤미야는 제사장들 앞에서 그들에게 맹세하게 하고, 약속을 어기는 자에게 경고하는 뜻으로 자기 옷자락을 털어 보인다. 온 회중은 아멘으로 답하고 주님을 찬양한다.'},
n11:{ds:'주전 445–433', dl:'아닥사스다 왕 제20년부터 제32년까지 (주전 445–433년)', t:'12년 동안의 총독', pl:'유다 지방', ref:'느헤미야 5:14–19',
 did:'아닥사스다 왕은 느헤미야를 12년 동안 유다 총독으로 세운다. 이전 총독들은 백성에게 무거운 세금을 지웠지만, 느헤미야와 그의 형제들은 총독의 녹을 한 번도 받지 않는다. 그는 땅을 사지 않고, 자기 사람들을 성벽 공사에 전념하게 하며, 날마다 유다 사람과 관리 150명과 주변 나라에서 온 손님들을 자기 비용으로 대접한다.',
 note:'이 구절들은 그의 첫 임기 전체를 미리 내다보며 정리한 것이다.', cap:'느헤미야는 페르시아의 유다 지방(예후드)을 다스렸다.'},
n12:{ds:'주전 445 · 9월', dl:'성벽은 이어졌으나 문짝은 아직 달지 않았을 때 (주전 445년)', t:'오노 평지의 함정', pl:'오노 평지 (초대를 거절함)', ref:'느헤미야 6:1–4',
 did:'성벽에는 더 이상 무너진 곳이 없지만, 성문에 문짝은 아직 달지 않았다. 산발랏과 게셈은 오노 평지의 한 마을에서 만나자고 느헤미야를 부른다. 느헤미야는 그들이 자신을 해치려 한다는 것을 알아차린다. 그는 자신이 큰 일을 하고 있어서 내려갈 수 없으며, 자기가 자리를 비우면 일이 멈출 것이라고 답한다. 그들은 같은 말을 네 번 보내고, 느헤미야는 매번 같은 대답을 한다.',
 note:'오노는 예루살렘에서 북서쪽으로 약 45km 떨어져 있어, 공사 현장과도 도움과도 먼 곳이었다.', cap:'점선: 느헤미야가 거절한 길'},
n13:{ds:'주전 445 · 9월', dl:'주전 445년, 다섯 번째 전갈', t:'봉하지 않은 편지', pl:'예루살렘', ref:'느헤미야 6:5–9',
 did:'다섯 번째로 산발랏의 종이 봉하지 않은 편지를 들고 온다. 다른 사람들도 읽으라는 뜻이다. 편지에는 게셈이 전한 말이라며, 유다 사람들이 반역을 꾀하고 느헤미야가 스스로 왕이 되려 하며 이를 선포할 선지자들까지 세웠다고 적혀 있다. 느헤미야는 그런 일은 전혀 없으며 산발랏이 지어낸 것이라고 답한다. 그들이 일꾼들을 겁주어 손을 놓게 하려는 것을 알고, 그는 하나님께 자기 손을 힘 있게 해 달라고 기도한다.',
 cap:'작은 점선 화살표: 산발랏의 종과 봉하지 않은 편지'},
n14:{ds:'주전 445 · 9월', dl:'주전 445년', t:'매수된 선지자', pl:'예루살렘, 스마야의 집', ref:'느헤미야 6:10–14',
 did:'느헤미야는 집에 틀어박혀 있는 들라야의 아들 스마야를 찾아간다. 스마야는 사람들이 밤에 그를 죽이러 올 테니 성전 안에 숨어 문을 닫자고 권한다. 느헤미야는 거절한다. 자기 같은 사람이 도망쳐서도 안 되고, 목숨을 건지려고 성전에 들어가서도 안 된다는 것이다. 그는 하나님이 스마야를 보내신 것이 아님을 깨닫는다. 도비야와 산발랏이 그를 매수하여 느헤미야를 겁주고 죄짓게 해서 그의 이름을 더럽히려 한 것이다. 느헤미야는 여선지 노아댜와 자신을 두렵게 하려던 다른 선지자들의 이름도 밝힌다.',
 note:'제사장만 성전 건물 안에 들어갈 수 있었다(민수기 18:7). 그래서 그곳에 숨는 것은 느헤미야에게 죄가 되었을 것이다.', cap:'스마야는 느헤미야를 성전 안에 숨게 하려 했다.'},
n15:{ds:'주전 445 · 엘룰월 25일', dl:'공사를 시작한 지 52일 만인 엘룰월 25일 (주전 445년 9–10월경)', t:'52일 만의 완공', pl:'예루살렘', ref:'느헤미야 6:15–19',
 did:'성벽은 공사를 시작한 지 겨우 52일 만인 엘룰월 25일에 완성된다. 주변 나라들은 두려워하고 기가 꺾인다. 이 일이 하나님의 도우심으로 이루어진 것을 알았기 때문이다. 그런데도 유다의 많은 귀족들이 맹세와 혼인으로 얽힌 도비야와 계속 편지를 주고받는다. 그들은 느헤미야 앞에서 도비야를 칭찬하고 느헤미야의 말을 도비야에게 전하며, 도비야는 느헤미야를 겁주려고 계속 편지를 보낸다.',
 cap:'성벽이 완공되었습니다. 문을 누르면 누가 중수했는지 볼 수 있습니다.'},
n16:{ds:'주전 445 · 가을', dl:'문짝을 단 뒤 (주전 445년 가을)', t:'파수꾼, 성문, 그리고 인구 조사', pl:'예루살렘', ref:'느헤미야 7장',
 did:'문지기와 노래하는 자와 레위 사람들이 세워진다. 느헤미야는 형제 하나니와 영문의 관원 하나냐에게 예루살렘을 맡긴다. 하나냐는 충성스럽고 누구보다 하나님을 경외하는 사람이다. 해가 높이 뜨기 전에는 성문을 열지 않고, 주민들이 돌아가며 파수를 선다. 성은 넓지만 거의 비어 있어서, 느헤미야는 백성을 모아 가문별로 등록하게 한다. 그는 처음 돌아온 사람들의 명단을 찾는데, 그 수는 42,360명이고 남녀 종 7,337명과 노래하는 사람 245명이 따로 있었다. 지도자들은 금과 은과 제사장의 옷을 드리고, 총독은 금 1,000다릭을 드린다.'},
n17:{ds:'주전 445 · 일곱째 달 1일', dl:'일곱째 달(티쉬리월) 1일 (주전 445년 10월경)', t:'율법을 읽는 에스라', pl:'수문 앞 광장', ref:'느헤미야 8:1–12',
 did:'온 백성이 한마음으로 수문 앞 광장에 모인다. 에스라는 높은 나무 강단에 서서 새벽부터 정오까지 모세의 율법책을 읽고, 레위 사람들은 모두가 알아듣도록 그 뜻을 풀어 준다. 백성은 말씀을 들으며 운다. 총독 느헤미야와 에스라와 레위 사람들은 오늘은 거룩한 날이니 울지 말고, 가서 먹고 마시며 준비하지 못한 이들에게 나누어 주라고 말한다. 주님 안에서 누리는 기쁨이 그들의 힘이라는 것이다.',
 cap:'수문 앞 광장'},
n18:{ds:'주전 445 · 일곱째 달', dl:'일곱째 달 2일부터 22일까지', t:'초막절', pl:'지붕과 뜰과 광장', ref:'느헤미야 8:13–18',
 did:'이튿날 족장들과 제사장들과 레위 사람들이 에스라와 함께 율법을 공부하다가, 일곱째 달 절기에 초막에서 지내라는 명령을 발견한다. 백성은 산에서 감람나무와 화석류와 종려나무 가지를 가져와 자기 집 지붕과 뜰, 성전 뜰, 수문 광장과 에브라임 문 광장에 초막을 짓는다. 여호수아 때 이후로 이렇게 지킨 적이 없었다. 에스라는 칠 일 동안의 절기 내내 날마다 율법을 읽는다.',
 cap:'수문 광장과 에브라임 문 광장에 초막이 가득했다.'},
n19:{ds:'주전 445 · 일곱째 달 24일', dl:'일곱째 달 24일', t:'죄를 고백하는 날', pl:'예루살렘', ref:'느헤미야 9:1–37',
 did:'백성은 금식하며 굵은 베옷을 입고 머리에 티끌을 뒤집어쓴 채 모인다. 낮의 사분의 일은 율법을 읽고, 또 사분의 일은 죄를 고백하며 예배한다. 단 위에 선 레위 사람들이 이스라엘의 역사 전체를 되짚는 긴 기도를 이끈다. 창조, 아브라함, 애굽과 홍해, 시내 산, 광야, 약속의 땅, 사사들, 선지자들, 그리고 포로 생활까지. 기도는 자기들이 여전히 자기 땅에서 이방 왕들을 섬기고 있다는 솔직한 고백으로 끝난다.'},
n20:{ds:'주전 445', dl:'죄를 고백한 날 이후', t:'언약에 인을 치다', pl:'예루살렘', ref:'느헤미야 9:38–10:39',
 did:'백성은 굳은 언약을 글로 적고, 총독 느헤미야가 가장 먼저 인을 친 뒤 제사장들과 레위 사람들과 지도자들이 뒤따른다. 모두가 약속한다. 이웃 민족과 통혼하지 않고, 안식일에는 물건을 사지 않으며, 일곱째 해마다 땅을 쉬게 하고 빚을 탕감하며, 해마다 성전을 위해 삼분의 일 세겔을 내고, 돌아가며 제단에 쓸 나무를 바치고, 첫 열매와 십일조를 드리겠다고. 그들은 하나님의 전을 버려두지 않겠다는 다짐으로 언약을 마무리한다.'},
n21:{ds:'주전 445 이후', dl:'성벽이 완공된 뒤', t:'열에 하나는 성으로', pl:'예루살렘과 유다의 성읍들', ref:'느헤미야 11장',
 did:'지도자들은 예루살렘에 자리 잡고, 나머지 백성은 제비를 뽑아 열 가정 중 한 가정이 거룩한 성으로 옮겨 가게 한다. 백성은 스스로 자원한 사람들을 칭찬한다. 나머지는 남쪽 브엘세바부터 북쪽 벧엘과 로드와 오노까지, 유다와 베냐민 곳곳의 성읍에서 자기 기업의 땅을 지키며 산다.',
 met:'유다와 베냐민 백성: 지도자들, 자원한 사람들, 제비 뽑힌 가정들.', cap:'초록색: 11장에 나오는 성읍 가운데 일부'},
n22:{ds:'날짜 기록 없음', dl:'성벽 완공 직후 (날짜는 나오지 않음)', t:'성벽 봉헌식', pl:'성벽 위', ref:'느헤미야 12:27–47',
 did:'예루살렘 주변 마을에서 레위 사람들과 노래하는 자들을 불러 모으고, 제사장들과 레위 사람들은 자신과 백성과 성문과 성벽을 정결하게 한다. 느헤미야는 감사 찬송하는 큰 무리 둘을 성벽 위로 올려 서로 반대 방향으로 행진하게 한다. 에스라는 한 무리를 이끌고 남쪽 분문을 향해 가서 수문까지 돌아가고, 느헤미야는 다른 무리를 따라 북쪽으로 어문과 망대들을 지나 양문까지 간다. 두 무리는 성전에서 만나 큰 제사를 드리고, 즐거워하는 소리가 멀리까지 들린다.',
 cap:'초록색: 에스라의 찬양대 · 빨간색: 느헤미야의 찬양대'},
n23:{ds:'주전 433', dl:'아닥사스다 왕 제32년 (주전 433년경), 그리고 얼마 뒤', t:'왕에게 돌아가다', pl:'예루살렘 → 왕궁 → 예루살렘', ref:'느헤미야 13:6–7',
 did:'총독으로 12년을 지낸 뒤, 느헤미야는 아닥사스다 왕에게 돌아간다. 성경은 왕을 페르시아 왕의 칭호 가운데 하나인 바벨론 왕이라고 부른다. 느헤미야가 없는 사이 예루살렘의 형편은 다시 느슨해진다. 얼마 뒤 그는 왕에게 말미를 청하여 예루살렘으로 돌아온다.',
 note:'그가 얼마나 오래 떠나 있었는지, 왕이 정확히 어디에 머물렀는지는 성경에 나오지 않는다.', cap:'추정 경로를 따라 갔다가 돌아옴'},
n24:{ds:'주전 430경', dl:'돌아온 뒤 (연도는 알 수 없음)', t:'쫓겨난 도비야', pl:'성전의 방', ref:'느헤미야 13:4–9',
 did:'느헤미야는 성전 방들을 맡은 제사장 엘리아십이 도비야와 가까이 지내며 성전 뜰에 그를 위한 큰 방을 내준 것을 알게 된다. 그 방은 원래 소제물과 유향과 성전 그릇, 그리고 레위 사람들의 십일조를 두던 곳이었다. 느헤미야는 몹시 분노하여 도비야의 세간을 모두 밖으로 내던지고, 방을 정결하게 한 뒤 성전 물품을 다시 들여놓는다.',
 cap:'성전 뜰의 곳간 방'},
n25:{ds:'주전 430경', dl:'돌아온 뒤', t:'레위 사람들의 몫', pl:'성전 곳간', ref:'느헤미야 13:10–14',
 did:'레위 사람들과 노래하는 자들은 받을 몫을 받지 못해 각자 자기 밭으로 돌아가 있었다. 느헤미야는 하나님의 전을 버려둔 관리들을 꾸짖고 레위 사람들을 다시 제자리에 세운다. 온 유다가 곡식과 새 포도주와 기름의 십일조를 곳간에 들여오고, 느헤미야는 충직한 네 사람에게 곳간을 맡긴다. 제사장 셀레먀, 서기관 사독, 레위 사람 브다야, 그리고 그들을 돕는 하난이다.'},
n26:{ds:'주전 430경', dl:'돌아온 뒤', t:'안식일을 지키다', pl:'예루살렘 성문', ref:'느헤미야 13:15–22',
 did:'느헤미야는 안식일에 사람들이 술틀을 밟고 곡식과 포도주와 포도와 무화과를 예루살렘으로 실어 나르는 것과, 두로 사람들이 물고기와 물건을 파는 것을 본다. 그는 귀족들을 꾸짖으며, 안식일을 범한 일 때문에 조상들에게 재앙이 내렸음을 일깨운다. 안식일 전날 해 질 녘부터 안식일이 끝날 때까지 성문을 닫게 하고 자기 종자들을 세워 지키게 한다. 상인들이 성 밖에서 밤을 지내자 다시 그러면 잡아들이겠다고 경고하고, 그 뒤로 그들은 오지 않는다. 그리고 레위 사람들에게 성문을 지키게 한다.',
 cap:'점선 화살표: 두로에서 온 상인들'},
n27:{ds:'주전 430경', dl:'돌아온 뒤', t:'이방 혼인을 바로잡다', pl:'유다', ref:'느헤미야 13:23–29',
 did:'유다의 어떤 남자들이 아스돗과 암몬과 모압 여인을 아내로 맞았고, 그 자녀의 절반은 유다 말을 하지 못한다. 느헤미야는 그들을 엄하게 꾸짖고 몇 사람은 때리고 머리털까지 뽑으며, 다시는 통혼하지 않겠다고 맹세하게 한다. 그는 솔로몬조차 이방 여인들 때문에 죄를 지었음을 상기시킨다. 또 산발랏의 사위가 된 대제사장 엘리아십의 손자를 쫓아낸다.',
 cap:'선: 13:23에 나오는 민족들'},
n28:{ds:'주전 430경', dl:'책의 마지막', t:'마지막 기도', pl:'예루살렘', ref:'느헤미야 13:30–31',
 did:'느헤미야는 제사장들과 레위 사람들을 모든 이방의 것에서 정결하게 하고, 각자에게 맡은 일을 정해 주며, 나무와 첫 열매를 드리는 일을 마련한다. 책은 하나님께서 자신을 기억하시고 복을 주시기를 구하는 짧은 기도로 끝난다. 그는 이 기도를 회고록 곳곳에서 거듭 드렸다(5:19; 13:14, 22, 31).',
 met:'새로 만나는 사람은 없다. 책은 느헤미야의 기도로 끝난다.'}
};
EV.forEach(function(e){ e.ko = KO[e.id]; });
var N = EV.length;
var START = 3;
function nivUrl(q){ return 'https://www.biblegateway.com/passage/?search='+encodeURIComponent(q)+'&version=NIV'; }
function korUrl(book, chap){ return 'https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book='+book+'&chap='+chap; }

/* ---------- region map ---------- */
var region = $('region'), city = $('city'), frame = $('mapFrame');
var gBase = S('g',null,region), gRL = S('g',null,region), gRouteBase = S('g',null,region), gDyn = S('g',null,region), gPl = S('g',null,region), gTr = S('g',null,region);
S('rect',{x:-200,y:-200,width:EXT.w+400,height:EXT.h+400,'class':'land'},gBase);
var defs = S('defs',null,region), hatch = S('pattern',{id:'hatch',patternUnits:'userSpaceOnUse',width:4,height:3.2},defs);
S('path',{d:'M0 1.6H4','class':'hatch-line'},hatch);
SEAS.forEach(function(s, i){
  var d = dpath(s.map(P),true);
  S('path',A({d:d,'class':'sea'}),gBase);
  if(i<4) S('path',{d:d,'class':'sea-hatch'},gBase);
});
ISLANDS.forEach(function(s){ S('path',A({d:dpath(s.map(P),true),'class':'island'}),gBase); });
RIVERS.forEach(function(r){ S('path',A({d:dpath(spline(r.map(P),6)),'class':'river'}),gBase); });
S('path',A({d:dpath(ROUTE_MAIN),'class':'route-base'}),gRouteBase);

var uiR = [], uiRD = [];
function uiGroup(parent, x, y, cls, rot, list){
  var g = S('g',{'class':'ui '+(cls||'')},parent); g._x=x; g._y=y; g._r=rot||0; list.push(g); return g;
}
function setUI(g, s){ g.setAttribute('transform','translate('+g._x.toFixed(2)+' '+g._y.toFixed(2)+') scale('+s.toFixed(4)+')'+(g._r?' rotate('+g._r+')':'')); }

var MTNS = [[46.3,35.6],[46.8,35.2],[47.3,34.8],[47.8,34.4],[48.3,34.0],[48.8,33.6],[46.9,35.95],[47.45,35.5],[48.0,35.1],[48.9,33.0],
  [35.95,33.9],[36.2,34.2],[36.45,34.5],
  [33.4,37.25],[34.2,37.4],[35.0,37.5],[35.8,37.55],[36.6,37.5],[37.5,37.6],[38.4,37.85]];
var gM = S('g',null); region.insertBefore(gM, gRL);
MTNS.forEach(function(ll){
  var p = P(ll), g = uiGroup(gM, p[0], p[1], 'mtn v-e', 0, uiR);
  S('path',{d:'M-7 4L0 -6L7 4'},g); S('path',{d:'M0 -6L2.6 4','class':'shade'},g);
});
var STAR = 'M0 -9L2.4 -2.4L9 0L2.4 2.4L0 9L-2.4 2.4L-9 0L-2.4 -2.4Z';
var rlEls = [];
RL.forEach(function(l){
  var p = P(l.ll);
  var g = uiGroup(gRL, p[0], p[1], 'rl '+(l.c||'')+' v-'+l.v+(l.minor?' minor':''), l.rot, uiR);
  g._l = l; rlEls.push(g);
});
function renderRL(){
  rlEls.forEach(function(g){
    var l = g._l; g.textContent='';
    var lines = (lang==='ko' && l.ko) ? l.ko : l.t, anchor = l.anchor||'middle';
    lines.forEach(function(line, i){ var t=S('text',{x:0,y:(i-(lines.length-1)/2)*14+4,'text-anchor':anchor},g); t.textContent=line; });
    var sub = (lang==='ko' && l.koSub) ? l.koSub : l.sub;
    if(sub){ var st=S('text',{x:0,y:19,'text-anchor':anchor,'class':'sub'},g); st.textContent=sub; }
  });
}
var placeEls = {};
Object.keys(PL).forEach(function(id){
  var p = PL[id], xy = P(p.ll);
  var g = uiGroup(gPl, xy[0], xy[1], 'pl'+(p.region?' region':'')+(p.town?' town':''), 0, uiR);
  if(!p.region) S('circle',{r:p.town?3:3.8,'class':'dot'},g);
  var t = S('text',{x:p.region?0:p.lab[0], y:p.region?4:p.lab[1], 'text-anchor':p.region?'middle':p.lab[2]},g);
  g._t = t; placeEls[id] = g;
});
var trav = uiGroup(gTr, 0, 0, 'trav', 0, uiR);
S('circle',{r:12,'class':'pulse'},trav); S('path',{d:STAR,'class':'core'},trav);

var vbCur = null, vbAnim = 0, curRegionView = 'empire';
function frameAspect(){ var r=frame.getBoundingClientRect(); return (r.width||16)/(r.height||9); }
function regionScale(){ var w=region.getBoundingClientRect().width||1; return vbCur ? vbCur.w/w : 1; }
function applyRegionUI(){
  if(!vbCur) return;
  region.setAttribute('viewBox', vbCur.x.toFixed(2)+' '+vbCur.y.toFixed(2)+' '+vbCur.w.toFixed(2)+' '+vbCur.h.toFixed(2));
  var s = regionScale();
  uiR.forEach(function(g){ setUI(g,s); }); uiRD.forEach(function(g){ setUI(g,s); });
}
function goRegion(view, animate){
  curRegionView = view; region.setAttribute('data-view', view);
  var v = VIEWS[view]; var target = fit(v.rect, v.core, EXT, frameAspect());
  var id = ++vbAnim;
  if(!vbCur || !animate || reduced){ vbCur = target; applyRegionUI(); return; }
  var from = vbCur, t0 = performance.now(), dur = 950;
  var lw0 = Math.log(from.w), lw1 = Math.log(target.w);
  var c0 = [from.x+from.w/2, from.y+from.h/2], c1 = [target.x+target.w/2, target.y+target.h/2];
  function step(now){
    if(id!==vbAnim) return;
    var t = Math.min(1,(now-t0)/dur), e = ease(t);
    var w = Math.exp(lerp(lw0,lw1,e)), h = w*(target.h/target.w);
    var cx = lerp(c0[0],c1[0],e), cy = lerp(c0[1],c1[1],e);
    vbCur = {x:cx-w/2, y:cy-h/2, w:w, h:h}; applyRegionUI();
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function setTrav(pt){ trav._x=pt[0]; trav._y=pt[1]; setUI(trav, regionScale()); }

var travAnim = 0;
function runPaths(segs, setMarker, scaleFn){
  var id = ++travAnim, k = 0;
  segs.forEach(function(s){ s.L = cum(s.pts); if(s.pts2) s.L2 = cum(s.pts2); });
  function run(){
    var s = segs[k], tot = s.L[s.L.length-1];
    var dur = reduced ? 0 : clamp(tot*(s.speed||4), 1300, 3400), t0 = performance.now();
    function fr(now){
      if(id!==travAnim) return;
      var t = dur ? Math.min(1,(now-t0)/dur) : 1, e = ease(t);
      var pp = partial(s.pts, s.L, e*tot);
      s.el.setAttribute('d', dpath(pp));
      if(s.pts2){
        var p2 = partial(s.pts2, s.L2, e*s.L2[s.L2.length-1]);
        s.el2.setAttribute('d', dpath(p2));
        if(s.marker2){ s.marker2._x=p2[p2.length-1][0]; s.marker2._y=p2[p2.length-1][1]; setUI(s.marker2, scaleFn()); }
      }
      setMarker(pp[pp.length-1]);
      if(t<1) requestAnimationFrame(fr); else if(++k<segs.length) run();
    }
    requestAnimationFrame(fr);
  }
  run();
}

function curve(a, b){
  var dx=b[0]-a[0], dy=b[1]-a[1], len=Math.hypot(dx,dy)||1, nx=-dy/len, ny=dx/len;
  var c=[(a[0]+b[0])/2+nx*len*0.16, (a[1]+b[1])/2+ny*len*0.16], pts=[];
  for(var i=0;i<=30;i++){ var t=i/30, v=1-t; pts.push([v*v*a[0]+2*v*t*c[0]+t*t*b[0], v*v*a[1]+2*v*t*c[1]+t*t*b[1]]); }
  return pts;
}
function drawLine(from, to, kind){
  var pts = curve(P(PL[from].ll), P(PL[to].ll)).slice(4, 27);
  S('path',A({d:dpath(pts),'class':'ln ln-'+kind}),gDyn);
  var end = pts[pts.length-1], pre = pts[pts.length-2];
  if(kind==='threat' || kind==='trade' || kind==='msg'){
    var ang = Math.atan2(end[1]-pre[1], end[0]-pre[0])*180/Math.PI;
    var ah = uiGroup(gDyn, end[0], end[1], 'ah-'+kind, ang, uiRD);
    S('path',{d:'M3 0 L-8 -5.5 L-8 5.5 Z'},ah);
  }
  if(kind==='refused'){
    var mid = pts[Math.floor(pts.length/2)];
    var x = uiGroup(gDyn, mid[0], mid[1], 'xmark', 0, uiRD);
    S('path',{d:'M-6 -6 L6 6 M6 -6 L-6 6'},x);
    var tx2 = S('text',{x:0,y:-12,'text-anchor':'middle'},x); tx2.textContent=u('refused');
  }
}

function drawRegion(ev, view){
  var m = ev.m; travAnim++; gDyn.textContent=''; uiRD.length=0;
  var focus = m.v==='city' ? 'jerusalem' : (m.f||'jerusalem');
  var refs = {}; refs[focus]=1;
  var mkKind = {};
  (m.mk||[]).forEach(function(id){ refs[id]=1; mkKind[id]='town'; });
  (m.ln||[]).forEach(function(l){ refs[l[0]]=1; refs[l[1]]=1; if(l[0]!=='jerusalem') mkKind[l[0]]=l[2]; if(l[1]!=='jerusalem') mkKind[l[1]]=l[2]; });
  if(m.rt){ refs.jerusalem=1; refs[m.rt==='main'?'susa':'babylon']=1; }
  Object.keys(placeEls).forEach(function(id){
    var g = placeEls[id], p = PL[id];
    var vis = !!refs[id] || p.tier==='all' || ((p.tier==='empire'||p.tier==='route') && view==='empire') || (p.tier==='judah' && view==='judah');
    g.setAttribute('class','ui pl'+(p.region?' region':'')+(p.town?' town':'')+(vis?'':' off')+(id===focus && view!=='city'?' focus':'')+(mkKind[id]?' mk-'+mkKind[id]:''));
    if(!p.region){ var lab = (view==='judah' && p.labJ) || p.lab; g._t.setAttribute('x',lab[0]); g._t.setAttribute('y',lab[1]); g._t.setAttribute('text-anchor',lab[2]); }
  });
  (m.ln||[]).forEach(function(l){ drawLine(l[0], l[1], l[2]); });
  var ghost = ev.ph==='bg';
  trav.setAttribute('class','ui trav'+(ghost?' ghost':'')+(ghost && !m.rt ? ' off':''));
  if(m.rt){
    var segs;
    if(m.rt==='main') segs=[{pts:ROUTE_MAIN, cls:'route'+(ghost?' ghost':'')}];
    else if(m.rt==='bj') segs=[{pts:ROUTE_BJ, cls:'route'+(ghost?' ghost':'')}];
    else segs=[{pts:ROUTE_JB, cls:'route'},{pts:ROUTE_BJ, cls:'route back'}];
    segs.forEach(function(s){ s.el = S('path',A({'class':s.cls, d:''}),gDyn); });
    setTrav(segs[0].pts[0]);
    runPaths(segs, setTrav, regionScale);
  } else {
    setTrav(P(PL[focus].ll));
  }
  applyRegionUI();
}

/* ---------- city map ---------- */
var cBase = S('g',null,city), cLab = S('g',null,city), cWall = S('g',null,city), cDyn = S('g',null,city), cPts = S('g',null,city), cGates = S('g',null,city), cTr = S('g',null,city);
S('rect',{x:-200,y:-200,width:CEXT.w+400,height:CEXT.h+400,'class':'land'},cBase);
VALLEYS.forEach(function(v){ var pts=spline(v,8); S('path',{d:dpath(pts),'class':'valley'},cBase); S('path',A({d:dpath(pts),'class':'stream'}),cBase); });
S('path',A({d:dpath([[490,70],[604,76],[616,186],[498,190]],true),'class':'platform'}),cBase);
S('rect',{x:542,y:104,width:30,height:46,rx:2,'class':'house'},cBase);
var wallEl = S('path',A({d:dpath(WALL,true),'class':'wall complete'}),cWall);
var uiC = [], uiCD = [], cvb = null;
var clEls = [], cpEls = [];
CLABELS.forEach(function(l){ var g=uiGroup(cLab,l.x,l.y,'cl '+(l.c||''),l.rot,uiC); var t=S('text',{x:0,y:4,'text-anchor':'middle'},g); g._t=t; g._l=l; clEls.push(g); });
CPOINTS.forEach(function(p){ var g=uiGroup(cPts,p.x,p.y,'cpt',0,uiC); S('circle',{r:3.6,'class':'dot'},g); var t=S('text',{x:p.lab[0],y:p.lab[1],'text-anchor':p.lab[2]},g); g._t=t; g._l=p; cpEls.push(g); });
var gateEls = [];
GATES.forEach(function(gd){
  var g = uiGroup(cGates, gd.x, gd.y, 'gate'+(gd.tw?' tw':''), 0, uiC);
  g.setAttribute('tabindex','0'); g.setAttribute('role','button');
  g.dataset.id = gd.id;
  S('circle',{r:COARSE?19:13,'class':'hit'},g);
  if(gd.tw) S('circle',{r:5.5,'class':'gm'},g); else S('rect',{x:-6,y:-6,width:12,height:12,rx:2,'class':'gm'},g);
  g._t = S('text',{x:gd.lab[0],y:gd.lab[1],'text-anchor':gd.lab[2]},g);
  g.addEventListener('click', function(e){ e.stopPropagation(); openGate(gd.id); });
  g.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openGate(gd.id); } });
  gateEls.push(g);
});
var ctrav = uiGroup(cTr, 534, 300, 'trav', 0, uiC);
S('circle',{r:12,'class':'pulse'},ctrav); S('path',{d:STAR,'class':'core'},ctrav);
function cityScale(){ var w=city.getBoundingClientRect().width||1; return cvb ? cvb.w/w : 1; }
function layoutCity(){
  cvb = fit(CITY_FOCUS.rect, CITY_FOCUS.core, CEXT, frameAspect());
  city.setAttribute('viewBox', cvb.x.toFixed(1)+' '+cvb.y.toFixed(1)+' '+cvb.w.toFixed(1)+' '+cvb.h.toFixed(1));
  var s = cityScale(); uiC.forEach(function(g){ setUI(g,s); }); uiCD.forEach(function(g){ setUI(g,s); });
}
function setCTrav(pt){ ctrav._x=pt[0]; ctrav._y=pt[1]; setUI(ctrav, cityScale()); }
function cNote(x, y, text, anchor){ var g=uiGroup(cDyn,x,y,'note-l',0,uiCD); var t=S('text',{x:0,y:0,'text-anchor':anchor||'start'},g); t.textContent=text; return g; }
function drawCity(ev){
  var m = ev.m; travAnim++; cDyn.textContent=''; uiCD.length=0;
  var native = m.v==='city';
  wallEl.setAttribute('class','wall '+(native ? (m.wall||'complete') : (EV.indexOf(ev) < 9 ? 'ruined' : 'complete')));
  var hl = native ? (m.g==='all' ? GATES.map(function(g){return g.id;}) : (m.g||[])) : [];
  gateEls.forEach(function(g){ g.classList.toggle('hl', hl.indexOf(g.dataset.id)>=0); });
  var inCity = native || ((m.f||'jerusalem')==='jerusalem' && ev.ph!=='bg' && m.v==='judah');
  ctrav.setAttribute('class','ui trav'+(inCity?'':' off'));
  layoutCity();
  if(native && m.cr==='night'){
    var out = S('path',A({'class':'croute night',d:''}),cDyn), back = S('path',A({'class':'croute night-back',d:''}),cDyn);
    cNote(612, 512, u('noRoom'));
    cNote(680, 250, u('turned'));
    layoutCity();
    runPaths([{pts:spline(NIGHT_OUT,6), el:out, speed:3.5},{pts:spline(NIGHT_BACK,6), el:back, speed:3.5}], setCTrav, cityScale);
  } else if(native && m.cr==='ded'){
    var p1 = S('path',A({'class':'croute c1',d:''}),cDyn), p2 = S('path',A({'class':'croute c2',d:''}),cDyn);
    var ez = uiGroup(cDyn, CHOIR1[0][0], CHOIR1[0][1], 'trav ezra', 0, uiCD); S('circle',{r:5,'class':'core'},ez);
    cNote(474, 440, u('ezraChoir'), 'end');
    cNote(535, 96, u('nehChoir'), 'middle');
    cNote(452, 296, u('start'), 'end');
    layoutCity();
    runPaths([{pts:spline(CHOIR2,6), el:p2, pts2:spline(CHOIR1,6), el2:p1, marker2:ez, speed:6}], setCTrav, cityScale);
  } else {
    setCTrav(SPOTS[native ? (m.f||'center') : 'center']);
  }
}
var gateCard = $('gateCard'), selGate = null;
function openGate(id){
  var gd = GI[id]; selGate = id;
  gateEls.forEach(function(g){ g.classList.toggle('sel', g.dataset.id===id); });
  $('gcName').textContent = tx(gd,'n');
  $('gcBody').textContent = tx(gd,'b');
  var a = $('gcRef');
  a.href = lang==='ko' ? korUrl('neh', gd.ch) : nivUrl(gd.q);
  a.textContent = u('gateRead', {r: gd.r});
  gateCard.hidden = false; frame.classList.add('has-gate');
}
function closeGate(){ selGate=null; gateCard.hidden=true; frame.classList.remove('has-gate'); gateEls.forEach(function(g){ g.classList.remove('sel'); }); }
$('gcClose').addEventListener('click', closeGate);

/* ---------- map controller ---------- */
var userView = null, curView = null;
var tabs = Array.prototype.slice.call(document.querySelectorAll('.map-tabs button'));
function setTabs(view){ tabs.forEach(function(b){ b.setAttribute('aria-selected', b.dataset.view===view ? 'true':'false'); }); }
function showMap(ev, animate){
  var view = userView || ev.m.v;
  var prev = curView; curView = view; setTabs(view);
  if(view !== 'city') closeGate();
  if(view === 'city'){
    region.hidden = true; city.hidden = false; travAnim++;
    drawCity(ev);
  } else {
    city.hidden = true; region.hidden = false;
    goRegion(view, animate && prev && prev!=='city');
    drawRegion(ev, view);
  }
  var cap = $('mapCap');
  var key = (ev.ph==='bg') ? '' : '<span class="key"><i></i>'+esc(u('keyNeh'))+'</span>';
  var note = (view===ev.m.v) ? (tx(ev,'cap')||'') : (view==='city' ? u('cityNote') : '');
  cap.innerHTML = '<b>'+esc(tx(ev,'pl'))+'</b>'+key+(note?'<span>'+esc(note)+'</span>':'');
}
tabs.forEach(function(b){ b.addEventListener('click', function(){ userView = b.dataset.view; showMap(EV[active], true); }); });

/* ---------- detail panel ---------- */
var filter = null;
function personChip(pid){
  var b = document.createElement('button'); b.className='pchip'; b.type='button'; b.textContent=tx(PEOPLE[pid],'n');
  b.title = tx(PEOPLE[pid],'r'); b.setAttribute('aria-pressed', filter===pid ? 'true':'false');
  b.addEventListener('click', function(){ setFilter(pid); });
  return b;
}
var ARROW = ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';
function showDetail(ev, i){
  var ph = PH[ev.ph];
  $('detail').style.setProperty('--ph', ph.c);
  $('dPhase').textContent = tx(ph,'n');
  $('dCount').textContent = u('scene', {i:i+1, n:N});
  $('dTitle').textContent = tx(ev,'t');
  $('dDate').textContent = tx(ev,'dl');
  $('dPlace').textContent = tx(ev,'pl');
  $('dDid').textContent = tx(ev,'did');
  var pe = $('dPeople'); pe.textContent='';
  var met = tx(ev,'met');
  if(ev.pp.length){ ev.pp.forEach(function(pid){ pe.appendChild(personChip(pid)); }); if(met){ var mm=document.createElement('p'); mm.className='d-met'; mm.textContent=met; pe.appendChild(mm);} }
  else { var p=document.createElement('p'); p.className='d-met'; p.textContent=met||u('noPeople'); pe.appendChild(p); }
  var note = $('dNote'), nt = tx(ev,'note');
  if(nt){ note.hidden=false; note.innerHTML='<b>'+esc(u('note'))+'</b>'+esc(nt); } else note.hidden=true;
  var a = $('dLink'), alt = $('dAlt');
  var kurl = korUrl(ev.kc[0], ev.kc[1]), nurl = nivUrl(ev.q);
  a.href = lang==='ko' ? kurl : nurl;
  a.innerHTML = esc(u('read', {ref: tx(ev,'ref')})) + ARROW;
  alt.href = lang==='ko' ? nurl : kurl;
  alt.textContent = u('alt');
  alt.lang = lang==='ko' ? 'en' : 'ko';
}

/* ---------- timeline ---------- */
var view = $('tlView'), track = $('track'), axis = $('axis'), scrub = $('scrub');
var cards = [], bands = [], cw = 226, gap = 14, stepW = 240, pos = START, active = -1, tlRAF = 0, quiet = false;
scrub.max = String(N-1);
EV.forEach(function(ev, i){
  var c = document.createElement('div'); c.className='card'; c.dataset.i=i; c.style.setProperty('--ph', PH[ev.ph].c);
  track.appendChild(c); cards.push(c);
});
(function(){
  var s=0;
  for(var i=1;i<=N;i++){
    if(i===N || EV[i].ch!==EV[s].ch){
      var b = document.createElement('div'); b.className='band';
      track.insertBefore(b, axis); bands.push({el:b, s:s, e:i-1, ch:EV[s].ch}); s=i;
    }
  }
})();
function renderCards(){
  cards.forEach(function(c, i){
    var ev = EV[i];
    c.innerHTML = '<div class="c-date">'+esc(tx(ev,'ds'))+'</div><h3 class="c-title">'+esc(tx(ev,'t'))+'</h3><div class="c-place">'+esc(tx(ev,'pl'))+'</div><div class="c-ref">'+esc(tx(ev,'ref'))+'</div>';
  });
  bands.forEach(function(b){ b.el.textContent = b.ch==='Ezra' ? u('bandEzra') : u('band', {c:b.ch}); b.el.title = b.el.textContent; });
  var ticks = $('ticks'); ticks.textContent='';
  bands.forEach(function(bd){
    var sp = document.createElement('span');
    sp.textContent = bd.ch==='Ezra' ? u('tickEzra') : (bd.ch==='1' ? u('tick1') : bd.ch);
    if(['9','11'].indexOf(bd.ch)>=0) sp.className='minor';
    sp.style.left = (bd.s/(N-1)*100)+'%';
    ticks.appendChild(sp);
  });
  var lg = $('legend'); lg.textContent='';
  Object.keys(PH).forEach(function(k){
    var sp=document.createElement('span'), dot=document.createElement('i');
    dot.style.setProperty('--c', PH[k].c);
    sp.appendChild(dot); sp.appendChild(document.createTextNode(tx(PH[k],'n'))); lg.appendChild(sp);
  });
}
function layoutTL(){
  var narrow = view.clientWidth < 560;
  cw = narrow ? Math.round(clamp(view.clientWidth*0.72, 176, 226)) : 226; gap = narrow ? 12 : 14; stepW = cw+gap;
  track.style.setProperty('--cw', cw+'px');
  cards.forEach(function(c,i){ c.style.left = (i*stepW)+'px'; });
  axis.style.width = ((N-1)*stepW+cw)+'px';
  bands.forEach(function(b){ b.el.style.left=(b.s*stepW)+'px'; b.el.style.width=((b.e-b.s)*stepW+cw)+'px'; });
}
function renderTL(){
  var x = view.clientWidth/2 - (pos*stepW + cw/2);
  track.style.transform = 'translate3d('+x.toFixed(1)+'px,0,0)';
  scrub.value = String(clamp(pos,0,N-1));
  if(quiet) return;
  var idx = clamp(Math.round(pos),0,N-1);
  if(idx!==active) select(idx);
}
function select(i){
  var first = active < 0;
  active = i;
  cards.forEach(function(c,k){ c.classList.toggle('active', k===i); });
  bands.forEach(function(b){ b.el.classList.toggle('cur', i>=b.s && i<=b.e); });
  userView = null;
  showDetail(EV[i], i);
  showMap(EV[i], !first);
  syncNav();
}
function stopTL(){ cancelAnimationFrame(tlRAF); quiet=false; }
function animateTo(target){
  target = clamp(Math.round(target),0,N-1); stopTL();
  var from = pos;
  if(Math.abs(target-from) > 1.5){ select(target); quiet = true; }
  if(reduced || Math.abs(target-from) < 0.001){ pos=target; quiet=false; renderTL(); return; }
  var dur = Math.min(700, 240+Math.abs(target-from)*60), t0 = performance.now();
  function fr(now){
    var t = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-t,3);
    pos = from+(target-from)*e; renderTL();
    if(t<1) tlRAF = requestAnimationFrame(fr); else { quiet=false; pos=target; renderTL(); }
  }
  tlRAF = requestAnimationFrame(fr);
}
function matches(i){ return !filter || EV[i].pp.indexOf(filter)>=0; }
function prevIdx(i){ for(var k=i-1;k>=0;k--) if(matches(k)) return k; return null; }
function nextIdx(i){ for(var k=i+1;k<N;k++) if(matches(k)) return k; return null; }
function go(d){ var t = d<0 ? prevIdx(active) : nextIdx(active); if(t!==null) animateTo(t); }
$('prev').addEventListener('click', function(){ go(-1); });
$('next').addEventListener('click', function(){ go(1); });
function syncNav(){
  var noPrev = prevIdx(active)===null, noNext = nextIdx(active)===null;
  $('prev').disabled = noPrev; $('next').disabled = noNext;
  $('mprev').disabled = noPrev; $('mnext').disabled = noNext;
  if(active >= 0){ $('mCount').textContent = u('scene', {i:active+1, n:N}); $('mTitle').textContent = tx(EV[active],'t'); }
}
$('mprev').addEventListener('click', function(){ go(-1); });
$('mnext').addEventListener('click', function(){ go(1); });
$('mMid').addEventListener('click', function(){ $('detail').scrollIntoView({behavior: reduced?'auto':'smooth', block:'start'}); });

var drag = null;
view.addEventListener('pointerdown', function(e){
  if(e.button!==0) return;
  stopTL();
  drag = {x:e.clientX, pos:pos, moved:false, lastX:e.clientX, lastT:e.timeStamp, v:0, card:e.target.closest ? e.target.closest('.card') : null, id:e.pointerId};
  try{ view.setPointerCapture(e.pointerId); }catch(err){}
});
view.addEventListener('pointermove', function(e){
  if(!drag) return;
  var dx = e.clientX - drag.x;
  if(!drag.moved && Math.abs(dx) > 5){ drag.moved = true; view.classList.add('dragging'); }
  if(!drag.moved) return;
  var p = drag.pos - dx/stepW;
  if(p<0) p = p*0.35; if(p>N-1) p = (N-1)+(p-(N-1))*0.35;
  pos = p;
  var dt = e.timeStamp - drag.lastT;
  if(dt>0){ drag.v = 0.7*drag.v + 0.3*((e.clientX-drag.lastX)/dt); }
  drag.lastX = e.clientX; drag.lastT = e.timeStamp;
  renderTL();
});
function endDrag(e){
  if(!drag) return;
  var d = drag; drag = null; view.classList.remove('dragging');
  try{ view.releasePointerCapture(d.id); }catch(err){}
  if(!d.moved){ if(d.card) animateTo(+d.card.dataset.i); return; }
  var fling = (e && e.timeStamp - d.lastT < 80) ? d.v : 0;
  animateTo(pos - fling*220/stepW);
}
view.addEventListener('pointerup', endDrag);
view.addEventListener('pointercancel', function(e){ if(drag && !drag.moved){ drag.card = null; } endDrag(e); });
view.addEventListener('lostpointercapture', function(){ if(drag) endDrag(null); });

var wheelT = 0;
view.addEventListener('wheel', function(e){
  var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if(e.deltaMode===1) d *= 16;
  if(!d) return;
  if((pos<=0.001 && d<0) || (pos>=N-1-0.001 && d>0)) return;
  e.preventDefault(); stopTL();
  pos = clamp(pos + d/(stepW*0.9), 0, N-1); renderTL();
  clearTimeout(wheelT); wheelT = setTimeout(function(){ animateTo(Math.round(pos)); }, 160);
}, {passive:false});

view.addEventListener('keydown', function(e){
  if(e.key==='ArrowRight'){ e.preventDefault(); go(1); }
  else if(e.key==='ArrowLeft'){ e.preventDefault(); go(-1); }
  else if(e.key==='Home'){ e.preventDefault(); animateTo(0); }
  else if(e.key==='End'){ e.preventDefault(); animateTo(N-1); }
});
scrub.addEventListener('input', function(){ stopTL(); pos = +scrub.value; renderTL(); });
scrub.addEventListener('change', function(){ animateTo(Math.round(+scrub.value)); });

/* ---------- people filter + cast ---------- */
var castEls = {};
function renderFilter(){
  var f = $('filter');
  if(filter){
    var count = EV.filter(function(ev){ return ev.pp.indexOf(filter)>=0; }).length;
    f.innerHTML = esc(u(count===1?'filter1':'filter', {name: tx(PEOPLE[filter],'n'), n: count}))+' <button type="button" aria-label="'+esc(u('clear'))+'">×</button>';
    f.hidden = false; f.querySelector('button').addEventListener('click', function(){ setFilter(filter); });
  } else f.hidden = true;
}
function setFilter(pid){
  filter = (filter===pid) ? null : pid;
  cards.forEach(function(c,i){ var has = !!filter && EV[i].pp.indexOf(filter)>=0; c.classList.toggle('match', has); c.classList.toggle('dim', !!filter && !has); });
  renderFilter();
  showDetail(EV[active], active);
  Object.keys(castEls).forEach(function(k){ castEls[k].classList.toggle('on', k===filter); castEls[k].querySelector('.pname').setAttribute('aria-pressed', k===filter?'true':'false'); });
  syncNav();
  if(filter && !matches(active)){ var n = nextIdx(active); if(n===null) n = prevIdx(active); if(n!==null) animateTo(n); }
}
function renderCast(){
  var grid = $('cast'); grid.textContent=''; castEls = {};
  Object.keys(PEOPLE).forEach(function(pid){
    var idxs = []; EV.forEach(function(ev,i){ if(ev.pp.indexOf(pid)>=0) idxs.push(i); });
    var card = document.createElement('div'); card.className='person'+(filter===pid?' on':'');
    var nb = document.createElement('button'); nb.type='button'; nb.className='pname'; nb.textContent=tx(PEOPLE[pid],'n'); nb.setAttribute('aria-pressed', filter===pid?'true':'false');
    nb.addEventListener('click', function(){ setFilter(pid); view.scrollIntoView({behavior: reduced?'auto':'smooth', block:'center'}); });
    var p = document.createElement('p'); p.textContent = tx(PEOPLE[pid],'r');
    var apps = document.createElement('div'); apps.className='apps';
    idxs.forEach(function(i){
      var b = document.createElement('button'); b.type='button'; b.textContent = tx(EV[i],'t'); b.title = tx(EV[i],'ref');
      b.addEventListener('click', function(){ animateTo(i); frame.scrollIntoView({behavior: reduced?'auto':'smooth', block:'start'}); });
      apps.appendChild(b);
    });
    card.appendChild(nb); card.appendChild(p); card.appendChild(apps); grid.appendChild(card);
    castEls[pid] = card;
  });
}

/* ---------- apply language ---------- */
var langBtns = Array.prototype.slice.call(document.querySelectorAll('#langGroup button'));
function applyLang(){
  document.documentElement.lang = lang;
  document.title = u('docTitle');
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function(el){ el.textContent = u(el.getAttribute('data-i18n')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-html]'), function(el){ el.innerHTML = u(el.getAttribute('data-i18n-html')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function(el){ el.setAttribute('aria-label', u(el.getAttribute('data-i18n-aria'))); });
  $('langGroup').setAttribute('aria-label', u('langGroup'));
  langBtns.forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-lang')===lang ? 'true':'false'); });
  renderRL();
  Object.keys(placeEls).forEach(function(id){ placeEls[id]._t.textContent = tx(PL[id],'n'); });
  gateEls.forEach(function(g){ var gd = GI[g.dataset.id]; g._t.textContent = tx(gd,'n'); g.setAttribute('aria-label', u('gateAria', {name: tx(gd,'n')})); });
  clEls.forEach(function(g){ g._t.textContent = (lang==='ko' && g._l.ko) ? g._l.ko : g._l.t; });
  cpEls.forEach(function(g){ g._t.textContent = (lang==='ko' && g._l.ko) ? g._l.ko : g._l.t; });
  renderCards();
  renderCast();
  renderFilter();
  if(active >= 0){
    showDetail(EV[active], active);
    showMap(EV[active], false);
    syncNav();
    if(selGate) openGate(selGate);
  }
  if(vbCur) applyRegionUI();
}
langBtns.forEach(function(b){
  b.addEventListener('click', function(){
    var l = b.getAttribute('data-lang'); if(l===lang) return;
    lang = l;
    try { localStorage.setItem('nehemiah-lang', lang); } catch(err){}
    applyLang();
  });
});

/* ---------- boot & resize ---------- */
function relayout(){
  layoutTL(); renderTL();
  if(!region.hidden && vbCur){ var v=VIEWS[curRegionView]; vbAnim++; vbCur = fit(v.rect, v.core, EXT, frameAspect()); applyRegionUI(); }
  if(!city.hidden) layoutCity();
}
applyLang();
layoutTL();
pos = START; renderTL();
if(window.ResizeObserver){ var ro = new ResizeObserver(function(){ relayout(); }); ro.observe(frame); ro.observe(view); }
else window.addEventListener('resize', relayout);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ relayout(); });
})();
