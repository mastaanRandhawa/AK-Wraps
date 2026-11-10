const panels = [
  {label:"Front bumper", x:120,y:38},{label:"Hood",x:120,y:124},
  {label:"Front fenders",x:52,y:144},{label:"Side mirrors",x:19,y:211},
  {label:"Doors & door edges",x:54,y:291},{label:"Roof & pillars",x:120,y:282},
  {label:"Rear quarter panels",x:50,y:363},{label:"Trunk / decklid",x:120,y:382},
  {label:"Rear bumper",x:120,y:415},
];

export function F12Coverage() {
  return <section id="coverage" className="ppf-panel mt-14 grid items-center gap-5 rounded-xl border border-white/15 bg-surface p-5 sm:p-9 md:grid-cols-2">
    <figure className="rounded-lg bg-gradient-to-b from-accent/10 to-black p-3 text-center">
      <svg viewBox="0 0 240 440" role="img" aria-label="Vehicle, illustrated from above with nine numbered film coverage areas" className="mx-auto w-full max-w-72 text-accent">
        <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path fill="#10506a" d="M120 14 C88 14 54 27 43 50 Q31 78 33 125 Q32 160 42 190 L43 249 Q44 296 34 325 Q25 351 32 388 Q34 410 52 420 Q120 441 188 420 Q206 410 208 388 Q215 351 206 325 Q196 296 197 249 L198 190 Q208 160 207 125 Q209 78 197 50 C186 27 152 14 120 14Z"/>
          <path fill="#177398" d="M64 57 Q120 35 176 57 L168 139 Q162 166 155 177 Q120 166 85 177 Q76 156 72 139Z"/>
          <path fill="#070e15" d="M65 188 Q120 159 175 188 L154 239 Q120 226 86 239Z M85 319 Q120 332 155 319 L170 363 Q120 379 70 363Z"/>
          <path fill="#1c7290" d="M89 245 Q120 233 151 245 L153 312 Q120 327 87 312Z"/>
          {[false,true].map(mirror=><g key={String(mirror)} transform={mirror?"translate(240 0) scale(-1 1)":undefined}>
            <path fill="#081820" d="M42 86 Q48 53 63 44 L52 79 L44 108Z M47 156 L74 135 L62 167 L45 183Z"/>
            <path fill="#0a141a" d="M62 202 L80 242 L78 310 L58 334Z"/>
            <path fill="none" d="M45 194 Q52 208 56 237 L56 306 L42 330 M42 335 Q48 353 68 362 M41 390 Q62 402 84 402"/>
            <path fill="#155671" d="M59 217 L42 209 Q29 195 13 201 Q6 209 15 214 L42 218 L60 226Z"/>
            <path fill="none" stroke="#e8f9ff" strokeDasharray="3 3" d="M61 203 L80 244 L78 310 L59 332"/>
            <path fill="#06212c" d="M39 388 Q52 389 63 396 L46 397Z"/>
          </g>)}
          <path fill="none" d="M66 38 Q120 16 174 38 M73 412 Q120 425 167 412 M101 69 Q120 63 139 69 L132 76 Q120 73 108 76Z"/>
        </g>
        {panels.map(({label,x,y},i)=><g key={label} transform={`translate(${x} ${y})`}><circle r="9" fill="currentColor" stroke="white" strokeWidth="1.4"/><text textAnchor="middle" y="3.7" fill="#020509" fontSize="10.5" fontWeight="bold">{i+1}</text></g>)}
      </svg>
      <figcaption className="my-2 text-sm text-white/70">Vehicle · coverage illustration</figcaption>
    </figure>
    <div><p className="type-label text-accent">Panel guide</p><h2 className="mt-2 text-2xl sm:text-3xl font-bold uppercase">Where the vehicle gets film</h2><p className="mt-2 text-white/75">Match each number to a panel. We confirm coverage and edge treatment before installation.</p>
      <ol className="my-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-x-3 gap-y-1.5">{panels.map(({label},i)=><li key={label} className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-6 shrink-0 place-items-center rounded-full border border-white bg-accent text-sm text-accent-foreground">{i+1}</span>{label}</li>)}</ol>
      <ul className="flex flex-wrap gap-4 border-t border-white/15 pt-4 text-sm">{[["Paintwork covered by PPF","border-accent bg-[#10506a]"],["Optional trim protection","border-dashed border-white"],["Uncovered glass","border-white/40 bg-[#070e15]"]].map(([name,style])=><li className="flex items-center gap-2" key={name}><span className={"h-3 w-5 rounded-sm border " + style}/>{name}</li>)}</ul>
    </div>
  </section>;
}
