import { useState } from "react";

const FONTS = "";

const C = {
  bg:      "#080C12",
  bone:    "#F8F6F0",
  bone2:   "rgba(248,246,240,0.52)",
  bone3:   "rgba(248,246,240,0.18)",
  bone4:   "rgba(248,246,240,0.07)",
  gold:    "#D4A94E",
  gold2:   "rgba(212,169,78,0.30)",
  teal:    "#4A7A76",
  coral:   "#C97A71",
  saffron: "#C9A65A",
  mint:    "#8DB9AE",
  tealBg:    "#060E0D",
  coralBg:   "#100808",
  saffronBg: "#0E0C06",
  mintBg:    "#060E0C",
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

const css = [
  "* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; margin:0; padding:0; }",
  "::-webkit-scrollbar { width:0; height:0; }",
  "@keyframes fadeIn { from{opacity:0} to{opacity:1} }",
  "@keyframes riseIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }",
  ".fade { animation:fadeIn 0.35s ease both; }",
  ".rise { animation:riseIn 0.38s cubic-bezier(0.22,1,0.36,1) both; }",
  ".grain::after { content:'';position:fixed;inset:0;pointer-events:none;z-index:998;opacity:0.025; background-size:200px 200px; }",
].join(" ");

// ─── RIBBONS ──────────────────────────────────────────────────────────────────
function Ribbons({ opacity=1 }) {
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden",opacity}}>
      <svg viewBox="0 0 480 900" preserveAspectRatio="xMidYMid slice"
        style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        <defs>
          <filter id="rb"><feGaussianBlur stdDeviation="10"/></filter>
          <linearGradient id="gt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A7A76" stopOpacity="0.70"/>
            <stop offset="100%" stopColor="#4A7A76" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gc" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C97A71" stopOpacity="0.72"/>
            <stop offset="100%" stopColor="#C97A71" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gs" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#C9A65A" stopOpacity="0.65"/>
            <stop offset="100%" stopColor="#C9A65A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gm" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8DB9AE" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#8DB9AE" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Teal — upper left diagonal sweep */}
        <path d="M-60,80 C80,20 200,180 380,120 C460,90 500,160 560,140 L560,240 C480,260 420,180 280,240 C140,300 40,160 -60,200Z"
          fill="url(#gt)" filter="url(#rb)"/>
        {/* Coral — upper right */}
        <path d="M560,0 C400,60 300,20 180,100 C80,160 20,80 -60,120 L-60,20 C40,-20 120,60 240,0 C360,-60 440,20 560,-80Z"
          fill="url(#gc)" filter="url(#rb)"/>
        {/* Saffron — lower right */}
        <path d="M560,620 C420,560 300,680 160,640 C60,612 -20,700 -60,680 L-60,800 C20,820 80,740 200,780 C340,820 440,720 560,780Z"
          fill="url(#gs)" filter="url(#rb)"/>
        {/* Mint — lower left */}
        <path d="M-60,700 C60,640 180,760 320,700 C420,658 480,720 560,700 L560,800 C460,820 380,760 260,800 C140,840 40,760 -60,800Z"
          fill="url(#gm)" filter="url(#rb)"/>
      </svg>
    </div>
  );
}

// ─── AURORA — direction pages ─────────────────────────────────────────────────
function Aurora({ color, dir }) {
  const c = color.slice(0, color.lastIndexOf(","));
  const g = (rx,ry,x,y,op) =>
    "radial-gradient(ellipse " + rx + " " + ry + " at " + x + " " + y + ", " + c + "," + op + ") 0%, transparent 55%)";
  const maps = {
    north:[g("110%","85%","115%","95%",0.58),g("70%","50%","90%","75%",0.34),g("80%","55%","100%","110%",0.24)],
    east: [g("90%","100%","108%","35%",0.64),g("60%","60%","95%","10%",0.38),g("65%","55%","110%","72%",0.28)],
    south:[g("110%","90%","55%","110%",0.60),g("70%","60%","95%","85%",0.36),g("60%","55%","20%","105%",0.24)],
    west: [g("95%","85%","110%","60%",0.52),g("65%","55%","100%","95%",0.32),g("55%","50%","85%","25%",0.20)],
  };
  return <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,background:(maps[dir]||maps.east).join(",")}}/>; 
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Cap = ({children,color=C.bone3,style={}}) => (
  <div style={{fontFamily:sans,fontSize:8,fontWeight:500,letterSpacing:"0.26em",textTransform:"uppercase",color,...style}}>{children}</div>
);

const Rule = ({style={}}) => <div style={{height:1,background:C.bone3,...style}}/>;

