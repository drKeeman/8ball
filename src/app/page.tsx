"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, Activity, Skull } from "lucide-react";
import { generatePredictionData, processingSteps, neuralNetworkConfig, PredictionData } from "@/lib/data";

export default function Home() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<PredictionData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const calculateDeathDate = () => {
    setIsCalculating(true);
    setResult(null);
    setCurrentStep(0);
    
    // Simulate neural processing time with step-by-step updates
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Increased from 400ms to 800ms for longer animation

    // Final result after processing
    setTimeout(() => {
      const predictionData = generatePredictionData();
      setResult(predictionData);
      setIsCalculating(false);
      setCurrentStep(0);
    }, 8000); // Increased from 3000ms to 8000ms (8 seconds)
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-4xl font-bold text-primary"
          >
            <Brain className="w-8 h-8" />
            ML Forecast
          </motion.div>
          <h1 className="text-2xl font-semibold text-foreground">
            Platinum List Death Date Prediction
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced neural network analysis predicting the exact date of platinum list termination
          </p>
        </motion.div>

        {/* Calculate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={calculateDeathDate}
            disabled={isCalculating}
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            {isCalculating ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
                Processing Neural Networks...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Calculate Death Date
              </div>
            )}
          </Button>
        </motion.div>

        {/* Neural Processing Animation */}
        <AnimatePresence>
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Neural Network Processing
                  </CardTitle>
                  <CardDescription>
                    Model: {neuralNetworkConfig.layers.join(' → ')} layers | 
                    Accuracy: {(neuralNetworkConfig.accuracy * 100).toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Neural Network Visualization */}
                    <div className="flex justify-center">
                      <div className="relative w-80 h-40">
                        {/* Input Layer */}
                        <div className="absolute left-0 top-0 w-16 h-40 flex flex-col justify-between">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6],
                                boxShadow: [
                                  "0 0 0 rgba(59, 130, 246, 0)",
                                  "0 0 20px rgba(59, 130, 246, 0.8)",
                                  "0 0 0 rgba(59, 130, 246, 0)"
                                ]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: i * 0.3 
                              }}
                              className="w-3 h-3 bg-primary rounded-full border border-primary/30"
                            />
                          ))}
                        </div>
                        
                        {/* Hidden Layers */}
                        {neuralNetworkConfig.layers.slice(1, -1).map((layerSize, layerIndex) => (
                          <div 
                            key={layerIndex}
                            className={`absolute top-0 h-40 flex flex-col justify-between -translate-x-1/2`}
                            style={{ 
                              left: `${25 + (layerIndex + 1) * 15}%`,
                              width: '16px'
                            }}
                          >
                            {[...Array(Math.min(layerSize, 8))].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.4, 1],
                                  opacity: [0.4, 1, 0.4],
                                  boxShadow: [
                                    "0 0 0 rgba(100, 116, 139, 0)",
                                    "0 0 15px rgba(100, 116, 139, 0.6)",
                                    "0 0 0 rgba(100, 116, 139, 0)"
                                  ]
                                }}
                                transition={{ 
                                  duration: 1.8, 
                                  repeat: Infinity, 
                                  delay: i * 0.2 + layerIndex * 0.15
                                }}
                                className="w-4 h-4 bg-secondary rounded-full border border-secondary/40"
                              />
                            ))}
                          </div>
                        ))}
                        
                        {/* Output Layer */}
                        <div className="absolute right-0 top-0 w-16 h-40 flex flex-col justify-between">
                          {[...Array(2)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                                boxShadow: [
                                  "0 0 0 rgba(239, 68, 68, 0)",
                                  "0 0 25px rgba(239, 68, 68, 0.9)",
                                  "0 0 0 rgba(239, 68, 68, 0)"
                                ]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: i * 0.4 
                              }}
                              className="w-5 h-5 bg-destructive rounded-full border border-destructive/50"
                            />
                          ))}
                        </div>
                        
                        {/* Dynamic Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          {/* Primary Data Flow */}
                          <motion.path
                            d="M 16 20 Q 160 20 320 20"
                            stroke="url(#gradient1)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Secondary Data Flow */}
                          <motion.path
                            d="M 16 80 Q 160 40 320 40"
                            stroke="url(#gradient2)"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.2] }}
                            transition={{ 
                              duration: 2.5, 
                              repeat: Infinity,
                              delay: 0.5,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Tertiary Data Flow */}
                          <motion.path
                            d="M 16 140 Q 160 60 320 60"
                            stroke="url(#gradient3)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0.1, 0.6, 0.1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: 1,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Cross Connections */}
                          <motion.path
                            d="M 80 20 Q 120 60 160 40"
                            stroke="url(#gradient4)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              delay: 0.8,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Gradients */}
                          <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                              <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
                              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgb(100, 116, 139)" stopOpacity="0" />
                              <stop offset="50%" stopColor="rgb(100, 116, 139)" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                              <stop offset="50%" stopColor="rgb(100, 116, 139)" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                              <stop offset="50%" stopColor="rgb(100, 116, 139)" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Floating Data Particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${20 + (i % 3) * 30}%`
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Processing Steps */}
                    <div className="space-y-2">
                      {processingSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: index <= currentStep ? 1 : 0.3, 
                            x: 0 
                          }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <motion.div
                            animate={{ 
                              scale: index <= currentStep ? [1, 1.2, 1] : 1,
                              backgroundColor: index <= currentStep ? 'var(--color-primary)' : 'var(--color-muted)'
                            }}
                            transition={{ 
                              duration: 0.5, 
                              repeat: index <= currentStep ? Infinity : 0,
                              delay: index * 0.1
                            }}
                            className="w-2 h-2 rounded-full"
                          />
                          <span className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                            {step}
                          </span>
                          {index <= currentStep && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <Activity className="w-4 h-4 text-primary" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="space-y-4"
            >
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Target className="w-5 h-5" />
                    Prediction Result
                  </CardTitle>
                  <CardDescription>
                    Neural network analysis complete | Model: {result.modelVersion}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-destructive">
                        {formatDate(result.date)}
                      </div>
                      <p className="text-muted-foreground">
                        Confidence Level: {result.confidence.toFixed(1)}%
                      </p>
                    </div>
                    
                    {/* Death Reason */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Skull className="w-6 h-6 text-destructive" />
                        </motion.div>
                        <h4 className="text-sm font-semibold text-destructive">Cause of Death:</h4>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                      >
                        <p className="text-sm text-center text-destructive font-medium">
                          {result.deathReason}
                        </p>
                      </motion.div>
                    </motion.div>
                    
                    {/* Factors */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">Key Factors Analyzed:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {result.factors.map((factor: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="px-3 py-1 bg-secondary rounded-full text-xs"
                          >
                            {factor}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="inline-block"
                    >
                      <Target className="w-12 h-12 text-destructive" />
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
