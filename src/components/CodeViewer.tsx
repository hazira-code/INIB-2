import React from 'react';
import { Code, Layers, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

export default function CodeViewer() {
  const [activeTab, setActiveTab] = React.useState<'tf' | 'torch' | 'dataset'>('tf');

  const datasetCode = `def load_cifar10_tf():
    (x_train, y_train), (x_test, y_test) = datasets.cifar10.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0
    return (x_train, y_train), (x_test, y_test)

def load_cifar10_torch(batch_size=64):
    transform = transforms.Compose([
        transforms.ToTensor(), 
        transforms.Normalize((0.5,), (0.5,))
    ])
    trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
    testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=batch_size, shuffle=True)
    testloader = torch.utils.data.DataLoader(testset, batch_size=batch_size, shuffle=False)
    return trainloader, testloader`;

  const tfCode = `def build_tf_model():
    model = models.Sequential([
        # Layer 1: 32 filters, 3x3 kernel, ReLU activation
        layers.Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)),
        layers.MaxPooling2D((2,2)),
        
        # Layer 2: 64 filters, 3x3 kernel, ReLU activation
        layers.Conv2D(64, (3,3), activation='relu'),
        layers.MaxPooling2D((2,2)),
        
        # Layer 3: 64 filters, 3x3 kernel, ReLU activation
        layers.Conv2D(64, (3,3), activation='relu'),
        
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(10, activation='softmax') # Class probability maps
    ])
    return model

def train_tf_model():
    (x_train, y_train), (x_test, y_test) = load_cifar10_tf()
    model = build_tf_model()
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    history = model.fit(x_train, y_train, epochs=10, validation_data=(x_test, y_test))
    return history`;

  const torchCode = `class TorchCNN(nn.Module):
    def __init__(self):
        super(TorchCNN, self).__init__()
        # Input: 3 channels (RGB), 32 filters, 3x3 kernel, pad=1
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        # Fully connected projection
        self.fc1 = nn.Linear(64 * 8 * 8, 64)
        self.fc2 = nn.Linear(64, 10)

    def forward(self, x):
        # Pass 1: Conv1 -> Relu -> Maxpool
        x = self.pool(F.relu(self.conv1(x)))
        # Pass 2: Conv2 -> Relu -> Maxpool
        x = self.pool(F.relu(self.conv2(x)))
        # Flatten size tracking
        x = x.view(-1, 64 * 8 * 8)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

def train_torch_model(epochs=5):
    trainloader, testloader = load_cifar10_torch()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    net = TorchCNN().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(net.parameters(), lr=0.001)

    for epoch in range(epochs):
        for inputs, labels in trainloader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = net(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-indigo-400" />
          <h2 className="text-md font-semibold text-slate-100">Original Script Model Layout</h2>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('tf')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'tf' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            TensorFlow Model
          </button>
          <button
            onClick={() => setActiveTab('torch')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'torch' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            PyTorch Model
          </button>
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'dataset' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            CIFAR-10 Loader
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Code display */}
        <div className="lg:col-span-8 border-r border-slate-800 bg-slate-950/50">
          <pre className="p-5 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[400px] select-all">
            <code>
              {activeTab === 'tf' && tfCode}
              {activeTab === 'torch' && torchCode}
              {activeTab === 'dataset' && datasetCode}
            </code>
          </pre>
        </div>

        {/* Insights / Comparisons Column */}
        <div className="lg:col-span-4 p-5 bg-slate-900/40 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-400" /> Design Analysis
          </h3>
          
          {activeTab === 'tf' && (
            <div className="space-y-3 font-sans text-xs text-slate-400 leading-relaxed">
              <p>
                <strong>Sequential Convenience:</strong> Built with <code>keras.models.Sequential</code>, creating a clean forward flow where output dimensions of layers are inferred automatically.
              </p>
              <p>
                <strong>Dense Dimensions:</strong> Uses sparse categorical cross-entropy, eliminating the need to one-hot encode CIFAR-10 labels. Softmax defines the probability distribution over the 10 labels.
              </p>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-md">
                <span className="font-semibold text-slate-200">Keras Highlights:</span>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-400">
                  <li>No manual forward method</li>
                  <li>In-place loss tracking</li>
                  <li>Simple `.fit()` API</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'torch' && (
            <div className="space-y-3 font-sans text-xs text-slate-400 leading-relaxed">
              <p>
                <strong>Strict Control:</strong> Extends <code>nn.Module</code>. Subclassing requires defining exact weights inside structural definitions, and manually wire the calculation inside <code>forward()</code>.
              </p>
              <p>
                <strong>Dimensions calculation:</strong> Flat features must be manually computed. With 32x32 inputs, running pooling twice (2x2) yields an output resolution of 8x8. With 64 filters, the input to FC is exactly <code>64 * 8 * 8</code> (4096).
              </p>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-md">
                <span className="font-semibold text-slate-200">PyTorch Highlights:</span>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-400">
                  <li>Explicit gradient zeros</li>
                  <li>Clear backpropagation flow</li>
                  <li>Explicit linear dimensions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'dataset' && (
            <div className="space-y-3 font-sans text-xs text-slate-400 leading-relaxed">
              <p>
                <strong>Normalization Differences:</strong> 
                The TensorFlow dataset is normalized uniformly to <code>[0.0, 1.0]</code> via divider limits, while PyTorch applies standard normalizers centering values inside <code>[-1.0, 1.0]</code>.
              </p>
              <p>
                <strong>Data Streaming:</strong> PyTorch makes use of a structured <code>DataLoader</code>, streaming batches into localized CUDA devices parallelly, which scales incredibly well on local PCs but consumes high overhead.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
