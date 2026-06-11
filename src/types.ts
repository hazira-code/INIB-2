/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CIFAR10ClassName =
  | 'airplane'
  | 'automobile'
  | 'bird'
  | 'cat'
  | 'deer'
  | 'dog'
  | 'frog'
  | 'horse'
  | 'ship'
  | 'truck';

export interface CIFAR10ClassInfo {
  id: number;
  name: CIFAR10ClassName;
  icon: string;
  color: string;
}

export interface TrainingMetric {
  epoch: number;
  tf_loss: number;
  tf_accuracy: number;
  torch_loss?: number;
  torch_accuracy?: number;
}

export interface SampleImage {
  id: string;
  name: CIFAR10ClassName;
  imageUrl: string;
  isCustom?: boolean;
}

export interface ModelLayerInfo {
  name: string;
  type: 'conv2d' | 'maxpool2d' | 'flatten' | 'dense';
  shape: string;
  params: number;
  activation?: string;
  details: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  source: 'TensorFlow' | 'PyTorch' | 'System' | 'Render';
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}
