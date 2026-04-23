// components/Page2Editor.jsx
// ─── ARCHITECTURE ──────────────────────────────────────────────────
// Page2Editor renders TWO separate exported components:
//   <Page2Toolbar />  → toolbar, place OUTSIDE scaled div (no transform)
//   <Page2Content />  → blocks only, place INSIDE scaled div (for PDF)
//
// Both share state via a Context so they can be placed anywhere in DOM.
// ───────────────────────────────────────────────────────────────────

import React, {
  useState, useRef, useCallback, useEffect,
  createContext, useContext,
} from "react";

let idCounter = 1;
const uid = () => `b${idCounter++}`;
const defaultBlocks = () => [{ id: uid(), type: "text", content: "" }];

/* ─── Shared context ─────────────────────────────────────────────── */
const EditorCtx = createContext(null);

/* ─── Styles ─────────────────────────────────────────────────────── */
const FONT_SIZES   = { heading1:"22px", heading2:"17px", heading3:"14px", text:"13px", bullet:"13px" };
const FONT_WEIGHTS = { heading1:"800",  heading2:"700",  heading3:"600",  text:"400",  bullet:"400"  };
const LINE_HEIGHTS = { heading1:"1.3",  heading2:"1.35", heading3:"1.4",  text:"1.7",  bullet:"1.7"  };
const MARGINS_TOP  = { heading1:"14px", heading2:"10px", heading3:"8px",  text:"2px",  bullet:"2px", divider:"10px" };
const miniBtn = { fontSize:"10px", padding:"1px 5px", borderRadius:"4px", border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", color:"#64748b", fontWeight:"600" };

/* ─── TBtn ───────────────────────────────────────────────────────── */
const TBtn = ({ title, active, onClick, children }) => (
  <button title={title} onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"30px", height:"28px", borderRadius:"6px", border: active ? "1.5px solid #6366f1" : "1px solid transparent", background: active ? "rgba(99,102,241,0.12)" : "transparent", color: active ? "#6366f1" : "#374151", cursor:"pointer", fontSize:"13px", fontWeight:"700", flexShrink:0 }}
  >{children}</button>
);