const BackBtn = ({onBack}) => (
  <button onClick={onBack} style={{background:"transparent",border:"none",color:C.bone2,
    fontSize:8,fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",cursor:"pointer",fontFamily:sans,padding:"6px 0"}}>
    ← Back
  </button>
);

const Star = ({size=18,style={}}) => (
  <div style={{fontSize:size,color:C.gold,lineHeight:1,
    textShadow:"0 0 18px " + C.gold + ", 0 0 40px " + C.gold2,...style}}>✦</div>
);

// ─── NAV ROW ─────────────────────────────────────────────────────────────────
function NavRow({label,sub,onPress,delay=0}) {
  const [hov,setHov] = useState(false);
  return (
    <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onPress}
      className="rise"
      style={{animationDelay:delay + "s",width:"100%",background:"transparent",border:"none",
        borderBottom:"1px solid " + C.bone3,padding:"20px 0",cursor:"pointer",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        textAlign:"left",opacity:hov?1:0.68,transition:"opacity 0.18s"}}>
      <div style={{textAlign:"left"}}>
        <div style={{fontFamily:serif,fontWeight:300,fontSize:24,color:C.bone,lineHeight:1.15}}>{label}</div>
        {sub&&<div style={{fontFamily:sans,fontSize:11,color:C.bone2,marginTop:4,opacity:0.7}}>{sub}</div>}
      </div>
      <div style={{fontSize:16,color:C.bone2,opacity:0.5,marginLeft:16,flexShrink:0}}>→</div>
    </button>
  );
}

// ─── DIRECTION PAGE SHELL ─────────────────────────────────────────────────────
function DirPage({dir,title,subhead,bg,aurora,items,onBack,onGo}) {
  return (
    <div style={{position:"relative",background:bg,minHeight:"100vh",overflowY:"auto"}} className="fade">
      <Aurora color={aurora} dir={dir}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{padding:"28px 32px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <BackBtn onBack={onBack}/>
          <Star size={13} style={{opacity:0.45}}/>
        </div>
        <div style={{padding:"40px 32px 0"}}>
          <Cap color={C.bone2} style={{marginBottom:12}}>{dir.toUpperCase()}</Cap>
          <div style={{fontFamily:serif,fontWeight:300,fontSize:88,color:C.bone,
            letterSpacing:"-0.02em",lineHeight:0.86,marginBottom:14}}>{title}</div>
          <div style={{fontFamily:serif,fontStyle:"italic",fontSize:16,color:C.bone2,lineHeight:1.55}}>{subhead}</div>
        </div>
        <Rule style={{margin:"30px 32px 0"}}/>
        <div style={{padding:"0 32px 80px"}}>
          {items.map((item,i)=>{
            if(item.type==="heading") return <Cap key={i} style={{marginTop:32,color:C.bone3}}>{item.label}</Cap>;
            return <NavRow key={i} label={item.label} sub={item.sub} delay={i*0.04} onPress={()=>onGo&&onGo(item.id)}/>;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────
function DetailPage({title,dir,bg,aurora,onBack,children}) {
  return (
    <div style={{position:"relative",background:bg,minHeight:"100vh",overflowY:"auto"}} className="fade">
      <Aurora color={aurora} dir={dir}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{padding:"28px 32px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <BackBtn onBack={onBack}/><Star size={13} style={{opacity:0.45}}/>
        </div>
        <div style={{padding:"36px 32px 0"}}>
          <Cap color={C.bone2} style={{marginBottom:12}}>{dir.toUpperCase()}</Cap>
          <div style={{fontFamily:serif,fontWeight:300,fontSize:52,color:C.bone,
            letterSpacing:"-0.01em",lineHeight:0.92,marginBottom:32}}>{title}</div>
        </div>
        <Rule style={{margin:"0 32px"}}/>
        <div style={{padding:"0 32px 80px"}}>{children}</div>
      </div>
    </div>
  );
}

// ─── CONTENT ROWS ─────────────────────────────────────────────────────────────
function ContentRow({name,detail,note,accent=C.bone2,url}) {
  return (
    <div style={{borderBottom:"1px solid " + C.bone3,padding:"20px 0"}}>
      <div style={{fontFamily:serif,fontSize:21,color:C.bone,marginBottom:5,lineHeight:1.2}}>{name}</div>
      {detail&&<div style={{fontFamily:sans,fontSize:11,color:accent,marginBottom:7,letterSpacing:"0.04em"}}>{detail}</div>}
      {note&&<div style={{fontFamily:sans,fontSize:12,color:C.bone2,lineHeight:1.75,opacity:0.8}}>{note}</div>}
      {url&&<a href={url} target="_blank" rel="noopener noreferrer"
        style={{display:"inline-block",marginTop:10,fontFamily:sans,fontSize:9,
          color:accent,letterSpacing:"0.12em",textTransform:"uppercase",
          textDecoration:"none",opacity:0.7,borderBottom:"1px solid currentColor",paddingBottom:1}}>
        Visit ↗
      </a>}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  // TERRITORY
  neighborhoods:[
    // Around the Lakes — water, walkability, classic Minneapolis
    {name:"Kenwood",detail:"Around the Lakes",collection:"lakes",
      note:"Developed by Minneapolis's Gilded Age elite — architects required neighbor approval before building. Never crashed: 2008–2012 saw only 8% decline vs 22% city average.",
      price:"$850K–$1.4M",trend:"+5%",days:6,ratio:"105%",abs:"0.9 mo"},
    {name:"Lowry Hill",detail:"Around the Lakes",collection:"lakes",
      note:"Same architectural era as Kenwood, 20–30% less expensive. Walkable to Walker Art Center and Guthrie.",
      price:"$480K–$720K",trend:"+4%",days:11,ratio:"99%",abs:"2.2 mo"},
    {name:"East Isles",detail:"Around the Lakes",collection:"lakes",
      note:"Lake access without Kenwood price premium. East Isles Farmers Market on Thursdays. Walkable to both the lakes and the Hennepin corridor.",
      price:"$540K–$780K",trend:"+5%",days:10,ratio:"101%",abs:"1.8 mo"},
    {name:"Cedar-Isles-Dean",detail:"Around the Lakes",collection:"lakes",
      note:"One of the first planned lakeside suburbs in America, 1883. Large lots, 28ft height cap. Lake-adjacent blocks outperform in every down cycle. BMS steps away.",
      price:"$720K+",trend:"+6%",days:8,ratio:"103%",abs:"1.4 mo"},
    {name:"Linden Hills",detail:"Around the Lakes",collection:"lakes",
      note:"Best price-per-square-foot relative to quality of life. 44th & Upton village is the city's finest example of a walkable neighborhood center.",
      price:"$580K–$780K",trend:"+7%",days:9,ratio:"101%",abs:"1.6 mo"},
    // Urban Core — density, convenience, city energy
    {name:"North Loop",detail:"Urban Core",collection:"urban",
      note:"Warehouse district converted over 20 years. Spoon and Stable, Bar La Grassa anchored the food scene. Inspect HOA reserves.",
      price:"$380K–$650K",trend:"+3%",days:14,ratio:"98%",abs:"2.8 mo"},
    {name:"Mill District",detail:"Urban Core",collection:"urban",
      note:"Gold Medal Park, Guthrie Theater, and Mill City Farmers Market. Strong long-term position on the river.",
      price:"$320K–$520K",trend:"+5%",days:11,ratio:"100%",abs:"2.1 mo"},
    {name:"Downtown East",detail:"Urban Core",collection:"urban",
      note:"Newest of the downtown districts, built around the stadium. Mostly new-construction high rises. Walk to everything downtown without the North Loop premium.",
      price:"$280K–$480K",trend:"+4%",days:16,ratio:"97%",abs:"3.1 mo"},
    {name:"Loring Park",detail:"Urban Core",collection:"urban",
      note:"The city's most central park, ringed by older high rises and a sizable LGBTQ+ community. Steps from the Walker and the Sculpture Garden.",
      price:"$220K–$420K",trend:"+3%",days:18,ratio:"96%",abs:"3.4 mo"},
    // River & Historic — the city's original crossroads
    {name:"St. Anthony Main",detail:"River & Historic",collection:"river",
      note:"Riverfront + historic district overlays limit new development. North Loop pricing moving east — SAM is 2–3 years behind. Mississippi River access is permanent.",
      price:"$420K–$580K",trend:"+4%",days:12,ratio:"100%",abs:"2.1 mo"},
    {name:"Nicollet Island",detail:"River & Historic",collection:"river",
      note:"An actual island in the Mississippi, walkable from downtown via the Hennepin Avenue Bridge. A small, quiet residential pocket with some of the city's oldest homes.",
      price:"$450K–$650K",trend:"+3%",days:15,ratio:"99%",abs:"2.6 mo"},
    // Connected Neighborhoods — daily life done exceptionally well
    {name:"Kingfield",detail:"Connected Neighborhoods",collection:"connected",
      note:"South Minneapolis bungalow district with strong community identity. Eat Street is the cultural spine.",
      price:"$340K–$520K",trend:"+6%",days:8,ratio:"102%",abs:"1.5 mo"},
    {name:"Fulton",detail:"Connected Neighborhoods",collection:"connected",
      note:"Deeply residential, very low turnover. Lake Harriet proximity without Linden Hills premium.",
      price:"$420K–$640K",trend:"+5%",days:9,ratio:"100%",abs:"1.7 mo"},
    {name:"Tangletown",detail:"Connected Neighborhoods",collection:"connected",
      note:"Curved streets following Minnehaha Creek. Very quiet, stable ownership, low turnover.",
      price:"$480K–$700K",trend:"+5%",days:10,ratio:"100%",abs:"1.9 mo"},
    // Creative Minneapolis — independent culture, makers, local character
    {name:"Whittier",detail:"Creative Minneapolis",collection:"creative",
      note:"The most diverse square mile in the city. Eat Street runs the length of Nicollet Avenue, the Minneapolis Institute of Art sits at its center, and MCAD draws students and working artists to the surrounding blocks.",
      price:"$190K–$420K",trend:"+1%",days:68,ratio:"95%",abs:"3.8 mo"},
    {name:"Northeast Arts District",detail:"Creative Minneapolis",collection:"creative",
      note:"Converted warehouses turned working studios. The Northrup King and Casket Arts buildings anchor a real concentration of practicing artists, not just galleries.",
      price:"$320K–$480K",trend:"+9%",days:7,ratio:"102%",abs:"1.8 mo"},
    {name:"Logan Park",detail:"Creative Minneapolis",collection:"creative",
      note:"A small, leafy Northeast pocket with one of the city's oldest parks at its center. Quieter than the arts district blocks just south of it.",
      price:"$300K–$460K",trend:"+6%",days:12,ratio:"99%",abs:"2.4 mo"},
    {name:"Seward",detail:"Creative Minneapolis",collection:"creative",
      note:"Home to the Seward Co-op and a long tradition of cooperative housing. River-adjacent, bike-forward, and one of the more politically engaged neighborhoods in the city.",
      price:"$340K–$510K",trend:"+5%",days:13,ratio:"99%",abs:"2.3 mo"},
    // Saint Paul — the twin worth knowing
    {name:"Cathedral Hill",detail:"Saint Paul",collection:"stpaul",
      note:"Born in the 1870s along Summit Avenue. The Cathedral of St. Paul anchors one end, the F. Scott Fitzgerald House and the Blair Arcade sit on the National Register at the other. Selby Avenue carries the restaurant and coffee scene.",
      price:"$280K–$900K",trend:"+4%",days:32,ratio:"97%",abs:"2.4 mo"},
    {name:"Summit Hill",detail:"Saint Paul",collection:"stpaul",
      note:"Home to the longest stretch of preserved Victorian residential architecture in the country, including the Minnesota Governor's Residence. Grand Avenue runs through it. Medians regularly exceed $700,000.",
      price:"$450K–$1.2M",trend:"+4%",days:28,ratio:"98%",abs:"2.1 mo"},
    {name:"Mac-Groveland",detail:"Saint Paul",collection:"stpaul",
      note:"College-town energy from Macalester and St. Thomas, tree-lined streets, and Grand Avenue shopping a block away. Walkable in the way few Saint Paul neighborhoods are. Homes typically sell in 30 days.",
      price:"$340K–$750K",trend:"+5%",days:30,ratio:"98%",abs:"1.9 mo"},
    {name:"Lowertown",detail:"Saint Paul",collection:"stpaul",
      note:"19th-century brick warehouses became artist lofts starting in the 1980s, one of the country's first live-work arts districts. CHS Field, Mears Park, the Saturday farmers market, and a Green Line stop all within a few blocks.",
      price:"$220K–$480K",trend:"+6%",days:24,ratio:"98%",abs:"1.7 mo"},
  ],
  beyond:[
    // Lakeside
    {name:"Excelsior",detail:"Lakeside",collection:"beyond-lakeside",
      note:"Founded 1853 on the southern shore of Lake Minnetonka. Walkable downtown, antique shops, lakeside dining at Coalition and the Excelsior Brewing taproom. 20 minutes from downtown Minneapolis. The Village's average sale price passed Wayzata's in 2025.",
      price:"$450K–$5.6M",trend:"+8%",days:24,ratio:"98%",abs:"1.8 mo"},
    {name:"Wayzata",detail:"Lakeside",collection:"beyond-lakeside",
      note:"The crown jewel of Lake Minnetonka's north shore. Walkable Lake Street, the Promenade, top-ranked schools (District 284). Estate neighborhoods like Ferndale and Holdridge carry land values that rival coastal markets.",
      price:"$1.5M–$5M+",trend:"+6%",days:21,ratio:"97%",abs:"2.2 mo"},
    // River Towns
    {name:"Stillwater",detail:"River Towns",collection:"beyond-river",
      note:"The birthplace of Minnesota — the 1848 territorial convention happened on the corner of Myrtle and Main. Eleven blocks of the historic downtown are on the National Register, most buildings dating from the 1860s to 1940s. The 1931 Lift Bridge now carries only bikes and pedestrians across the St. Croix.",
      price:"$320K–$1.2M",trend:"+5%",days:28,ratio:"97%",abs:"2.6 mo"},
    // Main Street Revival
    {name:"Hopkins",detail:"Main Street Revival",collection:"beyond-mainstreet",
      note:"Once known as the Raspberry Capital of the World. 10 miles southwest of downtown Minneapolis with a genuinely walkable Mainstreet of cafes, breweries, and restaurants. The Southwest Light Rail extension will add a stop here.",
      price:"$230K–$590K",trend:"+4%",days:33,ratio:"98%",abs:"2.1 mo"},
    // Classic Lake Community
    {name:"White Bear Lake",detail:"Classic Lake Community",collection:"beyond-classic",
      note:"One of the largest lakes in the metro, with a historic downtown dining district right at the water. Summer brings markets and beachfront concerts; winter brings polar plunges and golf on the frozen lake.",
      price:"$280K–$1.6M",trend:"+5%",days:26,ratio:"97%",abs:"2.3 mo"},
  ],

  hidden:[
    {name:"Father Hennepin Bluff Park",detail:"St. Anthony Main · River overlook",
      note:"The best view of the Stone Arch Bridge and the Minneapolis skyline. Almost no one from outside the neighborhood knows it exists.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/father_hennepin_bluff_park/"},
    {name:"Beard's Plaisance",detail:"Linden Hills · Lake Harriet",
      note:"A sloping lawn above Lake Harriet that fills with picnic blankets on summer evenings. The quiet counterpart to the busy beach.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_harriet_regional_park/"},
    {name:"Bohemian Flats",detail:"Cedar-Isles-Dean · River launch",
      note:"A flat park at river level below the Washington Ave bridge. Kayak launch, morning fog, and almost no one after 8am.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/bohemian_flats/"},
    {name:"Gold Medal Park",detail:"Mill District · Mound with views",
      note:"A small spiral-mound park next to the Guthrie with 360° views of the river and downtown. Almost no one stops here.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/gold_medal_park/"},
    {name:"Boom Island",detail:"Northeast · Mississippi",
      note:"Island park on the Mississippi with skyline views. Dog-friendly. Peaceful. Mostly locals.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/boom_island_park/"},
  ],
  walks:[
    {name:"Chain of Lakes Loop",detail:"13 miles · Paved · Car-free",
      note:"BMS → Lake of the Isles → Cedar Lake → Lake Harriet → Nokomis. The definitive Minneapolis route. Before 8am on weekends for solitude.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/minneapolis_chain_of_lakes_regional_park/"},
    {name:"West River Parkway",detail:"8 miles · Riverfront",
      note:"Along the Mississippi from North Minneapolis to Minnehaha Falls. The city at its most elemental.",url:"https://www.minneapolisparks.org/parks-destinations/trails-parkways/"},
    {name:"Minnehaha Creek Greenway",detail:"Varied · Through Linden Hills",
      note:"Follows the creek through residential neighborhoods. The most beautiful urban waterway walk in the city.",url:"https://www.minneapolisparks.org/parks-destinations/trails-parkways/"},
    {name:"Stone Arch Bridge & Riverfront",detail:"2–4 miles · Downtown",
      note:"The Stone Arch Bridge, the ruins of the mill district, Father Hennepin Bluff. Minneapolis's foundational story on foot."},
    {name:"Kenwood Parkway Loop",detail:"3 miles · Car-free parkway",
      note:"A car-free parkway through the heart of Kenwood. Sunday mornings when the city is still asleep.",url:"https://www.minneapolisparks.org/parks-destinations/trails-parkways/"},
  ],
  

  // SEASON
  festivals:[
    {name:"Twin Cities Pride",detail:"Late June · Free · Downtown Minneapolis",note:"Largest free Pride festival in the country. The whole city comes out.",url:"https://tcpride.org"},
    {name:"Stone Arch Bridge Festival",detail:"June · Free · St. Anthony Main",note:"200+ artists, culinary market, live music along West River Pkwy. Right in St. Anthony Main.",url:"https://stonearchbridgefestival.com"},
    {name:"Minneapolis International Festival",detail:"July 25 · Lake Harriet · Free",note:"Live music, dance, cultural exhibits. Very local, multigenerational.",url:"https://minneapolisfestival.org"},
    {name:"Minneapolis Aquatennial",detail:"Late July · Free · Downtown + lakes",note:"Minneapolis's signature summer celebration. Torchlight Parade, milk carton boat races on Bde Maka Ska, fireworks over the river.",url:"https://aquatennial.com"},
    
    {name:"Minnesota Fringe Festival",detail:"Aug 6–16 · Multiple venues",note:"1,000+ artists, 50 venues. The largest performing arts fringe in the Midwest. Buy a $5 Fringe Button.",url:"https://fringefestival.org"},
    {name:"Uptown Art Fair",detail:"Aug 7–9 · Free · Lake of the Isles Pkwy",note:"300 artists on the parkway bordering CID and Kenwood. The fair draws the neighborhood out — you see exactly who lives here.",url:"https://www.uptownminneapolis.com/uptown-art-fair/"},
    {name:"Powderhorn Art Fair",detail:"Aug 15–17 · Free · Powderhorn Park",note:"More community-rooted than Uptown. More diverse.",url:"https://powderhornartfair.com"},
    {name:"Open Streets Uptown",detail:"Aug 24 · Lyndale Ave 22nd–42nd",note:"Lyndale Ave goes car-free. Walk the spine of the neighborhood without a windshield.",url:"https://www.ourstreetsmn.org/events/open-streets/"},
    {name:"Minnesota State Fair",detail:"Aug 28–Sept 7 · Fairgrounds",note:"1.9M visitors. The ritual that makes Minneapolis locals out of newcomers. Go at least once.",url:"https://mnstatefair.org"},
    {name:"Art-A-Whirl",detail:"May · Northeast Minneapolis · Free",note:"Largest open studio tour in the country. 600+ artists open their Northeast studios. The NE arts district at its best.",url:"https://nemaa.org/art-a-whirl"},
    {name:"Mill City Farmers Market Opening Day",detail:"May · Mill District",note:"The market's opening weekend draws the whole neighborhood. The first Saturday of the season has an energy the rest don't.",url:"https://millcityfarmersmarket.org"},
  ],
  cinema:[
    {name:"Trylon Cinema",detail:"2820 E 33rd St · South Minneapolis",note:"90 seats, no ads, no trailers. Classic films, foreign cinema, director retrospectives. Tickets $8. First-come, first-served.",url:"https://trylon.org"},
    {name:"Riverview Theater",detail:"3800 42nd Ave S · South Minneapolis",note:"1950s neighborhood theater, still running. Classic and contemporary films. Real buttered popcorn. Tickets around $5.",url:"https://riverviewtheater.com"},
    {name:"Parkway Theater",detail:"4814 Chicago Ave · South Minneapolis",note:"Restored 1930s art deco. Films plus live events, themed nights, director Q&As. Full bar on site.",url:"https://theparkwaytheater.com"},
    {name:"Walker Cinema",detail:"Walker Art Center · Downtown",note:"Experimental and artist films in a gallery context. Summer series includes free outdoor screenings on the hillside.",url:"https://walkerart.org/visit/cinema"},
    {name:"St. Anthony Main Theatre",detail:"115 SE Main St · St. Anthony Main",note:"Intimate independent cinema right on the riverfront. Mississippi views before the show.",url:"https://stanthonymain.com"},
  ],
  performances:[
    {name:"Guthrie Theater",detail:"818 S 2nd St · Downtown · Book ahead",note:"Come From Away running now. World-class regional theater. The endless bridge cantilevers over the Mississippi.",url:"https://guthrietheater.org"},
    {name:"Orpheum Theatre",detail:"910 Hennepin Ave · Downtown · Touring Broadway",note:"1921 Beaux Arts theater, 2,579 seats. Touring Broadway runs here — Wicked, Hamilton, The Sound of Music. Originally a vaudeville house; Bob Dylan once owned it.",url:"https://hennepinarts.org/venues/orpheum-theatre"},
    {name:"State Theatre",detail:"805 Hennepin Ave · Downtown",note:"Sister venue to the Orpheum on the same Hennepin Avenue theater row. Concerts, comedy, and touring productions in a restored 1921 movie palace.",url:"https://hennepinarts.org/venues/state-theatre"},
    {name:"First Avenue",detail:"701 1st Ave N · Downtown",note:"Prince's home venue. Still the heart of the Minneapolis music scene.",url:"https://first-avenue.com"},
    {name:"Lake Harriet Bandshell",detail:"Sundays all summer · Free",note:"Free concerts every Sunday evening. Blanket on the grass. Shows up every Sunday and becomes essential.",url:"https://minneapolisparks.org/bandshell"},
    {name:"Children's Theatre Company",detail:"2400 3rd Ave S",note:"One of the leading children's theaters in the country. Worth knowing if you have kids in your life.",url:"https://childrenstheatre.org"},
  ],
  exhibitions:[
    {name:"Minneapolis Institute of Art",detail:"2400 3rd Ave S · Free",note:"90,000+ works across 5,000 years. Free general admission always. The Asian art collection and the Van Gogh are the anchors.",url:"https://artsmia.org"},
    {name:"Walker Art Center",detail:"725 Vineland Pl · Downtown",note:"Contemporary and modern art. Sculpture Garden is free. Skyline Mini Golf in summer (artist-designed holes).",url:"https://walkerart.org"},
    {name:"Mill City Museum",detail:"704 S 2nd St · Mill District",note:"Carved out of the ruins of the world's largest flour mill. Minneapolis's own story told in the building where it happened.",url:"https://millcitymuseum.org"},
    {name:"Weisman Art Museum",detail:"333 E River Rd · U of M Campus · Free",note:"Frank Gehry building on the Mississippi bluff. Free. The building alone is worth seeing from the river.",url:"https://wam.umn.edu"},
    {name:"American Swedish Institute",detail:"2600 Park Ave · South Minneapolis",note:"1908 mansion turned Nordic cultural center. Changing exhibitions plus a permanent collection of Nordic design.",url:"https://asimn.org"},
    {name:"The Bakken Museum",detail:"3537 Zenith Ave S · West BMS · Free Fridays",note:"On the west shore of Bde Maka Ska. Science, electricity, and Frankenstein in a historic mansion.",url:"https://thebakken.org"},
    {name:"Northrup King Building",detail:"1500 Jackson St NE · Northeast",note:"150+ artists and designers in a converted seed warehouse. Open Saturdays. The heart of the NE arts district.",url:"https://northrupkingbuilding.com"},
  ],
  
  
  

  // GATHER
  classes:[
    {name:"Cooks of Crocus Hill",detail:"210 N 1st St · North Loop · Cooking school",note:"The North Loop location is now entirely a cooking school. Classes range from knife skills to full-day Italian workshops. Date nights, team events, guest chefs.",url:"https://cooksofcrocushill.com"},
    {name:"Bakehouse",detail:"St. Louis Park · Baking classes",note:"Sister space to Honey and Rye bakery. Build-a-cake date nights, bagels 101, focaccia at home.",url:"https://honeyandrye.com/bakehouse"},
    {name:"France 44 Wines & Spirits",detail:"4351 France Ave S · South Minneapolis",note:"Wine and spirits classes in South Minneapolis. Fresh mozzarella, stuffed pastas, pizza nights.",url:"https://france44.com"},
    {name:"Mill City Farmers Market",detail:"Saturdays · Free cooking demos",note:"Free cooking demos on-site at the market most Saturdays. Local chefs, seasonal ingredients.",url:"https://millcityfarmersmarket.org"},
  ],

  // TABLE
  markets:[
    {name:"Mill City Farmers Market",detail:"Sat 8am–1pm · 750 S 2nd St",url:"https://www.millcityfarmersmarket.org",
      note:"The market locals recommend first. Arrive at opening. Free yoga on-site. Steps from Stone Arch Bridge."},
    {name:"Minneapolis Farmers Market",detail:"Sat–Sun 6am–1pm · 312 E Lyndale · Largest",
      note:"Largest open-air market in Minnesota. Go early — best selection is gone by 9am.",url:"https://www.mplsfarmersmarket.com"},
    {name:"Markets on Main",detail:"Sun 10am–2pm · 1 SE Main St · SAM",
      note:"Right in St. Anthony Main. Local food, vintage, makers on Riverplace Plaza with the best downtown river views.",url:"https://www.riverplace.com/markets"},
    {name:"East Isles Market",detail:"Thu 4–8pm · MoZaic, Lagoon & Girard · Weekday",
      note:"The most CID-adjacent weekday market. A preview of what Thursdays look like if you buy in the neighborhood.",url:"https://www.uptownminneapolis.com/events/farmers-market"},
    {name:"Linden Hills Market",detail:"Sun 10am–1pm · 2813 W 43rd · Hyper-local",
      note:"Small, community-rooted, rain or shine. Exactly the crowd you'd be living among.",url:"https://www.lindenhillsmarket.com"},
    {name:"Midtown Farmers Market",detail:"Sat 9am–1pm · 2225 E Lake St · Community",
      note:"Live music, fitness classes, puppet theater. Very neighborhood.",url:"https://www.midtownfarmersmarket.org"},
  ],
  makers:[
    {name:"Alemar Cheese",detail:"Mankato · Find at Mill City Market",
      note:"Minnesota's finest artisan cheese. The Bent River camembert is the one to try. Find at Mill City Market and specialty grocers.",url:"https://www.alemarcheese.com"},
    {name:"Bare Honey",detail:"Minneapolis · Farmers markets + specialty stores",
      note:"Raw honey from Minneapolis-area apiaries. Seasonal varietals."},
    {name:"Baker's Field",detail:"Northeast Minneapolis · Mill-to-table",
      note:"Grain milled on-site, baked daily. Minnesota-grown wheat.",url:"https://www.bakersfieldflourandbread.com"},
    {name:"Copperwing Distillery",detail:"St. Louis Park · Tours available",
      note:"Minnesota whiskey and vodka. Tours available. A genuine local spirit.",url:"https://www.copperwingdistillery.com"},
    {name:"Indeed Brewing",detail:"Northeast Minneapolis · Taproom + patio",
      note:"Northeast's anchor brewery. The patio is essential in summer. The social fabric of the neighborhood.",url:"https://www.indeedbrewing.com"},
    {name:"Bauhaus Brew Labs",detail:"Northeast Minneapolis · German-influenced",
      note:"German-influenced. The space is worth seeing.",url:"https://www.bauhausbrewlabs.com"},
    {name:"Kramarczuk's",detail:"215 E Hennepin Ave · NE Minneapolis · Since 1954",
      note:"Ukrainian sausage, deli, and bakery in Northeast. James Beard America's Classic 2013. Smoked sausages made in-house.",url:"https://www.kramarczuks.com"},
    {name:"Broders' Cucina Italiana",detail:"50th & Penn · Southwest Minneapolis",
      note:"Family-owned Italian deli since 1982. Fresh pasta, house-made sauces, imported market goods. A genuine neighborhood institution.",url:"https://www.broders.com"},
  ],
  coffee:[
    {name:"Isles Bun & Coffee",detail:"Uptown / CID · The cardamom bun",
      note:"The neighborhood anchor for Cedar-Isles-Dean. The cardamom bun. Start here.",url:"https://www.islesbun.com"},
    {name:"Dogwood Coffee",detail:"NE Minneapolis + multiple",
      note:"Precision roasting. Good single origins. The Northeast neighborhood café.",url:"https://www.dogwoodcoffee.com"},
    {name:"Spyhouse Coffee",detail:"Uptown + Hennepin + NE · Institution",
      note:"On-site roasting. Multiple neighborhood locations.",url:"https://www.spyhousecoffee.com"},
    {name:"Quince",detail:"Near CID / Kenwood · Quiet",
      note:"The quiet café for the Kenwood corridor. Worth finding before you move in."},
    {name:"Café Alma",detail:"University area · Serious",
      note:"Serious coffee, serious pastry. Connected to one of the city's best restaurants."},
    {name:"Five Watt Coffee",detail:"Kingfield · Creative drinks",
      note:"Cocktail-inspired signature drinks, bitters, house syrups. A Kingfield institution since the neighborhood's earliest coffee days.",url:"https://fivewattcoffee.com"},
    {name:"Fawkes Alley Coffee",detail:"Loring Park · Nonprofit café",
      note:"Hidden in a historic brick alley. Every purchase funds youth soccer through Futsal Society.",url:"https://www.fawkesalleycoffee.com"},
    {name:"FRGMNT Coffee",detail:"North Loop / Mill District / St. Anthony Main",
      note:"Multi-roaster cafe with several Minneapolis locations, each tied to a different neighborhood.",url:"https://frgmntcoffee.com"},
    {name:"SK Coffee",detail:"Whittier · Plant-filled and warm",
      note:"A genuine neighborhood gem with a plant wall, local art, and reliably good pour-overs.",url:"https://sk-coffee-whittier.goto-where.com"},
    {name:"Mojo Coffee Gallery",detail:"Northeast Arts District · California Building",
      note:"Coffee inside one of Northeast's original artist studio buildings. Breakfast and brunch too."},
    {name:"Nina's Coffee Café",detail:"Cathedral Hill · Selby Avenue",
      note:"The corner that's anchored the neighborhood's coffee culture for decades."},
    {name:"Munkabeans",detail:"Hopkins · Mainstreet · Since 1996",
      note:"Fun, funky coffeehouse on Hopkins Mainstreet. Voted best soups in town.",url:"https://www.munkabeans.com"},
    {name:"Anchor Coffee House",detail:"White Bear Lake · Downtown",
      note:"The neighborhood's go-to coffee spot, right in downtown White Bear Lake."},
    {name:"The Lobby Coffee & Leisure",detail:"Excelsior · Historic space",
      note:"Elegant service, real china mugs, a gorgeous historic Excelsior building.",url:"https://www.thelobbycoffee.com"},
    {name:"Toastique",detail:"Wayzata · Lakeside",
      note:"Gourmet toasts and espresso a short walk from the Lake Minnetonka shoreline.",url:"https://toastique.com/pages/wayzata"},
  ],
  bakeries:[
    {name:"Patisserie 46",detail:"4606 Nicollet Ave · Linden Hills · Best in city",
      note:"French-influenced. Croissant, kouign-amann. The sandwich lunch is the move.",url:"https://www.patisserie46.com"},
    {name:"Isles Bun & Coffee",detail:"Uptown / CID · Swedish-inspired",
      note:"The cardamom bun. Swedish-inspired. The neighborhood bakery for CID.",url:"https://www.islesbun.com"},
    
    {name:"Baker's Field",detail:"NE Minneapolis · Grain-to-loaf",
      note:"Grain milled on-site, baked daily. Minnesota-grown wheat."},
    {name:"Rustica Bakery",detail:"Multiple locations · Minneapolis",
      note:"Naturally leavened breads and pastries. Multiple neighborhood locations.",url:"https://www.rusticabakery.com"},
    {name:"Sun Street Breads",detail:"Kingfield · Local institution",
      note:"High-quality naturally leavened bread. The neighborhood bakery for south Minneapolis.",url:"https://www.sunstreetbreads.com"},
    {name:"Diane's Place",detail:"Northeast Arts District · James Beard",
      note:"Pastry chef Diane Moua's Hmong-influenced croissants and Danishes. Worth the detour."},
    {name:"Cafe Latte",detail:"Mac-Groveland · Grand Avenue institution",
      note:"Soups, salads, sandwiches, desserts. A Grand Avenue fixture for decades."},
  ],
  restaurants:[
    // Been there
    {name:"Rosalia",detail:"Linden Hills · Been there",
      note:"Neapolitan-style pizza and Mediterranean sides from chef Daniel del Prado. Wood-fired crust, beet salad on avocado tahini. The patio is the move in summer.",url:"https://rosaliapizza.com"},
    {name:"Le Burger 4304",detail:"Linden Hills · Been there",
      note:"French-inspired burgers from two Bachelor Farmer alumni. Wagyu smash burgers, three-times-cooked fries, soft serve. Order the Le Boeuf.",url:"https://www.leburger4304.com"},
    {name:"Colita",detail:"Linden Hills · Been there",
      note:"Upscale Mexican from the same chef behind Rosalia and Porzana. Refined, a little bougie, worth dressing up for.",url:"https://colitarestaurant.com"},
    {name:"Lake & Irving",detail:"Uptown · Been there",
      note:"Asian meets Mediterranean meets Minnesotan. The Loco Moco, the Luxe Burger, the Jungle Bird cocktail. Reliable neighborhood spot with a patio.",url:"https://www.lakeandirving.com"},
    // Want to try
    {name:"Vinai",detail:"North Loop · Want to try · Book ahead",
      note:"Chef Yia Vang's Hmong restaurant. The restaurant people keep bringing up. Personal storytelling through food.",url:"https://www.vinaimn.com"},
    {name:"Spoon and Stable",detail:"North Loop · Want to try · James Beard",
      note:"Gavin Kaysen's flagship. The room is worth it. Get the bison tartare.",url:"https://www.spoonandstable.com"},
    {name:"Porzana",detail:"North Loop · Want to try · Date night",
      note:"Argentinian steakhouse by Daniel Del Prado. Refined, lively. Opened this year. Already busy.",url:"https://www.porzanampls.com"},
    {name:"Jook Sing at Steady Pour",detail:"NE Minneapolis · Want to try",
      note:"Modern Chinese-American, ever-changing menu. Go without a plan. What the neighborhood actually talks about.",url:"https://www.jooksingmn.com"},
    {name:"Mama Safia's",detail:"Lake Street · Want to try · Institution",
      note:"Legendary Somali restaurant. A long-running anchor on Lake Street.",url:"https://www.mamasafias.com"},
    {name:"Mestiizo",detail:"Northeast · Want to try · Buzzy",
      note:"Mexican-Asian fusion. The Nameless Martini (yuzu gin + tepache vermouth). Order it.",url:"https://www.mestiizorestaurant.com"},
    {name:"World Street Kitchen",detail:"Lyndale Ave · Want to try",
      note:"The Currito. People have been eating it for years.",url:"https://www.eatwsk.com"},
    {name:"Khâluna",detail:"Kingfield · Laotian · Chef Ann Ahmed",
      note:"Resort atmosphere, colorful plates, a bridge between Minneapolis and Laos.",url:"https://khaluna.com"},
    {name:"Bûcheron",detail:"Kingfield · French-American",
      note:"2025 James Beard Award for Best New Restaurant. Lumberjack-inspired, technically serious.",url:"https://www.bucheronrestaurant.com"},
    {name:"Gai Noi",detail:"Loring Park · Laotian · No reservations",
      note:"Chef Ann Ahmed's second Laotian restaurant. Packed since the day it opened.",url:"https://www.gainoimpls.com"},
    {name:"Bar La Grassa",detail:"North Loop · Fresh pasta",
      note:"Dark, loud, energetic. The neighborhood standard for pasta for over a decade."},
    {name:"Aster Café",detail:"St. Anthony Main · Riverfront patio",
      note:"Cobblestone street, skyline views, the social anchor of the neighborhood."},
    {name:"Nicollet Island Inn",detail:"Nicollet Island · Best of everything",
      note:"Best view, best brunch, best business lunch — frequently named all three."},
    {name:"Wise Acre Eatery",detail:"Tangletown · Farm-to-table",
      note:"Seasonal menu on the curved streets near Minnehaha Creek."},
    {name:"Quang Restaurant",detail:"Whittier · Eat Street · Vietnamese",
      note:"Pho, bubble tea, banh mi — a decades-running Eat Street institution."},
    {name:"The Copper Hen",detail:"Whittier · Best reviewed",
      note:"Whittier's highest-rated restaurant by local consensus."},
    {name:"Seward Cafe",detail:"Seward · Since 1974",
      note:"Collectively owned and operated. The oldest restaurant of its kind in the city."},
    {name:"W.A. Frost",detail:"Cathedral Hill · 1889 building",
      note:"One of the city's best patios. The neighborhood's fine-dining anchor."},
    {name:"Estelle",detail:"Summit Hill · Sophisticated",
      note:"Elegant wines, refined dishes. A celebratory-dinner kind of place."},
    {name:"Black Dog Cafe",detail:"Lowertown · Since 1998 · Live jazz",
      note:"All-day gathering spot with live music most nights, especially Saturdays."},
    {name:"Cossetta Alimentari",detail:"Lowertown · Since 1920",
      note:"Saint Paul's red-sauce institution. Pizzeria, bakery, full rooftop dining."},
    {name:"Coalition",detail:"Excelsior · Chef-driven",
      note:"Stylish New American menu in the heart of historic downtown Excelsior."},
    {name:"The Main Cafe",detail:"Stillwater · Family-run since 1989",
      note:"Right on Main Street. Everyone treated like family for over three decades."},
  ],

  // BODY
  movement:[
    {name:"SUP Calhoun",detail:"BMS · Tue & Thu 6:30pm",
      note:"WPA-certified instructors on Bde Maka Ska. All levels. Private lessons ($75) with video analysis.",url:"https://supcalhoun.com"},
    {name:"SUP Yoga — The Yoga Center",detail:"BMS · June–Aug mornings",
      note:"SUP yoga on Bde Maka Ska. All levels.",url:"https://theyogacenterretreat.com"},
    {name:"The Firm",detail:"Uptown · Pilates + strength",
      note:"Pilates and strength training in the Uptown corridor. Walkable from CID and Kenwood."},
    {name:"Movement Minneapolis",detail:"NE Minneapolis · Climbing + fitness",
      note:"Climbing gym in Northeast. Good community."},
    {name:"Mov Hot Yoga",detail:"Minneapolis · Hot yoga",
      note:"Hot yoga studio in Minneapolis. Multiple class formats.",url:"https://www.movhotyoga.com"},
    {name:"Loppet Foundation",detail:"Community paddling + winter trails",
      note:"SUP, canoe, lessons in summer. Nordic skiing and fat biking in winter. Good for meeting locals.",url:"https://loppet.org"},
  ],
  nature:[
    {name:"Bde Maka Ska",detail:"Chain of Lakes · Home water",
      note:"Largest Chain of Lakes lake. SUP, swim, sail. Paddle through the channel to Lake of the Isles and Cedar Lake. 3.3mi perimeter loop.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/bde_maka_ska_park/"},
    {name:"Lake of the Isles",detail:"2.7mi loop",
      note:"The paddle surrounded by CID and Kenwood homes. Quiet on weekday mornings.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_of_the_isles_park/"},
    {name:"Lake Harriet",detail:"2.8mi loop · Bandshell",
      note:"Swimming beach, sailing club, paddleboat rentals. Free Sunday concerts at the Bandshell all summer.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_harriet_regional_park/"},
    {name:"Cedar Lake",detail:"Connected to BMS via channel",
      note:"Quieter than BMS. Cedar Lake Trail connects to the Midtown Greenway.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/cedar_lake_park/"},
    {name:"Chain of Lakes Loop",detail:"13 miles · Paved · Car-free",
      note:"BMS to Lake of the Isles to Cedar Lake to Lake Harriet to Nokomis. The definitive Minneapolis route. Before 8am on weekends."},
    {name:"Minnehaha Falls Trail",detail:"5–8 miles · River gorge",
      note:"Mississippi River gorge to Minnehaha Falls. One of the best urban trail runs in the Midwest.",url:"https://www.minneapolisparks.org/parks-destinations/parks-lakes/minnehaha_regional_park/"},
    {name:"West River Parkway",detail:"8 miles · Riverfront",
      note:"Along the Mississippi from North Minneapolis to Minnehaha Falls. The city at its most elemental."},
    {name:"Minnehaha Creek Greenway",detail:"Through Linden Hills",
      note:"Follows the creek through residential neighborhoods. Beautiful urban waterway walk."},
    {name:"Kenwood Parkway Loop",detail:"3 miles · Car-free",
      note:"Car-free parkway through the heart of Kenwood. Sunday mornings when the city is still asleep."},
    {name:"Lake Minnetonka",detail:"Day trip · 30 min from BMS",
      note:"A different scale entirely. Wai Nani SUP does group paddles and SUP yoga out here.",url:"https://www.threeriversparks.org/location/lake-minnetonka-regional-park"},
  ],
  wellness:[
    
    {name:"Löyly",detail:"NE Minneapolis · Nordic sauna",
      note:"Nordic-inspired sauna and cold plunge. Community-focused, well designed.",url:"https://www.loyly.net"},
    {name:"The Nordic",detail:"Downtown · Year-round",
      note:"Urban wellness with sauna, cold plunge, steam room. Year-round operation.",url:"https://www.minneapolis.org/things-to-do/health-wellness/saunas/"},
    {name:"Wai Nani SUP",detail:"Lake Minnetonka · Community",
      note:"Group Tribe paddles, SUP yoga. Free community paddles. The Twin Cities SUP community hub.",url:"https://wainanisup.com"},
  ],
  
};

// ─── TERRITORY ────────────────────────────────────────────────────────────────
function NeighborhoodDetail({nb, onBack}) {
  return (
    <DetailPage title={nb.name} dir="north" bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={onBack}>
      <div style={{paddingTop:20}}>
        <Cap color={C.teal} style={{marginBottom:16}}>{nb.detail}</Cap>
        <div style={{fontFamily:sans,fontSize:13,color:C.bone2,lineHeight:1.85,marginBottom:24}}>{nb.note}</div>
        <Rule style={{marginBottom:20}}/>
        <div style={{display:"flex",gap:0}}>
          {[["Median",nb.price],["Days",nb.days+"d"],["vs Ask",nb.ratio],["Absorption",nb.abs]].map(([l,v],j)=>(
            <div key={l} style={{flex:1,padding:"0 "+(j>0?10:0)+"px",borderLeft:j>0?"1px solid "+C.bone3:"none"}}>
              <Cap style={{fontSize:7,color:C.bone3,marginBottom:4}}>{l}</Cap>
              <div style={{fontFamily:sans,fontSize:11,color:C.bone2}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </DetailPage>
  );
}

function TerritoryPage({onBack}) {
  const [sub, setSub] = useState(null);
  const [nb, setNb] = useState(null);

  if(nb) return <NeighborhoodDetail nb={nb} onBack={()=>setNb(null)}/>;

  const collections = [
    {key:"lakes",      label:"Around the Lakes",      blurb:"Water, walkability, and classic Minneapolis."},
    {key:"urban",      label:"Urban Core",            blurb:"Density, convenience, and city energy."},
    {key:"river",      label:"River & Historic",      blurb:"The city's original crossroads."},
    {key:"connected",  label:"Connected Neighborhoods",blurb:"Daily life done exceptionally well."},
    {key:"creative",   label:"Creative Minneapolis",  blurb:"Independent culture, makers, and local character."},
    {key:"stpaul",     label:"Saint Paul",            blurb:"The twin worth knowing."},
  ];

  const beyondCollections = [
    {key:"beyond-lakeside",   label:"Lakeside",            blurb:"Walkable towns with a strong sense of place."},
    {key:"beyond-river",      label:"River Towns",         blurb:"Historic Main Streets, riverfront living."},
    {key:"beyond-mainstreet", label:"Main Street Revival", blurb:"Independent businesses, everyday walkability."},
    {key:"beyond-classic",    label:"Classic Lake Community",blurb:"Historic downtown, lake access, local identity."},
  ];

  if(sub==="neighborhoods") return (
    <DetailPage title="Neighborhoods" dir="north" bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        {collections.map(col=>(
          <div key={col.key}>
            <Cap style={{marginTop:28,marginBottom:2,color:C.bone3}}>{col.label}</Cap>
            <div style={{fontFamily:serif,fontStyle:"italic",fontSize:12,color:C.bone2,opacity:0.6,marginBottom:8}}>{col.blurb}</div>
            {DATA.neighborhoods.filter(n=>n.collection===col.key).map((n,i)=>(
              <button key={i} onClick={()=>setNb(n)} style={{
                width:"100%",background:"transparent",border:"none",
                borderBottom:"1px solid "+C.bone3,padding:"18px 0",cursor:"pointer",
                display:"flex",justifyContent:"space-between",alignItems:"center",opacity:0.78,
              }}>
                <div style={{textAlign:"left"}}>
                  <div style={{fontFamily:serif,fontSize:21,color:C.bone,marginBottom:3}}>{n.name}</div>
                  <div style={{fontFamily:sans,fontSize:11,color:C.teal}}>{n.price} · {n.trend}</div>
                </div>
                <div style={{fontSize:16,color:C.bone2,opacity:0.5}}>→</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </DetailPage>
  );

  if(sub==="beyond") return (
    <DetailPage title="Beyond the City" dir="north" bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        <div style={{fontFamily:serif,fontStyle:"italic",fontSize:14,color:C.bone2,lineHeight:1.7,paddingBottom:20}}>
          Walkable towns beyond Minneapolis with their own sense of place.
        </div>
        {beyondCollections.map(col=>(
          <div key={col.key}>
            <Cap style={{marginTop:28,marginBottom:2,color:C.bone3}}>{col.label}</Cap>
            <div style={{fontFamily:serif,fontStyle:"italic",fontSize:12,color:C.bone2,opacity:0.6,marginBottom:8}}>{col.blurb}</div>
            {DATA.beyond.filter(n=>n.collection===col.key).map((n,i)=>(
              <button key={i} onClick={()=>setNb(n)} style={{
                width:"100%",background:"transparent",border:"none",
                borderBottom:"1px solid "+C.bone3,padding:"18px 0",cursor:"pointer",
                display:"flex",justifyContent:"space-between",alignItems:"center",opacity:0.78,
              }}>
                <div style={{textAlign:"left"}}>
                  <div style={{fontFamily:serif,fontSize:21,color:C.bone,marginBottom:3}}>{n.name}</div>
                  <div style={{fontFamily:sans,fontSize:11,color:C.teal}}>{n.price} · {n.trend}</div>
                </div>
                <div style={{fontSize:16,color:C.bone2,opacity:0.5}}>→</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </DetailPage>
  );

  if(sub==="hidden") return (
    <DetailPage title="Hidden Gems" dir="north" bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        {DATA.hidden.map((item,i)=><ContentRow key={i} {...item} accent={C.teal}/>)}
      </div>
    </DetailPage>
  );

  if(sub==="compare") return (
    <DetailPage title="Compare" dir="north" bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        <div style={{fontFamily:serif,fontStyle:"italic",fontSize:14,color:C.bone2,lineHeight:1.7,paddingBottom:16}}>
          Metrics only. Context lives in each neighborhood.
        </div>
        {collections.map(col=>(
          <div key={col.key}>
            <Cap style={{marginTop:24,marginBottom:8,color:C.bone3}}>{col.label}</Cap>
            <div style={{display:"flex",borderBottom:"1px solid "+C.bone3,paddingBottom:8}}>
              <div style={{flex:2}}><Cap style={{fontSize:7,color:C.bone3}}>Neighborhood</Cap></div>
              <div style={{flex:1,textAlign:"right"}}><Cap style={{fontSize:7,color:C.bone3}}>Median</Cap></div>
              <div style={{flex:1,textAlign:"right"}}><Cap style={{fontSize:7,color:C.bone3}}>Trend</Cap></div>
              <div style={{flex:1,textAlign:"right"}}><Cap style={{fontSize:7,color:C.bone3}}>Days</Cap></div>
              <div style={{flex:1,textAlign:"right"}}><Cap style={{fontSize:7,color:C.bone3}}>vs Ask</Cap></div>
              <div style={{flex:1,textAlign:"right"}}><Cap style={{fontSize:7,color:C.bone3}}>Absorb</Cap></div>
            </div>
            {DATA.neighborhoods.filter(n=>n.collection===col.key).map((n,i)=>(
              <div key={i} style={{borderBottom:"1px solid "+C.bone3,padding:"14px 0",display:"flex",alignItems:"baseline"}}>
                <div style={{flex:2,fontFamily:serif,fontSize:15,color:C.bone}}>{n.name}</div>
                {[n.price,n.trend,n.days+"d",n.ratio,n.abs].map((v,j)=>(
                  <div key={j} style={{flex:1,textAlign:"right",fontFamily:sans,fontSize:11,color:C.bone2}}>{v}</div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </DetailPage>
  );

  return (
    <DirPage dir="north" title="Place" subhead="Find your neighborhood."
      bg={C.tealBg} aurora="rgba(62,124,117,1)" onBack={onBack}
      items={[
        {label:"Neighborhood Collections",sub:"Around the Lakes · Urban Core · Saint Paul · more",id:"neighborhoods"},
        {label:"Beyond the City",sub:"Excelsior · Wayzata · Stillwater · Hopkins · White Bear Lake",id:"beyond"},
        {label:"Hidden Gems",sub:"Small discoveries",id:"hidden"},
        {label:"Compare Neighborhoods",sub:"Market metrics by collection",id:"compare"},
      ]}
      onGo={setSub}/>
  );
}

// ─── SEASON ───────────────────────────────────────────────────────────────────
function SeasonPage({onBack}) {
  const [sub,setSub] = useState(null);

  const views = {
    festivals:{title:"Festivals",data:DATA.festivals},
    cinema:{title:"Cinema",data:DATA.cinema},
    performances:{title:"Performances",data:DATA.performances},
    exhibitions:{title:"Exhibitions",data:DATA.exhibitions},
  };

  if(sub&&views[sub]) return (
    <DetailPage title={views[sub].title} dir="east" bg={C.coralBg} aurora="rgba(195,105,95,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        {views[sub].data.map((item,i)=><ContentRow key={i} {...item} accent={C.coral}/>)}
      </div>
    </DetailPage>
  );

  return (
    <DirPage dir="east" title="Season" subhead="What's happening now."
      bg={C.coralBg} aurora="rgba(195,105,95,1)" onBack={onBack}
      items={[
        {label:"Festivals",sub:"Art fairs · Fringe · Pride · State Fair",id:"festivals"},
        {label:"Cinema",sub:"Independent and art house theaters",id:"cinema"},
        {label:"Performances",sub:"Theater · Music · Live",id:"performances"},
        {label:"Exhibitions",sub:"Mia · Walker · Mill City · Weisman",id:"exhibitions"},
      ]}
      onGo={setSub}/>
  );
}

// ─── TABLE ────────────────────────────────────────────────────────────────────
function TablePage({onBack}) {
  const [sub,setSub] = useState(null);

  const views = {
    markets:{title:"Markets",data:DATA.markets},
    makers:{title:"Makers",data:DATA.makers},
    coffee:{title:"Coffee",data:DATA.coffee},
    bakeries:{title:"Bakeries",data:DATA.bakeries},
    restaurants:{title:"Restaurants",data:DATA.restaurants},
    classes:{title:"Classes",data:DATA.classes},
  };

  if(sub&&views[sub]) return (
    <DetailPage title={views[sub].title} dir="south" bg={C.saffronBg} aurora="rgba(198,155,68,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        {views[sub].data.map((item,i)=><ContentRow key={i} {...item} accent={C.saffron}/>)}
      </div>
    </DetailPage>
  );

  return (
    <DirPage dir="south" title="Gather" subhead="Gather well. Eat beautifully."
      bg={C.saffronBg} aurora="rgba(198,155,68,1)" onBack={onBack}
      items={[
        {label:"Markets",sub:"Where the city provisions",id:"markets"},
        {label:"Makers",sub:"Cheesemakers · Brewers · Artisans",id:"makers"},
        {label:"Coffee",sub:"Cafés · Roasters · Morning ritual",id:"coffee"},
        {label:"Bakeries",sub:"Bread · Pastry · The cardamom bun",id:"bakeries"},
        {label:"Restaurants",sub:"What locals consistently care about",id:"restaurants"},
        {label:"Classes",sub:"Cooking · Wine · Baking",id:"classes"},
      ]}
      onGo={setSub}/>
  );
}

// ─── BODY ─────────────────────────────────────────────────────────────────────
function BodyPage({onBack}) {
  const [sub,setSub] = useState(null);

  const views = {
    movement:{title:"Movement",data:DATA.movement},
    nature:{title:"Nature",data:DATA.nature},
    wellness:{title:"Wellness",data:DATA.wellness},
  };

  if(sub&&views[sub]) return (
    <DetailPage title={views[sub].title} dir="west" bg={C.mintBg} aurora="rgba(118,172,158,1)" onBack={()=>setSub(null)}>
      <div style={{paddingTop:20}}>
        {views[sub].data.map((item,i)=><ContentRow key={i} {...item} accent={C.mint}/>)}
      </div>
    </DetailPage>
  );

  return (
    <DirPage dir="west" title="Move" subhead="Find your rhythm."
      bg={C.mintBg} aurora="rgba(118,172,158,1)" onBack={onBack}
      items={[
        {label:"Movement",sub:"Studios · Yoga · Pilates · Paddle",id:"movement"},
        {label:"Nature",sub:"Lakes · Trails · Hikes",id:"nature"},
        {label:"Wellness",sub:"Sauna · Cold plunge · Rest",id:"wellness"},
      ]}
      onGo={setSub}/>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutPage({onBack}) {
  return (
    <div style={{background:C.bg,minHeight:"100vh",position:"relative"}} className="fade">
      <Ribbons opacity={0.6}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{padding:"28px 32px 0"}}><BackBtn onBack={onBack}/></div>
        <div style={{padding:"56px 40px 0"}}>
          <Cap style={{marginBottom:32,color:C.bone3}}>About</Cap>
          <div style={{fontFamily:serif,fontSize:22,fontWeight:300,color:C.bone,lineHeight:1.7,marginBottom:28}}>
            When you move to a new city, you don't lose yourself. You just have to find everything again.
          </div>
          <div style={{fontFamily:serif,fontSize:22,fontWeight:300,color:C.bone,lineHeight:1.7,marginBottom:28}}>
            Your coffee shop. Your neighborhood. Your Saturday morning. Your people.
          </div>
          <div style={{fontFamily:serif,fontSize:22,fontWeight:300,color:C.bone,lineHeight:1.7,marginBottom:28}}>
            I moved to Minneapolis in 2026 with the questions every newcomer asks.
          </div>
          <div style={{fontFamily:serif,fontSize:22,fontWeight:300,color:C.bone,lineHeight:1.7,marginBottom:28}}>
            North Star is the compass I built to answer them — for making a new city home.
          </div>
          <div style={{fontFamily:serif,fontSize:22,fontWeight:300,color:C.gold,lineHeight:1.7}}>
            Find your place. Find your people. Find your rhythm.
          </div>
        </div>
        <div style={{padding:"64px 40px 40px"}}><Star size={20} style={{opacity:0.4}}/></div>
        <div style={{padding:"0 40px 60px"}}>
          <Cap style={{color:C.bone3,lineHeight:2.5}}>
            North Star · Minneapolis · Summer 2026<br/>
            An editorial compass for experiencing Minneapolis.
          </Cap>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({onNavigate}) {
  const [hov,setHov] = useState(null);

  const DirLabel = ({dir,name,tagline,style={}}) => {
    const accent = {north:C.teal,east:C.coral,south:C.saffron,west:C.mint}[dir];
    const card = dir==="north"?"N":dir==="east"?"E":dir==="south"?"S":"W";
    const cardStyle = {
      fontFamily:serif, fontWeight:400, fontSize:44, lineHeight:1,
      color:"rgba(248,246,240,0.55)", letterSpacing:"0.05em",
    };
    const nameStyle = {
      fontFamily:serif, fontWeight:300, fontSize:18, letterSpacing:"0.12em",
      textTransform:"uppercase", lineHeight:1,
      color:hov===dir?C.bone:accent, transition:"color 0.2s",
    };
    const tagStyle = {
      fontFamily:serif, fontStyle:"italic", fontSize:14,
      color:C.bone2, opacity:0.65, lineHeight:1.5, marginTop:6,
    };

    // N: large N closest to star (bottom), Place + tagline above
    if(dir==="north") return (
      <div style={{...style}}>
        <button onMouseEnter={()=>setHov(dir)} onMouseLeave={()=>setHov(null)} onClick={()=>onNavigate(dir)}
          style={{background:"transparent",border:"none",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={nameStyle}>{name}</div>
          {tagline&&<div style={tagStyle}>{tagline}</div>}
          <div style={{...cardStyle,marginTop:10}}>{card}</div>
        </button>
      </div>
    );

    // S: large S closest to star (top), Gather + tagline below
    if(dir==="south") return (
      <div style={{...style}}>
        <button onMouseEnter={()=>setHov(dir)} onMouseLeave={()=>setHov(null)} onClick={()=>onNavigate(dir)}
          style={{background:"transparent",border:"none",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={cardStyle}>{card}</div>
          <div style={{...nameStyle,marginTop:4}}>{name}</div>
          {tagline&&<div style={tagStyle}>{tagline}</div>}
        </button>
      </div>
    );

    // E: star is to E's LEFT, so: E letter first (closest to star), then name to the right
    // tagline centered below the full row — same as N/S
    if(dir==="east") return (
      <div style={{...style,display:"flex",flexDirection:"column",alignItems:"flex-start",width:160}}>
        <button onMouseEnter={()=>setHov(dir)} onMouseLeave={()=>setHov(null)} onClick={()=>onNavigate(dir)}
          style={{background:"transparent",border:"none",cursor:"pointer",
            display:"flex",flexDirection:"row",alignItems:"center",gap:10,alignSelf:"flex-start"}}>
          <div style={cardStyle}>{card}</div>
          <div style={nameStyle}>{name}</div>
        </button>
        {tagline&&<div style={{...tagStyle,textAlign:"center",marginTop:8,width:"100%"}}>{tagline}</div>}
      </div>
    );

    // W: star is to W's RIGHT, so: name to the left, W letter closest to star
    // tagline centered below the full row — same as N/S
    return (
      <div style={{...style,display:"flex",flexDirection:"column",alignItems:"flex-end",width:160}}>
        <button onMouseEnter={()=>setHov(dir)} onMouseLeave={()=>setHov(null)} onClick={()=>onNavigate(dir)}
          style={{background:"transparent",border:"none",cursor:"pointer",
            display:"flex",flexDirection:"row",alignItems:"center",gap:10,alignSelf:"flex-end"}}>
          <div style={nameStyle}>{name}</div>
          <div style={cardStyle}>{card}</div>
        </button>
        {tagline&&<div style={{...tagStyle,textAlign:"center",marginTop:8,width:"100%"}}>{tagline}</div>}
      </div>
    );
  };

  return (
    <div style={{background:C.bg,height:"100vh",display:"flex",flexDirection:"column",
      position:"relative",overflow:"hidden"}}>

      <Ribbons/>

      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100vh"}}>

        {/* Top dateline */}
        <div style={{padding:"32px 0 0",textAlign:"center",flexShrink:0}}>
          <Cap style={{letterSpacing:"0.24em",color:"rgba(248,246,240,0.22)",fontSize:7}}>
            Minneapolis · Summer 2026
          </Cap>
        </div>

        {/* Wordmark */}
        <div style={{padding:"0 40px",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",flex:"0 0 36%"}}>
          <div style={{fontFamily:serif,fontWeight:300,fontSize:80,color:C.bone,
            letterSpacing:"-0.02em",lineHeight:0.88,textAlign:"center"}}>North</div>
          <div style={{fontFamily:serif,fontWeight:300,fontSize:80,color:C.gold,
            letterSpacing:"-0.02em",lineHeight:0.88,textAlign:"center",marginBottom:20}}>Star</div>
          <Cap style={{letterSpacing:"0.22em",color:"rgba(248,246,240,0.28)",fontSize:7}}>
            Find your place. Find your people. Find your rhythm.
          </Cap>
        </div>

        {/* Compass space — directions floating, no graphic */}
        <div style={{flex:1,position:"relative"}}>

          {/* N — top center, N letter closest to star below */}
          <DirLabel dir="north" name="Place" tagline="Find your neighborhood."
            style={{position:"absolute",bottom:"calc(50% + 48px)",left:"50%",transform:"translateX(-50%)",textAlign:"center"}}/>

          {/* W — left side, W letter closest to star on right */}
          <DirLabel dir="west" name="Move" tagline="Find your rhythm."
            style={{position:"absolute",top:"50%",right:"calc(50% + 48px)",transform:"translateY(-50%)",textAlign:"right"}}/>

          {/* E — right side, E letter closest to star on left */}
          <DirLabel dir="east" name="Season" tagline="See what's happening."
            style={{position:"absolute",top:"50%",left:"calc(50% + 48px)",transform:"translateY(-50%)",textAlign:"left"}}/>

          {/* S — bottom center, S letter closest to star above */}
          <DirLabel dir="south" name="Gather" tagline="Gather well. Eat beautifully."
            style={{position:"absolute",top:"calc(50% + 48px)",left:"50%",transform:"translateX(-50%)",textAlign:"center"}}/>

          {/* Star — center, glowing, no cross lines */}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <Star size={20}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"0 40px 30px",display:"flex",flexDirection:"column",
          alignItems:"center",gap:10,flexShrink:0}}>
          <Cap style={{letterSpacing:"0.24em",color:"rgba(248,246,240,0.20)",fontSize:7}}>
            Four directions. One North Star.
          </Cap>
          <button onClick={()=>onNavigate("about")} style={{background:"transparent",border:"none",
            cursor:"pointer",fontFamily:sans,fontSize:8,fontWeight:500,letterSpacing:"0.20em",
            textTransform:"uppercase",color:"rgba(248,246,240,0.18)"}}>About ✦</button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function NorthStar() {
  const [screen,setScreen] = useState("landing");
  return (
    <div className="grain" style={{maxWidth:480,margin:"0 auto",minHeight:"100vh"}}>
      <style>{css}</style>
      <div style={{overflowY:"auto",minHeight:"100vh"}}>
        {screen==="landing" && <Landing       onNavigate={setScreen}/>}
        {screen==="north"   && <TerritoryPage onBack={()=>setScreen("landing")}/>}
        {screen==="east"    && <SeasonPage    onBack={()=>setScreen("landing")}/>}
        {screen==="south"   && <TablePage     onBack={()=>setScreen("landing")}/>}
        {screen==="west"    && <BodyPage      onBack={()=>setScreen("landing")}/>}
        {screen==="about"   && <AboutPage     onBack={()=>setScreen("landing")}/>}
      </div>
    </div>
  );
}
