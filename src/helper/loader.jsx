import React from "react";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.70)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex flex-col items-center gap-7">

        {/* Orbiting Dots */}
        <div className="relative w-20 h-20 flex items-center justify-center">

          {/* center core */}
          <div
            className="w-5 h-5 rounded-sm bg-blue-500 rotate-45"
            style={{ animation: "coreSpin 2s linear infinite" }}
          />

          {/* orbit ring 1 */}
          <div className="absolute inset-0" style={{ animation: "orbit1 1.4s linear infinite" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400" />
          </div>

          {/* orbit ring 2 */}
          <div className="absolute inset-2" style={{ animation: "orbit2 1s linear infinite" }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-200" />
          </div>

          {/* orbit ring 3 */}
          <div className="absolute -inset-2" style={{ animation: "orbit3 2s linear infinite" }}>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-400" />
          </div>

          {/* faint orbit circles */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20" />
          <div className="absolute -inset-2 rounded-full border border-blue-400/10" />
          <div className="absolute inset-2 rounded-full border border-blue-300/20" />
        </div>

        {/* Typewriter text */}
        <div className="flex items-center gap-1">
          <span
            className="text-white text-sm font-mono font-semibold tracking-widest"
            style={{ animation: "flicker 3s ease-in-out infinite" }}
          >
            LOADING
          </span>
          <span className="text-blue-400 text-sm font-mono font-bold"
            style={{ animation: "blink 0.8s step-end infinite" }}>
            _
          </span>
        </div>

      </div>

      <style>{`
        @keyframes coreSpin {
          0%   { transform: rotate(45deg) scale(1);    }
          50%  { transform: rotate(225deg) scale(1.2); }
          100% { transform: rotate(405deg) scale(1);   }
        }
        @keyframes orbit1 {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(45deg);  }
          to   { transform: rotate(405deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes flicker {
          0%, 90%, 100% { opacity: 1;   }
          92%           { opacity: 0.4; }
          94%           { opacity: 1;   }
          96%           { opacity: 0.3; }
        }
        @keyframes tileGlow {
          0%, 100% { background: rgba(59,130,246,0.10); border-color: rgba(99,160,255,0.2); transform: translateY(0px);  }
          50%      { background: rgba(59,130,246,0.35); border-color: rgba(99,160,255,0.7); transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default Loader;