/* ─── Block ──────────────────────────────────────────────────────── */
function Block({ block, index, onSave, onKeyDown, onFocus, onDelete, onMoveUp, onMoveDown, blockRef, isSelected, onSelect }) {
  const elRef = useRef(null);
  const initialized = useRef(false);

  const setRef = useCallback((el) => {
    elRef.current = el;
    if (typeof blockRef === "function") blockRef(el);
  }, [blockRef]);

  useEffect(() => {
    if (!initialized.current && elRef.current) {
      elRef.current.innerHTML = block.content || "";
      initialized.current = true;
    }
  }, []); // eslint-disable-line

  if (block.type === "divider") {
    return (
      <div onClick={() => onSelect(block.id)} style={{ position:"relative"  , outline: isSelected ? "2px solid rgba(99,102,241,0.4)" : "none", borderRadius:"4px", cursor:"pointer", padding:"4px 0" }}>
        <hr style={{ border:"none", borderTop:"2px solid #1e293b", margin:0 }} />
        {isSelected && (
          <div style={{ position:"absolute", right:0, top:"-18px", display:"flex", gap:"4px" }}>
            <button onMouseDown={(e)=>{e.preventDefault();onMoveUp(block.id);}} style={miniBtn}>↑</button>
            <button onMouseDown={(e)=>{e.preventDefault();onMoveDown(block.id);}} style={miniBtn}>↓</button>
            <button onMouseDown={(e)=>{e.preventDefault();onDelete(block.id);}} style={{...miniBtn,color:"#ef4444"}}>✕</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ position:"relative", marginTop: MARGINS_TOP[block.type] || "2px" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"4px" }}>
        {block.type === "bullet" && <span style={{ fontSize:"13px", lineHeight:"1.7", color:"#374151", flexShrink:0 }}>•</span>}
        <div
          ref={setRef}
          contentEditable suppressContentEditableWarning
          onKeyDown={(e) => onKeyDown(e, block.id, index)}
          onFocus={() => onFocus(block.id)}
          onBlur={(e) => onSave(block.id, e.currentTarget.innerHTML)}
          onClick={() => onSelect(block.id)}
          style={{ flex:1, outline:"none", minHeight:"1.4em", fontSize:FONT_SIZES[block.type]||"13px", fontWeight:FONT_WEIGHTS[block.type]||"400", lineHeight:LINE_HEIGHTS[block.type]||"1.7", color:"#1e293b", fontFamily:"'Georgia','Times New Roman',serif", caretColor:"#6366f1", transition:"border-color 0.15s", wordBreak:"break-word", whiteSpace:"pre-wrap" }}
        />
      </div>
    </div>
  );
}

/* ─── Provider ───────────────────────────────────────────────────── */
export function Page2EditorProvider({ data, setData, children }) {
  const [blocks, setBlocks] = useState(() =>
    data?.blocks?.length > 0 ? data.blocks : defaultBlocks()
  );
  const [selectedId, setSelectedId] = useState(null);
  const [focusedId,  setFocusedId]  = useState(null);
  const blockRefs = useRef({});

  const syncToParent = useCallback((nb) => {
    setData(prev => ({ ...(prev || {}), blocks: nb }));
  }, [setData]);

  const saveBlock = useCallback((id, html) => {
    setBlocks(prev => { const n = prev.map(b => b.id===id ? {...b,content:html} : b); syncToParent(n); return n; });
  }, [syncToParent]);

  const addBlockAfter = useCallback((afterId, type="text") => {
    const nb = { id:uid(), type, content:"" };
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id===afterId);
      const n   = [...prev.slice(0,idx+1), nb, ...prev.slice(idx+1)];
      syncToParent(n); return n;
    });
    setTimeout(() => { const el=blockRefs.current[nb.id]; if(el){el.focus();setFocusedId(nb.id);setSelectedId(nb.id);} }, 30);
  }, [syncToParent]);

  const deleteBlock = useCallback((id) => {
    setBlocks(prev => {
      if(prev.length===1) return prev;
      const idx = prev.findIndex(b=>b.id===id);
      const n   = prev.filter(b=>b.id!==id);
      syncToParent(n);
      setTimeout(()=>{ const t=n[Math.max(0,idx-1)]; if(t&&blockRefs.current[t.id]){blockRefs.current[t.id].focus();setFocusedId(t.id);setSelectedId(t.id);} },30);
      return n;
    });
  }, [syncToParent]);

  const changeBlockType = useCallback((id, newType) => {
    setBlocks(prev => {
      const el=blockRefs.current[id]; const html=el?el.innerHTML:"";
      const n=prev.map(b=>b.id===id?{...b,type:newType,content:html}:b);
      syncToParent(n); return n;
    });
    setTimeout(()=>blockRefs.current[id]?.focus(), 30);
  }, [syncToParent]);

  const insertDivider = useCallback(() => {
    const tid = focusedId||selectedId||blocks[blocks.length-1].id;
    const nb  = { id:uid(), type:"divider", content:"" };
    setBlocks(prev => {
      const idx=prev.findIndex(b=>b.id===tid);
      const n=[...prev.slice(0,idx+1), nb, ...prev.slice(idx+1)];
      syncToParent(n); return n;
    });
    setSelectedId(nb.id);
  }, [blocks, focusedId, selectedId, syncToParent]);

  const moveUp = useCallback((id) => {
    setBlocks(prev => { const idx=prev.findIndex(b=>b.id===id); if(idx===0)return prev; const n=[...prev];[n[idx-1],n[idx]]=[n[idx],n[idx-1]];syncToParent(n);return n; });
  }, [syncToParent]);

  const moveDown = useCallback((id) => {
    setBlocks(prev => { const idx=prev.findIndex(b=>b.id===id); if(idx===prev.length-1)return prev; const n=[...prev];[n[idx],n[idx+1]]=[n[idx+1],n[idx]];syncToParent(n);return n; });
  }, [syncToParent]);

  const handleKeyDown = useCallback((e, id) => {
    if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); const el=blockRefs.current[id]; if(el)saveBlock(id,el.innerHTML); const cur=blocks.find(b=>b.id===id)?.type; const nxt=["heading1","heading2","heading3"].includes(cur)?"text":(cur==="divider"?"text":cur); addBlockAfter(id,nxt); }
    if(e.key==="Backspace"){ const el=blockRefs.current[id]; if((!el||el.textContent==="")&&blocks.length>1){e.preventDefault();deleteBlock(id);} }
  }, [blocks, addBlockAfter, deleteBlock, saveBlock]);

  const activeBlock = blocks.find(b=>b.id===(focusedId||selectedId));
  const activeType  = activeBlock?.type || "text";
  const addBlock    = (type) => { const tid=focusedId||selectedId||blocks[blocks.length-1].id; if(type==="divider"){insertDivider();return;} addBlockAfter(tid,type); };

  const value = { blocks, selectedId, focusedId, blockRefs, activeBlock, activeType, saveBlock, addBlockAfter, deleteBlock, changeBlockType, insertDivider, moveUp, moveDown, handleKeyDown, addBlock, setFocusedId, setSelectedId };

  return <EditorCtx.Provider value={value}>{children}</EditorCtx.Provider>;
}

