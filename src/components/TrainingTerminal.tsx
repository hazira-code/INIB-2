import React from 'react';
import { Play, Pause, RotateCcw, LineChart, Terminal as TerminalIcon, Sparkles, Cpu, Clock, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { TrainingMetric, TerminalLog } from '../types';

export default function TrainingTerminal() {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = React.useState<number>(0);
  const [metrics, setMetrics] = React.useState<TrainingMetric[]>([]);
  const [logs, setLogs] = React.useState<TerminalLog[]>([]);
  const [speed, setSpeed] = React.useState<number>(1200); // ms per step
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // TensorFlow metrics simulation curve
  const tfCurve = [
    { loss: 1.6823, acc: 0.3842 },
    { loss: 1.3415, acc: 0.5186 },
    { loss: 1.1824, acc: 0.5832 },
    { loss: 1.0543, acc: 0.6304 },
    { loss: 0.9412, acc: 0.6720 },
    { loss: 0.8521, acc: 0.7042 },
    { loss: 0.7816, acc: 0.7286 },
    { loss: 0.7103, acc: 0.7512 },
    { loss: 0.6542, acc: 0.7716 },
    { loss: 0.5923, acc: 0.7954 }
  ];

  // PyTorch metrics simulation curve (5 epochs as coded in user's python script)
  const torchCurve = [
    { loss: 1.5432, acc: 0.4482 },
    { loss: 1.2514, acc: 0.5512 },
    { loss: 1.0923, acc: 0.6148 },
    { loss: 0.9632, acc: 0.6654 },
    { loss: 0.8415, acc: 0.7082 }
  ];

  const addLog = (source: 'TensorFlow' | 'PyTorch' | 'System', level: 'info' | 'warn' | 'error' | 'success', message: string) => {
    const newLog: TerminalLog = {
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString(),
      source,
      level,
      message
    };
    setLogs(prev => [...prev, newLog]);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      addLog('System', 'info', 'Initiating cross-framework comparative training runs...');
    } else {
      addLog('System', 'warn', 'Training simulation paused.');
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentEpoch(0);
    setMetrics([]);
    setLogs([]);
    addLog('System', 'info', 'Training environments initialized. Ready to launch.');
  };

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentEpoch(prev => {
          const nextEpoch = prev + 1;
          if (nextEpoch > 10) {
            setIsRunning(false);
            addLog('System', 'success', 'All neural training jobs compiled and finished! Compare metrics in the graphs.');
            return 10;
          }

          // Compute step values
          const tfIdx = nextEpoch - 1;
          const tfData = tfCurve[tfIdx];

          // PyTorch runs for 5 epochs
          const torchIdx = nextEpoch - 1;
          const torchData = torchIdx < 5 ? torchCurve[torchIdx] : undefined;

          // Append metric points
          setMetrics(prevMetrics => [
            ...prevMetrics,
            {
              epoch: nextEpoch,
              tf_loss: tfData.loss,
              tf_accuracy: tfData.acc * 100,
              torch_loss: torchData ? torchData.loss : undefined,
              torch_accuracy: torchData ? torchData.acc * 100 : undefined
            }
          ]);

          // Log TensorFlow epoch details
          const tfTime = (11 + Math.random() * 2).toFixed(1);
          addLog('TensorFlow', 'info', `Epoch ${nextEpoch}/10 | 50000/50000 [==============================] - ${tfTime}s - loss: ${tfData.loss.toFixed(4)} - accuracy: ${tfData.acc.toFixed(4)}`);

          // Log PyTorch if active
          if (torchData) {
            addLog('PyTorch', 'info', `Epoch ${nextEpoch}/5 complete | Running loss: ${torchData.loss.toFixed(4)} | Accuracy: ${(torchData.acc * 100).toFixed(2)}%`);
          } else if (nextEpoch === 6) {
            addLog('PyTorch', 'success', `PyTorch job completed at epoch 5 limits (Acc: 70.82%). Saving PyTorch weights...`);
          }

          return nextEpoch;
        });
      }, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, speed]);

  // Handle first run log init
  React.useEffect(() => {
    if (logs.length === 0) {
      addLog('System', 'info', 'CIFAR-10 data loaders aligned. 50,000 training inputs, 10,000 testing inputs found.');
      addLog('System', 'info', 'Vite Sandbox GPU simulation: CPU limits applied strictly (Render constraints representation).');
    }
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="p-6 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <TerminalIcon size={16} className="text-indigo-400" />
            Cross-Framework Interactive Training Ground
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate the live compilation and output metrics on CIFAR-10.
          </p>
        </div>
        
        {/* Terminal Options */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-slate-300">
            <span className="px-2 py-1 font-semibold text-slate-500">Interval</span>
            <select 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))} 
              className="bg-transparent border-0 outline-none pr-1 text-slate-100 font-medium font-sans text-xs cursor-pointer"
            >
              <option value={1800} className="bg-slate-900">Slow (1.8s)</option>
              <option value={1200} className="bg-slate-900">Medium (1.2s)</option>
              <option value={600} className="bg-slate-900">Fast (0.6s)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleStartPause}
              disabled={currentEpoch === 10 && !isRunning}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md shadow transition-all ${
                currentEpoch === 10
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRunning ? <Pause size={14} /> : <Play size={14} />}
              {isRunning ? 'Pause' : 'Train Models'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-750 transition-all font-sans"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Training charts */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-sans">
                <LineChart size={14} className="text-teal-400" /> Metric Tracking
              </h3>
              {currentEpoch > 0 && (
                <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Epoch {currentEpoch} / 10
                </span>
              )}
            </div>

            {/* Graphs rendering */}
            {metrics.length === 0 ? (
              <div className="h-64 rounded-lg bg-slate-950/20 border border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                <Sparkles size={28} className="text-slate-600 animate-pulse mb-3" />
                <span className="text-xs text-slate-400 font-semibold font-sans">No training data generated yet</span>
                <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed mt-1">
                  Click on the "Train Models" button to simulate weight convergence. You will see both networks compete side-by-side with accuracy and loss curves!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] text-slate-500 font-mono tracking-wider font-semibold uppercase block mb-2">Accuracy Curve (%)</span>
                  <div className="h-44 w-full text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLine data={metrics} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" stroke="#64748b" />
                        <YAxis stroke="#64748b" domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', color: '#cbd5e1' }} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Line type="monotone" dataKey="tf_accuracy" name="TensorFlow (10 epochs)" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="torch_accuracy" name="PyTorch (5 epochs)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                      </RechartsLine>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-mono tracking-wider font-semibold uppercase block mb-2">Cross-Entropy Loss</span>
                  <div className="h-44 w-full text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLine data={metrics} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', color: '#cbd5e1' }} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Line type="monotone" dataKey="tf_loss" name="TensorFlow Loss" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
                        <Line type="monotone" dataKey="torch_loss" name="PyTorch Loss" stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
                      </RechartsLine>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Console view */}
        <div className="flex flex-col h-[520px] bg-black/80 font-mono text-[11px] leading-normal text-slate-300">
          <div className="bg-slate-950 px-5 py-3 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <TerminalIcon size={12} className="text-teal-400" />
              <span className="font-semibold text-xs text-slate-300">Model Console Log output</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>SIMULATED_CPU_NODE</span>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-2 select-text bg-black/70">
            {logs.map((log) => {
              let labelColor = 'text-blue-400';
              if (log.source === 'TensorFlow') labelColor = 'text-indigo-400 font-bold';
              if (log.source === 'PyTorch') labelColor = 'text-emerald-400 font-bold';
              if (log.source === 'System') labelColor = 'text-slate-400';

              let msgColor = 'text-slate-300';
              if (log.level === 'warn') msgColor = 'text-amber-400';
              if (log.level === 'error') msgColor = 'text-red-400 font-semibold';
              if (log.level === 'success') msgColor = 'text-emerald-400';

              return (
                <div key={log.id} className="flex gap-2 items-start hover:bg-slate-950/20 py-0.5 px-1 rounded transition-colors duration-150">
                  <span className="text-slate-600 shrink-0 font-sans">{log.timestamp}</span>
                  <span className={`shrink-0 ${labelColor}`}>[{log.source}]</span>
                  <span className={`${msgColor} pr-1 break-all whitespace-pre-wrap`}>{log.message}</span>
                </div>
              );
            })}
            <div className="h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
