/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Brain, Cpu, Layers, Terminal, AlertTriangle, AlertCircle, FileCode2, Play } from 'lucide-react';
import DiagnosticsPanel from './components/DiagnosticsPanel';
import CodeViewer from './components/CodeViewer';
import ModelArchitecture from './components/ModelArchitecture';
import TrainingTerminal from './components/TrainingTerminal';
import PredictionPlayground from './components/PredictionPlayground';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'predict' | 'train' | 'architecture' | 'code' | 'render'>('predict');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Upper informational notification bar pointing out the Render OOM fix directly */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="animate-pulse w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow shadow-indigo-500/50" />
            <p className="text-slate-300">
              <strong className="text-indigo-400 font-semibold text-xs uppercase tracking-wider bg-indigo-950 border border-indigo-800 px-1.5 py-0.5 rounded mr-1.5">Free Tier Limit</strong> 
              Render's 512MB RAM cap aborted your TensorFlow + PyTorch builds.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('render')}
            className="flex items-center gap-1.5 font-bold text-teal-400 hover:text-teal-350 bg-teal-950/40 border border-teal-800/40 hover:border-teal-750 px-3 py-1 rounded transition-all cursor-pointer text-xs uppercase tracking-wider"
          >
            <AlertCircle size={13} className="shrink-0" />
            Get Deployment Fix
          </button>
        </div>
      </div>

      {/* Main header block */}
      <header className="bg-slate-900 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20 glow">
              <Brain size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-950 border border-indigo-800/60 rounded text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono">
                  CIFAR-10 Classifier suite
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 mt-1 font-sans">
                Image Classification Playground
              </h1>
              <p className="text-xs text-slate-400 max-w-2xl leading-normal mt-1">
                Train, compare, and execute prediction workloads side-by-side using TensorFlow & PyTorch Conv2D CNN architectures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg p-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>AI Studio Active Sandbox</span>
          </div>
        </div>
      </header>

      {/* Main application navigation tab list */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 gap-1 md:gap-2">
          <button
            onClick={() => setActiveTab('predict')}
            className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'predict'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-520/5'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            <Cpu size={16} />
            Prediction Playground
          </button>
          
          <button
            onClick={() => setActiveTab('train')}
            className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'train'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-520/5'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            <Play size={15} fill="currentColor" />
            Training Simulator
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-520/5'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            <Layers size={16} />
            CNN Architectures
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-520/5'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            <FileCode2 size={16} />
            Original Python Script
          </button>

          <button
            onClick={() => setActiveTab('render')}
            className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'render'
                ? 'border-red-500 text-red-400 bg-red-950/10'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            <AlertCircle size={16} className={activeTab === 'render' ? 'text-red-400' : 'text-red-500'} />
            Unblock Render Deploy
          </button>
        </div>

        {/* Selected Component Content Rendering */}
        <div className="transition-all duration-300">
          {activeTab === 'predict' && <PredictionPlayground />}
          {activeTab === 'train' && <TrainingTerminal />}
          {activeTab === 'architecture' && <ModelArchitecture />}
          {activeTab === 'code' && <CodeViewer />}
          {activeTab === 'render' && <DiagnosticsPanel />}
        </div>
      </main>

      {/* Footer credits and information */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-xs text-slate-500 space-y-2">
          <p>
            CIFAR-10 Image Classification Playground — Integrated with dual-framework analytical topology visualizers.
          </p>
          <p className="text-slate-600 font-mono">
            Requires Google AI Studio workspace compile capabilities. GPU emulation supported via vector activation matrices.
          </p>
        </div>
      </footer>
    </div>
  );
}