/* ─── Toolbar — place OUTSIDE scaled div ────────────────────────── */
export function Page2Toolbar() {
  const { activeType, activeBlock, changeBlockType, insertDivider, addBlock } = useContext(EditorCtx);
  return (
    <div style={{ width:"100%", background:"rgba(255,255,255,0.98)", borderBottom:"1px solid #e2e8f0", padding:"6px 16px", display:"flex", alignItems:"center", gap:"4px", flexWrap:"wrap", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", boxSizing:"border-box", position:"relative", zIndex:20 }}>
      <div style={{display:"flex",gap:"2px"}}>
        {[["heading1","H1"],["heading2","H2"],["heading3","H3"],["text","¶"],["bullet","•"]].map(([t,l])=>(
          <TBtn key={t} active={activeType===t} onClick={()=>activeBlock&&changeBlockType(activeBlock.id,t)}>{l}</TBtn>
        ))}
      </div>
      <div style={{width:"1px",height:"20px",background:"#e2e8f0",margin:"0 4px"}}/>
      <button onMouseDown={(e)=>{e.preventDefault();insertDivider();}} style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",color:"#64748b",padding:"4px 10px",borderRadius:"6px",border:"1px solid #e2e8f0",background:"#f8fafc",cursor:"pointer",fontFamily:"sans-serif"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>Line
      </button>
      <div style={{width:"1px",height:"20px",background:"#e2e8f0",margin:"0 4px"}}/>
      {[["+ H1","heading1"],["+ H2","heading2"],["+ H3","heading3"],["+ Text","text"],["+ • List","bullet"]].map(([l,t])=>(
        <button key={t} onMouseDown={(e)=>{e.preventDefault();addBlock(t);}} style={{fontSize:"10px",fontWeight:"600",color:"#64748b",padding:"3px 8px",borderRadius:"5px",border:"1px solid #e2e8f0",background:"#fff",cursor:"pointer",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>{l}</button>
      ))}
    </div>
  );
}

/* ─── Content — place INSIDE scaled div (captured by PDF) ───────── */
export function Page2Content() {
  const { blocks, selectedId, focusedId, blockRefs, saveBlock, handleKeyDown, deleteBlock, moveUp, moveDown, setFocusedId, setSelectedId, addBlock } = useContext(EditorCtx);

  return (
    <div
      style={{ padding:"56px 64px 64px", minHeight:"1000px" }}
      onClick={() => {
        if(!focusedId){ const last=blocks[blocks.length-1]; if(last&&blockRefs.current[last.id]) blockRefs.current[last.id].focus(); }
      }}
    >
      {blocks.map((block,index)=>(
        <Block
          key={block.id+"-"+block.type}
          block={block} index={index}
          onSave={saveBlock}
          onKeyDown={handleKeyDown}
          onFocus={(id)=>{setFocusedId(id);setSelectedId(id);}}
          onDelete={deleteBlock}
          onMoveUp={moveUp} onMoveDown={moveDown}
          onSelect={setSelectedId}
          isSelected={selectedId===block.id}
          blockRef={(el)=>{ if(el) blockRefs.current[block.id]=el; }}
        />
      ))}
      {/* "add more" hint — won't appear in PDF since it has no content */}
      <div
        onClick={()=>addBlock("text")}
        style={{ marginTop:"20px", padding:"12px", border:"1.5px dashed rgba(99,102,241,0.2)", borderRadius:"8px", textAlign:"center", fontSize:"11px", color:"rgba(99,102,241,0.5)", cursor:"pointer", fontFamily:"sans-serif" }}
      >+ Click to add more content</div>
    </div>
  );
}

/* ─── Default export: all-in-one standalone (backward compat) ────── */
export default function Page2Editor({ data, setData }) {
  return (
    <Page2EditorProvider data={data} setData={setData}>
      <Page2Toolbar />
      <Page2Content />
    </Page2EditorProvider>
  );
}