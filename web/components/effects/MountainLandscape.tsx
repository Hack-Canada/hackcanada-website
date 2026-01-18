export default function MountainLandscape() {
  return (
    <div className="w-full flex flex-col" style={{ minHeight: '350px' }}>
      {/* Mountain Background Section */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(180px, 30vh, 350px)' }}>
        {/* Layer 1 - Furthest back, lightest (peachy pink) */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#d4b5a7]"
          style={{
            height: '100%',
            clipPath: `polygon(
              0% 100%, 0% 70%, 2% 65%, 5% 55%, 8% 45%, 12% 50%, 15% 40%, 18% 35%, 
              22% 45%, 25% 50%, 28% 45%, 32% 55%, 35% 50%, 38% 40%, 42% 35%, 45% 45%, 
              48% 40%, 52% 30%, 55% 35%, 58% 25%, 62% 20%, 65% 25%, 68% 35%, 72% 30%, 
              75% 35%, 78% 40%, 82% 35%, 85% 30%, 88% 40%, 92% 35%, 95% 45%, 98% 50%, 
              100% 55%, 100% 100%
            )`
          }}
        />
        
        {/* Layer 2 - Slightly darker pink */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#c4a095]"
          style={{
            height: '85%',
            clipPath: `polygon(
              0% 100%, 0% 60%, 3% 65%, 6% 55%, 10% 60%, 14% 50%, 18% 55%, 22% 45%, 
              26% 50%, 30% 55%, 34% 50%, 38% 60%, 42% 55%, 46% 45%, 50% 50%, 54% 45%, 
              58% 40%, 62% 45%, 66% 50%, 70% 45%, 74% 50%, 78% 55%, 82% 50%, 86% 55%, 
              90% 50%, 94% 55%, 98% 60%, 100% 55%, 100% 100%
            )`
          }}
        />
        
        {/* Layer 3 - Mauve/dusty rose */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#9a7a7a]"
          style={{
            height: '70%',
            clipPath: `polygon(
              0% 100%, 0% 55%, 4% 60%, 8% 55%, 12% 60%, 16% 55%, 20% 50%, 24% 55%, 
              28% 60%, 32% 55%, 36% 50%, 40% 55%, 44% 60%, 48% 55%, 52% 50%, 56% 55%, 
              60% 60%, 64% 55%, 68% 50%, 72% 55%, 76% 60%, 80% 55%, 84% 50%, 88% 55%, 
              92% 60%, 96% 55%, 100% 60%, 100% 100%
            )`
          }}
        />
        
        {/* Layer 4 - Darker purple/plum */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#6d5a6a]"
          style={{
            height: '55%',
            clipPath: `polygon(
              0% 100%, 0% 50%, 5% 55%, 10% 50%, 15% 55%, 20% 50%, 25% 45%, 30% 50%, 
              35% 55%, 40% 50%, 45% 55%, 50% 50%, 55% 55%, 60% 50%, 65% 55%, 70% 50%, 
              75% 55%, 80% 50%, 85% 55%, 90% 50%, 95% 55%, 100% 50%, 100% 100%
            )`
          }}
        />
        
        {/* Layer 5 - Darkest foreground */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#4a3d4a]"
          style={{
            height: '40%',
            clipPath: `polygon(
              0% 100%, 0% 40%, 5% 45%, 10% 40%, 15% 45%, 20% 40%, 25% 45%, 30% 40%, 
              35% 45%, 40% 40%, 45% 45%, 50% 40%, 55% 45%, 60% 40%, 65% 45%, 70% 40%, 
              75% 45%, 80% 40%, 85% 45%, 90% 40%, 95% 45%, 100% 40%, 100% 100%
            )`
          }}
        />
      </div>

      {/* Dark Gradient Section - Transitions to FAQ */}
      <div 
        className="w-full"
        style={{
          background: 'linear-gradient(180deg, #3d3545 0%, #2d2535 35%, #1a1126 100%)',
          minHeight: '120px',
          flex: 1
        }}
      />
    </div>
  )
}
