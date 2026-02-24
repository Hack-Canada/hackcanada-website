'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SecretModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SecretModal({ isOpen, onClose }: SecretModalProps) {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "cGluZyBuYW1hbiBvbiB0aGUgaGFjayBjYW5hZGEgc2VydmVyIHdpdGggdGhlIG1lc3NhZ2UgImNoaXAgbGlrZXMgY2hpcHMiIGZvciBhIHNlY3JldCBwcml6ZSE";

    useEffect(() => {
        if (isOpen) {
            setDisplayedText('');
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(fullText.slice(0, i + 1));
                i++;
                if (i >= fullText.length) clearInterval(interval);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
                        className="relative w-full max-w-[320px] bg-yellow-400 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
                        style={{ borderRadius: 0 }}
                    >
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-end items-start text-xs font-bold uppercase tracking-widest text-black/40">
                                <button
                                    onClick={onClose}
                                    className="ml-4 text-black hover:bg-black hover:text-white transition-colors p-1 border-2 border-black"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <div className="min-h-[80px] font-mono text-lg font-bold text-black border-l-4 border-black pl-3 py-1 bg-yellow-300/50 break-all leading-tight">
                                {displayedText}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2 h-4 bg-black ml-1 align-middle"
                                />
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-black text-yellow-400 font-bold uppercase tracking-widest hover:bg-black/90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-b-4 border-black text-sm"
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
