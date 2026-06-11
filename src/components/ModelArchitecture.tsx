import React from 'react';
import { Layers, ArrowDown, Shuffle, Cpu, Minimize2, Radio } from 'lucide-react';
import { ModelLayerInfo } from '../types';

export default function ModelArchitecture() {
  const [activeTab, setActiveTab] = React.useState<'tf' | 'torch'>('tf');

  const tfLayers: ModelLayerInfo[] = [
    { name: 'Input Patch', type: 'conv2d', shape: '32 x 32 x 3', params: 0, details: 'Standard CIFAR-10 RGB image input' },
    { name: 'Conv2D_1 (32 size)', type: 'conv2d', shape: '30 x 30 x 32', params: 896, activation: 'ReLU', details: 'Scans 3x3 patches, extracts 32 distinct feature textures' },
    { name: 'MaxPooling2D_1', type: 'maxpool2d', shape: '15 x 15 x 32', params: 0, details: 'Halves resolution, keeps max features to reduce spatial redundancy' },
    { name: 'Conv2D_2 (64 size)', type: 'conv2d', shape: '13 x 13 x 64', params: 18496, activation: 'ReLU', details: 'Deepens network, recognizes mid-level shapes and contours' },
    { name: 'MaxPooling2D_2', type: 'maxpool2d', shape: '6 x 6 x 64', params: 0, details: 'Downsamples again to 6x6 grid, preserving critical positions' },
    { name: 'Conv2D_3 (64 size)', type: 'conv2d', shape: '4 x 4 x 64', params: 36928, activation: 'ReLU', details: 'Extracts high-level class-specific indicators (e.g. wheels, wings)' },
    { name: 'Flatten', type: 'flatten', shape: '1024', params: 0, details: 'Reshapes 4x4x64 tensor into a flat 1D vector of 1024 features' },
    { name: 'Dense (64 units)', type: 'dense', shape: '64', params: 65600, activation: 'ReLU', details: 'Fully connected reasoning layer weighting combinations of features' },
    { name: 'Output Class projection', type: 'dense', shape: '10', params: 650, activation: 'Softmax', details: 'Calculates specific probabilities for each of the 10 categories' }
  ];

  const torchLayers: ModelLayerInfo[] = [
    { name: 'Input Tensor', type: 'conv2d', shape: '3 x 32 x 32', params: 0, details: 'PyTorch Channel-first format (C, H, W)' },
    { name: 'conv1 (32 size, padding=1)', type: 'conv2d', shape: '32 x 32 x 32', params: 896, activation: 'ReLU', details: 'Zero-padding preserves spatial dimension at 32x32' },
    { name: 'pool (MaxPool2d 2x2)', type: 'maxpool2d', shape: '32 x 16 x 16', params: 0, details: 'Halves image resolution' },
    { name: 'conv2 (64 size, padding=1)', type: 'conv2d', shape: '64 x 16 x 16', params: 18496, activation: 'ReLU', details: 'Fuses spatial maps, deepens outputs to 64 filters' },
    { name: 'pool (MaxPool2d 2x2)', type: 'maxpool2d', shape: '64 x 8 x 8', params: 0, details: 'Downsamples to 8x8 spatial map' },
    { name: 'Flatten (Manual)', type: 'flatten', shape: '4096', params: 0, details: 'Reshapes 64x8x8 state into a 1D vector of 4096 features' },
    { name: 'fc1 (Linear projection)', type: 'dense', shape: '64', params: 262208, activation: 'ReLU', details: 'Fully connected linear weight mapping (4096 -> 64)' },
    { name: 'fc2 (Linear output)', type: 'dense', shape: '10', params: 650, activation: 'None', details: 'Outputs raw scores (Logits); CrossEntropyLoss internally handles Softmax' }
  ];

  const currentLayers = activeTab === 'tf' ? tfLayers : torchLayers;
  const totalParams = currentLayers.reduce((acc, curr) => acc + curr.params, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <Minimize2 size={16} className="text-teal-400" />
            CNN Layer Visualizer & Topology
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Observe the shape transformation from raw pixels into discrete class likelihoods.
          </p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('tf')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'tf' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            TensorFlow
          </button>
          <button
            onClick={() => setActiveTab('torch')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'torch' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            PyTorch
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Model stats banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center sm:text-left">
          <div className="bg-slate-950/50 p-4 border border-slate-800/80 rounded-lg">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider block font-semibold">Total Learnable Weights</span>
            <span className="text-lg font-mono font-bold text-teal-400 mt-1 block">
              {totalParams.toLocaleString()} parameters
            </span>
          </div>
          <div className="bg-slate-950/50 p-4 border border-slate-800/80 rounded-lg">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider block font-semibold">CNN Feature Blocks</span>
            <span className="text-lg font-mono font-bold text-indigo-400 mt-1 block">
              {currentLayers.filter(l => l.type === 'conv2d').length} conv2d levels
            </span>
          </div>
          <div className="bg-slate-950/50 p-4 border border-slate-800/80 rounded-lg">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider block font-semibold">Output Dimension</span>
            <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
              10 classes (CIFAR-10)
            </span>
          </div>
        </div>

        {/* Visual stack list */}
        <div className="space-y-3 relative before:absolute before:inset-y-4 before:left-6 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-slate-800">
          {currentLayers.map((layer, index) => {
            let typeColor = 'border-slate-800 bg-slate-900';
            if (layer.type === 'conv2d') typeColor = 'border-indigo-500/30 bg-indigo-950/25 text-indigo-200';
            if (layer.type === 'maxpool2d') typeColor = 'border-amber-500/30 bg-amber-950/25 text-amber-200';
            if (layer.type === 'flatten') typeColor = 'border-purple-500/30 bg-purple-950/25 text-purple-200';
            if (layer.type === 'dense') typeColor = 'border-emerald-500/30 bg-emerald-950/25 text-emerald-200';

            return (
              <div 
                key={index} 
                className={`relative flex flex-col sm:flex-row items-stretch gap-4 p-4 border rounded-lg transition-colors hover:bg-slate-950/40 ${typeColor}`}
              >
                {/* Visual node anchor */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-700 items-center justify-center font-mono text-[10px] text-slate-400 font-bold shadow z-10">
                  {index}
                </div>

                {/* Left side info: identity */}
                <div className="sm:w-1/2 pr-0 sm:pr-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase px-1.5 py-0.5 font-semibold tracking-wider font-mono bg-black/40 rounded border border-slate-800/60">
                      {layer.type}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-100">{layer.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">{layer.details}</p>
                </div>

                {/* Right side info: shape matrix metadata */}
                <div className="sm:w-1/2 pl-0 sm:pl-8 flex flex-row sm:flex-col lg:flex-row items-start sm:items-center justify-between sm:justify-center lg:justify-between gap-4 border-t sm:border-t-0 border-slate-800/40 p-3 sm:p-0 mt-3 sm:mt-0 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Shape out</span>
                    <span className="font-semibold text-teal-400 text-xs sm:text-sm">{layer.shape}</span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Weights</span>
                    <span className="text-slate-300 font-semibold">{layer.params.toLocaleString()}</span>
                  </div>

                  {layer.activation && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans">Activation</span>
                      <span className="text-indigo-400 font-semibold">{layer.activation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
