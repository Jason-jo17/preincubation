
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectInstructableView } from '@/components/student/project-instructable-view';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

// Mock data for the demo
const MOCK_PROJECTS: Record<string, any> = {
  "sub-1": {
    id: "sub-1",
    title: "EdgeAI CV Inspector",
    summary: "A high-performance computer vision model deployed on NVIDIA Jetson for real-time defect detection in aluminum die-casting production lines.",
    difficulty: "Advanced",
    time_estimate: "45-60 Hours",
    materials: [
      "NVIDIA Jetson Orin Nano Developer Kit",
      "Sony IMX219 Camera Module",
      "Custom 3D Printed Bracket",
      "Industrial Power Supply (12V/5A)",
      "LED Ring Light (for uniform illumination)"
    ],
    tools: [
      "Python 3.10",
      "TensorFlow / TensorRT",
      "OpenCV",
      "PyTorch",
      "Docker",
      "MQTT"
    ],
    logic_breakdown: "The system uses a quantized MobileNetV2 backbone for feature extraction, followed by a custom detection head trained on 12,000+ images of synthetic and real foundry defects. TensorRT optimization allows for 30FPS inference directly on the edge, pushing alerts via MQTT to the shop floor dashboard.",
    performance_metrics: [
      { label: "Accuracy", value: "98.4%" },
      { label: "Inference Latency", value: "32ms" },
      { label: "False Positive Rate", value: "0.2%" }
    ],
    steps: [
      {
        title: "Environment Setup & Flashing",
        description: "Flash the NVIDIA Jetson with JetPack 6.0 and install all necessary CUDA/cuDNN libraries. Set up a virtual environment and clone the project repository.",
        logic: "Using JetPack 6.0 ensures compatibility with the latest TensorRT features for INT8 quantization."
      },
      {
        title: "Model Quantization & Optimization",
        description: "Convert the trained PyTorch model to ONNX format and then use the TensorRT optimizer to create a high-speed engine file.",
        logic: "ONNX -> TensorRT engine conversion reduces model size by 70% while maintaining accuracy within 1% of the original FP32 model."
      },
      {
        title: "Industrial Camera Calibration",
        description: "Mount the camera and calibrate it for the specific focal length and lighting conditions of the foundry floor.",
        logic: "OpenCV calibration nodes are used to remove lens distortion and ensure consistent pixel-to-millimeter mapping."
      },
      {
        title: "Edge Deployment & MQTT Sync",
        description: "Deploy the final containerized application and verify the real-time data stream reaching the central CEED dashboard.",
        logic: "MQTT (Aedes) is used for low-latency communication between the edge node and the cloud portal."
      }
    ],
    prd_link: "/portal/student/challenges?id=prd-1"
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const project = MOCK_PROJECTS[id];

  if (!project) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Project Not Found</h1>
        <Button onClick={() => router.push('/portal/student')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen bg-slate-50">
      <Breadcrumbs 
        items={[
          { label: "Dashboard", href: "/portal/student" },
          { label: "Projects", href: "/portal/student" },
          { label: project.title }
        ]} 
      />
      <ProjectInstructableView 
        project={project} 
        onBack={() => router.push('/portal/student')} 
      />
    </div>
  );
}

// Simple Button fallback since this is a new file and I don't want to rely on imports that might fail
function Button({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors uppercase tracking-widest text-xs"
    >
      {children}
    </button>
  );
}
