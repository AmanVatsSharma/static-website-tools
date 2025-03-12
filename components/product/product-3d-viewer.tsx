'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Placeholder model component (will be replaced with actual product models)
function Model({ 
  modelPath = '/models/chainsaw.glb', 
  scale = 1, 
  position = [0, 0, 0] as const, 
  rotation = [0, 0, 0] as const 
}) {
  // This is a placeholder. In a real implementation, we would:
  // 1. Load the actual model using useGLTF
  // 2. Set up proper materials, etc.
  
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Auto-rotate the model for a better viewing experience
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    // Simple box as placeholder for the actual model
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[1 * scale, 0.5 * scale, 2 * scale]} />
      <meshStandardMaterial color="#f16717" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// Loading spinner component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

interface Product3DViewerProps {
  modelPath?: string;
  productName: string;
  className?: string;
}

/**
 * 3D Product Viewer component for interactive product visualization
 * 
 * @component
 * @example
 * ```tsx
 * <Product3DViewer 
 *   modelPath="/models/chainsaw.glb"
 *   productName="AWE Chainsaw CS-580" 
 * />
 * ```
 */
export function Product3DViewer({ modelPath, productName, className }: Product3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  
  return (
    <div className={`relative aspect-square w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 ${className}`}>
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-4">
        <button 
          onClick={() => setIsRotating(!isRotating)} 
          className="rounded-full bg-white/90 p-2 shadow-md dark:bg-gray-800/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-700 dark:text-gray-300">
            {isRotating ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            )}
          </svg>
        </button>
        <button 
          onClick={() => {
            // Reset camera position
          }} 
          className="rounded-full bg-white/90 p-2 shadow-md dark:bg-gray-800/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-700 dark:text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 14.5V19.5M15 14.5H19.5M9 14.5H4.5M9 14.5V19.5" />
          </svg>
        </button>
      </div>
      
      {/* Product name overlay */}
      <div className="absolute left-0 top-0 z-10 m-4 rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm dark:bg-gray-900/80 dark:text-white">
        {productName}
      </div>
      
      {/* Canvas for 3D rendering */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Model modelPath={modelPath} scale={1.5} />
          
          <ContactShadows 
            rotation-x={Math.PI / 2} 
            position={[0, -1.5, 0]} 
            opacity={0.75} 
            width={10} 
            height={10} 
            blur={2.5} 
            far={4} 
          />
          
          <Environment preset="city" />
          <OrbitControls 
            autoRotate={isRotating} 
            autoRotateSpeed={2}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Viewer with additional features
export function EnhancedProduct3DViewer({ modelPath, productName, className }: Product3DViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Product3DViewer modelPath={modelPath} productName={productName} className={className} />
      
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive 3D Viewer Controls</h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
            </svg>
            <span>Drag to rotate the product view</span>
          </li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>Use scroll wheel to zoom in/out</span>
          </li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            <span>Click buttons below to toggle auto-rotation or reset view</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
} 